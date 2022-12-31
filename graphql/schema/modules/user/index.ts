import gql from "graphql-tag";
import bcrypt from "bcryptjs";
import { Resolvers } from "../../../generated";
import { auth } from "../../guards/auth";

export const userTypeDefs = gql`
  input CredentialInput {
    email: String!
    password: String!
  }
  type CreateUserResult {
    success: Boolean
    message: String
  }
  type User {
    id: ID!
    name: String
    role: String
    posts: [Post]
  }
  extend type Query {
    user(id: ID!): User
  }
  extend type Mutation {
    createUser(input: CredentialInput!): CreateUserResult
  }
`;

export const userResolvers: Resolvers = {
  Mutation: {
    createUser: async (_parent, args, { dataSource }) => {
      try {
        await dataSource.user.create({
          data: {
            email: args.input.email,
            passwordHash: await bcrypt.hash(args.input.password, 10),
          },
        });

        return {
          success: true,
          message: "success",
        };
      } catch (error) {
        return {
          success: false,
          message: "failed",
        };
      }
    },
  },
  Query: {
    user: auth(async (_parent, args, { dataSource }) => {
      return await dataSource.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          posts: true,
        },
      });
    })
  },
  // when type has  another type, we also need to add how ot resolve them in
  // the resolver. If not, schema still works, but `user.posts` will be undefine
  //  There are two ways
  // 1.  add below Query how to resolve it from parent
  // User: {
  //   posts: async (parent: User) => {
  //     return await prisma.post.findMany({
  //       where: {
  //         authorId: parent.id,
  //       },
  //     });
  //   },
  // },
  //  2. second, using the above way to load posts when loading user
  // Prisma by default handles N+1
};
