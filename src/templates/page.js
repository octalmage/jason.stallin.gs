import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import PostIcons from '../components/PostIcons';
import typography from '../utils/typography';
import Layout from '../components/Layout';

const { rhythm } = typography;

const PageTemplate = ({ data }) => {
  const currentPage = data.wordpressPage;

  return (
    <Layout>
      <Helmet title={`${currentPage.title} | ${data.site.siteMetadata.title}`} />
      <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
      <PostIcons node={currentPage} style={{ marginBottom: rhythm(1 / 2) }} />
      <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressPage(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
