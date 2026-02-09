import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';
import root from 'window-or-global';
import { graphql } from 'gatsby';
import PostIcons from '../components/PostIcons';
import BlogContent from '../components/BlogContent';
import Feedback from '../components/Feedback';
import { rhythm } from '../utils/typography';
import htmlDecode from '../utils/htmlDecode';
import Layout from '../components/Layout';

const GlobalStyle = createGlobalStyle`
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
  const post = data.wpPost;
  if (!post) return null;
  return (
    <Layout>
      <GlobalStyle />
      <Helmet
        title={`${htmlDecode(post.title)} | ${data.site.siteMetadata.title}`}
        meta={[
          {
            name: 'description',
            content: post.excerpt ? post.excerpt.replace(/<(?:.|\n)*?>/gm, '') : '',
          },
        ]}
      />
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      <PostIcons node={post} style={{ marginBottom: rhythm(1 / 2) }} />
      <BlogContent content={post.content} />
      <Feedback username="octalmage" url={root.location} />
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      excerpt
      date
      tags {
        nodes {
          name
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
