import React from 'react';
import PostIcons from '../components/PostIcons';
import BlogContent from '../components/BlogContent';
import { rhythm } from '../utils/typography';

const PostTemplate = ({ data }) => {
  const post = data.wordpressPost;
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
      <BlogContent content={post.content} />
    </div>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      ...PostIcons
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`;
