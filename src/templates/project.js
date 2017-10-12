import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostIcons from '../components/PostIcons';
import { rhythm } from '../utils/typography';

// Include this file on the page.
require('!babel!github-repo-widget.js/GithubRepoWidget.min.js');

class ProjectTemplate extends React.Component {
  componentDidMount() {
    GithubRepoWidget.init();
  }

  render() {
    const { data } = this.props;
    const currentPage = data.wordpressWpProjects;
    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
        <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
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
  }
}

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
        subtitle
      }
    }
  }
`;
