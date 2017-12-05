/* eslint-disable no-unused-expressions */
import React from 'react';
import { injectGlobal } from 'styled-components';
import Helmet from 'react-helmet';
import PostIcons from '../components/PostIcons';
import BlogContent from '../components/BlogContent';
import Feedback from '../components/Feedback';
import { rhythm } from '../utils/typography';

injectGlobal`
.wp-block-image {
  width: 800;
  line-height: 0;
}

.wp-block-image img {
  margin: 0;
}
.wp-block-image figcaption {
  color: #8f98a1;
  text-align: center;
  font-size: 13px;
  margin: 1em;
}
.aligncenter {
  clear: both;
  display: block;
  margin: 0 auto;
}
`;

const PostTemplate = ({ data }) => {
  const post = data.wordpressPost;
  return (
    <div>
      <Helmet title={`${post.title} | ${data.site.siteMetadata.title}`} />
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2) }} />
      <BlogContent content={post.content} />
      <Feedback username="octalmage" url={window.location} />
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
      }
    }
  }
`;
