import React from 'react';
import PostIcons from '../components/PostIcons';
import { rhythm } from '../utils/typography';

const PageTemplate = ({ data }) => {
  const currentPage = data.wordpressPage;

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
      <PostIcons node={currentPage} css={{ marginBottom: rhythm(1 / 2) }} />
      <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
    </div>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
    }
    site {
      id
      siteMetadata {
        title
        subtitle
      }
    }
  }
`;
