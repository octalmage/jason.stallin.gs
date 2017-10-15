/* global GithubRepoWidget */
import React from 'react';
import 'github-repo-widget.js';

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
