import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});

import passport from "passport";
import {Strategy, ExtractJwt}  from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

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

passport.use(new Strategy(jwtOptions, verifyUser))