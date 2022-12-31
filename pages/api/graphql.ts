import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { User } from "@prisma/client";
import prismaClient from "../../prisma/client";
import { getCurrentUser } from "../../utils/getCurrentUser";
import { schema } from "../../graphql/schema";

export type CurrentUser = Pick<User, "id" | "email" | "name" | "role"> | null;

export interface GraphQLContext extends BaseContext {
  dataSource: typeof prismaClient;
  currentUser: CurrentUser;
}

const server = new ApolloServer<GraphQLContext>({ schema });

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    return {
      dataSource: prismaClient,
      currentUser: await getCurrentUser({ req, res }),
    };
  },
});
