/* eslint-disable no-unused-expressions */
import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import PostIcons from '../components/PostIcons';
import { rhythm } from '../utils/typography';

const CategoryTemplate = ({ data, pathContext }) => {
  const { name, type, accessor } = pathContext;
  const categoryPosts = data.allWordpressPost.edges.filter(({ node }) =>
    node[accessor] && node[accessor].map(n => n.name).includes(name));

  return (
    <div>
      <Helmet title={`${type}: ${name} | ${data.site.siteMetadata.title}`} />
      <h1>{type}: {name}</h1>
      {categoryPosts.map(({ node }) => (
        <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link to={`/${node.slug}/`} href={`/${node.slug}/`} css={{ textDecoration: 'none' }}>
            <h2><span dangerouslySetInnerHTML={{ __html: node.title }} /></h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <PostIcons node={node} />
        </div>
    ))}
    </div>
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
