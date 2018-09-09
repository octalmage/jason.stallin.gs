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
    const { username } = this.props;
    fetch(`/api/cacheLatestGithubProject?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json()).then((res) => {
        // Find the latest commit.
        const { repo } = res.filter(({ type }) => type === 'PushEvent')[0];
        const url = repo.url.replace('api.', '').replace('/repos', '');
        const name = repo.name.split('/')[1];

        this.setState({
          recentProject: {
            name,
            url,
          },
        });
      })
      .catch(() => {
        console.log('GitHub API has throttled your IP.');
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
        Currently I&apos;m working on
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={recentProject.url}
        >
          {recentProject.name}
        </a>
        .
      </StyledSpan>
    );
  }
}

LastGitHubProject.propTypes = {
  username: PropTypes.string.isRequired,
};
