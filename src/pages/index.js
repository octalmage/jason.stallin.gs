import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const HeaderImage = styled(Img)`
  margin-bottom: 1rem;
`;

const Home = ({ data }) => (
  <Layout>
    <Helmet title={`${data.site.siteMetadata.title} | ${data.site.siteMetadata.subtitle}`} />
    <HeaderImage
      title="Image from https://www.pexels.com"
      alt="Macbook with code on the screen"
      fluid={data.headerImage.fluid}
    />
    <div>
      <p>
        Hey, I’m Jason.
      </p>
      <p>
        I live in Austin, Texas, and I work at
        {' '}
        <a href="http://wpengine.com/" target="_blank" rel="noopener noreferrer">
        WP Engine
        </a>
        .
      </p>
      <p>
        Recently I spend most of my days playing with
        {' '}
        <a href="http://wordpress.org/" target="_blank" rel="noopener noreferrer">
          WordPress,
        </a>
        {' '}
        <a href="http://nodejs.org/" target="_blank" rel="noopener noreferrer">
          Node.js,
        </a>
        {' '}
          and
        {' '}
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          React
        </a>
        .
      </p>
      <p>
        Currently I&apos;m working on
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={data.lastPush.edges[0].node.repo.url.replace('api.', '').replace('/repos', '')}
        >
          {data.lastPush.edges[0].node.repo.name.split('/')[1]}
        </a>
        .
      </p>
    </div>
  </Layout>
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
    headerImage: imageSharp(fluid: { originalName:{ regex:"/sanfran/" } }) {
      fluid(maxWidth: 1240) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
    lastPush: allGitHubEvent(filter: { type: { eq:"PushEvent" } }, limit: 1) {
      edges {
        node {
          repo {
            name
            url
          }
        }
      }
    }
  }
`;
