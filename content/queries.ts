import { gqlFetcher } from "@/content/fetch";
import { ClientImagesQuery, CustomerPostQuery, HeroQuery, MainNavigationQuery } from "@/types";

export const getContentHeros = async (isDraft = false) => {
  const query = `#graphql
    query HeroCollection {
      heroCollection(preview: ${isDraft ? 'true' : 'false'}) {
        items {
          title
          eyebrow
          description
          ctasCollection {
            items {
              link
              label
            }
          }
        }
      }
    }
    `

  const data = await gqlFetcher<HeroQuery>({ query, preview: isDraft, tags: ['hero'] });

  //TODO: handle error or empty data;

  return data;
}

export const getClientImages = async () => {
  const query = `#graphql
    query ClientImages($where: AssetFilter) {
      assetCollection(where: $where) {
        items {
          title
          url
          width
          height
        }
      }
    }
  `

  const data = await gqlFetcher<ClientImagesQuery>({
    query,
    variables: {
      where: {
        contentfulMetadata: {
          tags: {
            id_contains_all: "client"
          }
        }
      }
    }
  });
  return data;
}

export const getMainNavigation = async () => {
  const query = `#graphql
    query MainNavigation($where: NavigationFilter) {
      navigationCollection(where: $where) {
        items {
          name
          linksCollection {
            items {
              link
              label
            }
          }
        }
      }
    }
  `;
  const data = await gqlFetcher<MainNavigationQuery>({
    query,
    variables: {
      where: {
        name: "Main Navigation"
      }
    }
  });

  return data;
}

export const getCustomerPost = async (slug?: string) => {
  const query = `#graphql
    query Query($where: CustomerPostFilter) {
      customerPostCollection(where: $where) {
        items {
          title
          slug
          customer {
            logo {
              title
              url
              height
              width
            }
            name
          }
          body {
            json
          }
        }
      }
    }
  `;
  const data = await gqlFetcher<CustomerPostQuery>({
    query,
    ...(slug && { variables: { where: { slug } } })
  });

  return data;
}
