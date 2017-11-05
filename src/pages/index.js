import React from 'react';
import Helmet from 'react-helmet';
import LastGitHubProject from '../components/LastGitHubProject';

const Home = ({ data }) =>
  (
    <div>
      <Helmet title={`${data.site.siteMetadata.title} | ${data.site.siteMetadata.subtitle}`} />
      <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
      <LastGitHubProject username="octalmage" />
    </div>
  );

export default Home;

export const pageQuery = graphql`
  query homePageQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    wordpressPage(slug: {eq: "home"}){
     title
     content
    }
  }
`;
