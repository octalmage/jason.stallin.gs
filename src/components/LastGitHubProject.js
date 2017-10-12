import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'fetch-everywhere';

export default class LastGitHubProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recentProject: {
        name: '',
        url: '',
      },
    };
  }

  componentWillMount() {
    fetch(`https://api.github.com/users/${this.props.username}/events/public`)
      .then(response => response.json()).then((res) => {
        let repo;

        // Find the latest commit.
        for (const x in res) {
          if (res[x].type === 'PushEvent') {
            repo = res[x].repo;
            break;
          }
        }

        const project = repo.name.split('/')[1];
        const repo_url = repo.url.replace('api.', '').replace('/repos', '');

        this.setState({
          recentProject: {
            name: project,
            url: repo_url,
          },
        });
      });
  }

  render() {
    const { recentProject } = this.state;
    const StyledSpan = styled.span`
      display: inline-block;
      visibility: ${props => (props.visible ? 'visible' : 'hidden')};
      animation: fadeIn 1s linear;
      transition: visibility 1s linear;
    `;
    return (
      <StyledSpan visible={recentProject.name !== ''}>
        Currently I&apos;m working on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={recentProject.url}
        >
          {recentProject.name}
        </a>
      </StyledSpan>
    );
  }
}

LastGitHubProject.propTypes = {
  username: PropTypes.string.isRequired,
};
