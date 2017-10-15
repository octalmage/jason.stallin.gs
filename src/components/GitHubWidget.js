/* global GithubRepoWidget */
import React from 'react';

const GitHubWidgetComponent = Component =>
  class GitHubWidget extends React.PureComponent {
    componentDidMount() {
      if (typeof window !== 'undefined') {
        require.ensure([], (require) => {
          require('github-repo-widget.js');
          GithubRepoWidget.init();
        }, 'github-repo-widget.js');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };

export default GitHubWidgetComponent;
