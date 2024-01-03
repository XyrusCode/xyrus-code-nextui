import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
        blogPosts[]->{
      _type,
      coverImage,
      author->{name, picture, title},
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`;

export const projectsPageQuery = groq`
  *[_type == "projects"][0]{
    _id,
      title,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
  }
`;

export const blogPageQuery = groq`
*[_type == "posts"][0]{
      _id,
    overview,
    blogPosts[]->{
      _type,
      coverImage,
      author->{name, picture, title},
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
}
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`;

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  content,
  tags,
  author->{name, picture, title},
  "slug": slug.current,
  "author": author->{name, picture, title},`;

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`;


export const blogPostsQuery = groq`
  *[_type == "post"] | order(date desc, _updatedAt desc) {
    _id,
    title,
    date,
    _updatedAt,
    excerpt,
    coverImage,
    content,
    tags,
    "slug": slug.current,
    "author": author->{name, picture},
  }`;