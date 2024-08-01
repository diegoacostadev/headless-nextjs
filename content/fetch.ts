export const gqlFetcher = async <T>({
  query,
  variables = {},
  preview = false,
  tags = []
}: {
  query: string,
  variables?: Record<string, any>,
  preview?: boolean,
  tags?: string[]
}): Promise<T | undefined> => {
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/y6tyw3bf1qu5`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: preview ? `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}` : `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ query, variables }),
    next: {
      tags, // invalidation cache with tags
      revalidate: 25 // revalidate cache every 25 seconds. if there is a change, after 25 seconds, the new data will be showed to the next request.
    }
  });

  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error('Could not get content');
  }

  return data as T;
}
