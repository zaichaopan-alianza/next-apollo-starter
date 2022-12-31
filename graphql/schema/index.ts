import { makeExecutableSchema } from "graphql-tools";
import { userTypeDefs, userResolvers } from "./modules/user";
import { postTypeDefs, postResolvers } from "./modules/post";
import merge from "lodash/merge";
import gql from "graphql-tag";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";

// Need to have one `type Query`
// Others modules just extend it
//   id: "root-module",
//   typeDefs: gql`
//     type Query {
//       _empty: String
//     }
//   `,

const rootQuery = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [rootQuery, scalarTypeDefs, userTypeDefs, postTypeDefs],
  resolvers: merge(scalarResolvers, userResolvers, postResolvers),
});
