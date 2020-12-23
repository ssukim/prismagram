import passport from "passport"; // 쿠키와 세션 작업을 하기좋음
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

/*토큰을 받는다 -> 해석 -> 사용자 찾기 -> 사용자 존재 -> grapql 함수 실행*/

// passport-jwt인증에 사용할 옵션
const jwtOptions = {
  // header에 bearer스키마에 담겨온 토큰 해석할 것
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 해당 복호화 방법사용
  secretOrKey: process.env.JWT_SECRET,
};

// 인증 성공시 콜백함수
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    // user가 있을 경우
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
      // 또는 토큰에 id가 있고 사용자가 없다면, 새로 생성
    }
  } catch (error) {
    return done(error, false);
  }
};

// verifyUser가 호출되고난 후 passport인증
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    //verifyUser에서 user를 찾았다면 서버에게 요청하는 req객체의 user에 담아서 서버에게 넘겨줌
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

// jwtOptions를 기반으로한 jwt전략으로 인증하고 성공시 verifyUser호출
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
