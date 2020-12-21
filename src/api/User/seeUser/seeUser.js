import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Query: {
    seeUser: (_, args, { request }) => {
      const { id } = args;
      return prisma.user({ id });
    },
  },
};
