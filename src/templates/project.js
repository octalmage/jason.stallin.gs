import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostIcons from '../components/PostIcons';
import { rhythm } from '../utils/typography';

class ProjectTemplate extends Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata;
    const currentPage = this.props.data.wordpressWpProjects;

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
        <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
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
