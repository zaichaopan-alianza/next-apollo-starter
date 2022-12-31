import gql from "graphql-tag";
import { Resolvers } from "../../../generated";

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String
    content: String
    publishedAt: DateTime
    deletedAt: DateTime
    author: User
  }

  extend type Query {
    post(id: ID!): Post
    posts: [Post]
  }
`;

export const postResolvers:Resolvers = {
  Query: {
    post: async (_parent, args, { dataSource }) => {
      const post = await dataSource.post.findUnique({
        where: {
          id: args.id,
        },
      });

      return post;
    },

    posts: async (_parent, _args, { dataSource }) => {
      return await dataSource.post.findMany({
        include: {
          author: true,
        },
      });
    },
  },
};
