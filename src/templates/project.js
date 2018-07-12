import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import BlogContent from '../components/BlogContent';

const ProjectTemplate = ({ data }) => {
  const currentPage = data.wordpressWpProjects;
  return (
    <div>
      <Helmet title={`${currentPage.title} | ${data.site.siteMetadata.title}`} />
      <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
      <BlogContent content={currentPage.content} />
      { currentPage.learn_more_link &&
        <h3>
          <a
            href={currentPage.learn_more_link}
            target="_blank"
            rel="noopener noreferrer"
          >
              Learn More
          </a>
        </h3>
        }
    </div>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query currentProjectQuery($id: String!) {
    wordpressWpProjects(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
      learn_more_link
    }
    site {
      id
      siteMetadata {
        title
      }
    }
  }
`;
