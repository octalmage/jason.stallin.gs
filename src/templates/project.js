import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import BlogContent from '../components/BlogContent';
import Layout from '../components/Layout';

const ProjectTemplate = ({ data }) => {
  const currentPage = data.wordpressWpProjects;
  const repo = data.githubRepositories;
  return (
    <Layout>
      <Helmet
        title={`${currentPage.title} | ${data.site.siteMetadata.title}`}
        meta={[
          {
            name: 'description',
            content: currentPage.excerpt.replace(/<(?:.|\n)*?>/gm, ''),
          },
        ]}
      />
      <h1>
        <span dangerouslySetInnerHTML={{ __html: currentPage.title }} />
        {currentPage.tags && (
          <span style={{ fontSize: '.5em' }}> (defunct)</span>
        )}
      </h1>
      <BlogContent content={currentPage.content} repo={repo} />
      {currentPage.learn_more_link
        && (
          <h3>
            <a
              href={currentPage.learn_more_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </h3>
        )}
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query currentProjectQuery($id: String!, $name: String!) {
    wordpressWpProjects(id: { eq: $id }) {
      title
      tags {
        name
      }
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      learn_more_link
    }
    site {
      id
      siteMetadata {
        title
      }
    }
    githubRepositories(name:{ regex: $name }) {
      id
      name
      description
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
      homepageUrl
      pushedAt
      defaultBranchRef {
        name
      }
      forkCount
    }
  }
`;
