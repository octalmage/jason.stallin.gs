/* eslint-disable no-unused-expressions */
import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import PostIcons from '../components/PostIcons';
import typography from '../utils/typography';
import Layout from '../components/Layout';

const { rhythm } = typography;

const CategoryTemplate = ({ data, pageContext }) => {
  const { name, type, accessor } = pageContext;
  const categoryPosts = data.allWordpressPost.edges.filter(({ node }) =>
    node[accessor] && node[accessor].map(n => n.name).includes(name));

  return (
    <Layout>
      <Helmet title={`${type}: ${name} | ${data.site.siteMetadata.title}`} />
      <h1>{type}: {name}</h1>
      {categoryPosts.map(({ node }) => (
        <div style={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link to={`/${node.slug}/`} href={`/${node.slug}/`}>
            <h2><span dangerouslySetInnerHTML={{ __html: node.title }} /></h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <PostIcons node={node} />
        </div>
    ))}
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query categoryPageQuery {
    allWordpressPost(sort: {fields: [date], order: DESC}) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
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
