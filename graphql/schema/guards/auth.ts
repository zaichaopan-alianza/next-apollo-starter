import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../../pages/api/graphql";


export function auth<TParent, TArgs, TInfo, TResolveReturn>(
  resolve: (
    parent: TParent,
    args: TArgs,
    context: GraphQLContext,
    info: TInfo
  ) => TResolveReturn
) {
  return (
    parent: TParent,
    args: TArgs,
    context: GraphQLContext,
    info: TInfo
  ) => {
    if (!context.currentUser) {
      throw new GraphQLError("Invalid request", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }
    return resolve(parent, args, context, info);
  };
}
 
