import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const apollo = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/2u01j327betr?access_token=o3Y701U8keGhOqFPizPINO1FHmbZtmODUVUAmqFXmTs",
  cache: new InMemoryCache(),
});