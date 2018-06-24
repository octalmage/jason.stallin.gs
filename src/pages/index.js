import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import styled from 'styled-components';
import LastGitHubProject from '../components/LastGitHubProject';

const HeaderImage = styled(Img)`
  margin-bottom: 1rem;
`;

const Home = ({ data }) =>
  (
    <div>
      <Helmet title={`${data.site.siteMetadata.title} | ${data.site.siteMetadata.subtitle}`} />
      <HeaderImage
        title="Image from https://www.pexels.com"
        alt="Macbook with code on the screen"
        sizes={data.headerImage.sizes}
      />
      <div>
        <p>Hey, I’m Jason.</p>
        <p>I live in Austin, Texas, and I work at <a href="http://wpengine.com/">WP Engine</a>.</p>
        <p>Recently I spend most of my days playing with <a href="http://wordpress.org/">WordPress</a>,&nbsp;<a href="http://nodejs.org/">Node.js</a>, and <a href="https://reactjs.org">React</a>.</p>
      </div>
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
    headerImage: imageSharp(id: { regex: "/macbook/" }) {
      sizes(maxWidth: 1240 ) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
