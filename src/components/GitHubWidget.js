/* global GithubRepoWidget */
import React from 'react';

// Include this file on the page.
if (typeof window !== 'undefined') {
  // This line is all kinds of bad, but we need to import this for the GibHub Shortcode plugin.
  require('!babel!github-repo-widget.js/GithubRepoWidget.min.js'); // eslint-disable-line
}

const GitHubWidgetComponent = Component =>
  class GitHubWidget extends React.PureComponent {
    componentDidMount() {
      if (typeof window !== 'undefined') {
        GithubRepoWidget.init();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };

export default GitHubWidgetComponent;
