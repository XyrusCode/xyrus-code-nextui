import { ApolloClient, gql,InMemoryCache } from '@apollo/client';

import { Post } from '@/types/hashnode';

const client = new ApolloClient({
	uri: 'https://api.hashnode.com/',
	cache: new InMemoryCache(),
});


export async function getHashnodePosts() {

	const { data } = await client.query({
		query: gql`
      query GetPosts {
        user(username: "xyruscode") {
          publication {
            posts(page: 0) {
              _id
              coverImage
              slug
              title
              brief
              totalReactions
              popularity
            }
          }
        }
      }
    `,
	});

	return data.user?.publication?.posts ?? [];
}

export const fetchAllPostSlugs = async () => {
	try {
		const result = await getHashnodePosts();

		return result.map((post: { slug: any; }) => post.slug);
	} catch (error) {
		throw new Error('Failed to fetch post slugs from hashnode');
	}
};

export const getHashnodePostsBySlug = async (slug: string) => {
	const { data } = await client.query({
		query: gql`
      query GetPost($slug: String!) {
        post(slug: $slug, hostname: "") {
          _id
          coverImage
          dateAdded
          slug
          title
          brief
          replyCount
          totalReactions
          content
          popularity
        }
      }
      `,
		variables:{
			slug: slug
		}
	});

	return data?.post;
};


const postFields = `
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const postUpdatedQuery = `*[_type == "post" && _id == $id].slug.current`;

const snippetFields = `
  _id,
  title,
  description,
  logo,
  "slug": slug.current,
`;

export const allSnippetsQuery = `
*[_type == "snippet"] | order(date desc, _updatedAt desc) {
  ${snippetFields}
}`;

export const snippetsQuery = `
{
  "snippet": *[_type == "snippet" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${snippetFields}
  }
}`;

export const snippetSlugsQuery = `
*[_type == "snippet" && defined(slug.current)][].slug.current
`;

export const snippetBySlugQuery = `
*[_type == "snippet" && slug.current == $slug][0] {
  ${snippetFields}
}
`;
