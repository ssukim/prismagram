import passport from "passport"; // 쿠키와 세션 작업을 하기좋음
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

//토큰을 받는다 -> 해석 -> 사용자 찾기 -> 사용자 존재 -> grapql 함수 실행

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

//Jwt를 가져와서 해석하고 확인
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
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

// 토큰을 받아서 작업 미들웨어 함수
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
