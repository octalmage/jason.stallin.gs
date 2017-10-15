/* global GithubRepoWidget */
import React from 'react';

if (typeof window !== 'undefined') {
  require('github-repo-widget.js'); // eslint-disable-line global-require
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
