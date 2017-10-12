import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostIcons from '../components/PostIcons';
import BlogContent from '../components/BlogContent';
import Img from 'gatsby-image';

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

// <img src={post.image.sizes.thumbnail} />

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
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
