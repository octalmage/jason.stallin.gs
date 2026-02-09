import React from 'react';
import Helmet from 'react-helmet';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const HeaderImageWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Home = ({ data }) => {
  const image = getImage(data.headerImage);
  return (
    <Layout>
      <Helmet title={`${data.site.siteMetadata.title} | ${data.site.siteMetadata.subtitle}`} />
      {image && (
        <HeaderImageWrapper>
          <GatsbyImage
            image={image}
            alt="Macbook with code on the screen"
          />
        </HeaderImageWrapper>
      )}
      <div>
        <p>Hey, I&apos;m Jason.</p>
        <p>
          I live in Houston, Texas, and I work at{' '}
          <a href="https://o8.is" target="_blank" rel="noopener noreferrer">o8</a>.
        </p>
        <p>
          Recently I spend most of my days playing with{' '}
          <a href="https://www.ethswarm.org" target="_blank" rel="noopener noreferrer">decentralized technology,</a>{' '}
          <a href="http://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js,</a>{' '}
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React,</a>{' '}
          and{' '}
          <a href="https://cosmos.network/" target="_blank" rel="noopener noreferrer">other blockchain technology</a>.
        </p>
        {data.lastPush && data.lastPush.edges && data.lastPush.edges.length > 0 && (
          <p>
            Currently I&apos;m working on{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={data.lastPush.edges[0].node.repo.url.replace('api.', '').replace('/repos', '')}
            >
              {data.lastPush.edges[0].node.repo.name.split('/')[1]}
            </a>.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query homePageQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    headerImage: file(relativePath: { regex: "/soco/" }) {
      childImageSharp {
        gatsbyImageData(width: 1240, formats: [AUTO, WEBP])
      }
    }
    lastPush: allGitHubEvent(filter: { type: { eq: "PushEvent" } }, limit: 1) {
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
