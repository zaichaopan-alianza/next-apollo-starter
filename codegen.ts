import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["./graphql/documents/**/*.graphql"],
  generates: {
    "./graphql/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typescript-react-apollo",
      ],
      config: {
        contextType: '../../pages/api/graphql#GraphQLContext'
      }
    
    },
  },
};
export default config;
