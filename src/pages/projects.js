import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';

const Posts = ({ data }) => (
  <Layout>
    <Helmet title={`Projects | ${data.site.siteMetadata.title}`} />
    <h1>
      Projects
    </h1>
    {data.allWordpressWpProjects.edges.map(({ node }) => (
      <div style={{ marginBottom: rhythm(2) }} key={node.slug}>
        <h2>
          <Link to={`/projects/${node.slug}/`} href={`/projects/${node.slug}/`}>{node.title}</Link>
          {node.tags && (
            <span style={{ fontSize: '.5em' }}> (defunct)</span>
          )}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </div>
    ))}
  </Layout>
);


export default Posts;

// Set here the ID of the home page.
export const pageQuery = graphql`
  query projectPageQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allWordpressWpProjects {
      edges {
        node {
          title
          tags {
            name
          }
          slug
          excerpt
        }
      }
    }
}
`;
