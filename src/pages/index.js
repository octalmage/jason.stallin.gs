import React from 'react';

const Home = ({ data }) =>
  (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: data.wordpressPage.title }} />
      <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
    </div>
  );

export default Home;

export const pageQuery = graphql`
  query homePageQuery {
    wordpressPage(slug: {eq: "home"}){
     title
     content
    }
  }
`;
