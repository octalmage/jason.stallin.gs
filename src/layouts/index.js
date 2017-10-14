import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { SocialIcons } from 'react-social-icons';
import styled from 'styled-components';
import LastGitHubProject from '../components/LastGitHubProject';
import '../css/poole.css';
import '../css/main.css';

const links = [
  { title: 'Home', url: '/' },
  { title: 'Blog', url: '/blog/' },
  { title: 'Projects', url: '/projects/' },
  { title: 'Contact', url: '/contact/' },
];

const urls = [
  'http://github.com/octalmage',
  'http://twitter.com/octalmage',
  'http://linkedin.com/in/jaketrent',
  'http://last.fm/user/Comic_Coder/',
  'http://vimeo.com/octalmage/',
  'http://jasonstallings.tumblr.com/',
  'http://facebook.com/octalmage/',
  'http://www.linkedin.com/in/jasonstallings',
];

const StyledSocialIcons = styled(SocialIcons)`
  height: 15px !important;
  width: 15px !important;
  margin-right: 5px;
`;

const StyledFooter = styled.div`
  font-size: .8em;
`;

const DefaultLayout = ({ children, location }) => {
  const isRoot = location.pathname === '/';
  // const isRoot = false;
  return (
    <div className="theme-base-0g">
      <Helmet
        title="Jason Stallings | Programmer and stuff"
        meta={[
          {
            name: 'description',
            content: 'Hey! I&#039;m Jason Stallings and I&#039;m a prolific open source software developer. Writing code has been my passion since I was 14. I eat, sleep, and breathe code.',
          },
        ]}
      />
      <header>
        <div className="sidebar">
          <div className="container sidebar-sticky">
            <div className="sidebar-about">
              <Link
                to="/"
                href="/"
              >
                <h1>Jason Stallings</h1>
              </Link>
              <p className="lead">
                Software Developer
              </p>
            </div>

            <ul className="sidebar-nav">
              {links.map((link, i) => (
                <Link
                  key={link.url}
                  to={link.url}
                  href={link.url}
                  data-isLast={i === links.length - 1}
                >
                  <li>{link.title}</li>
                </Link>
                ))}
            </ul>
            <StyledFooter>
              <StyledSocialIcons urls={urls} color="white" />
              Powered by <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a> and <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">WordPress</a>.
            </StyledFooter>
          </div>
        </div>
      </header>
      <div
        className="amp-wp-article"
      >
        <div className="amp-wp-article-content content container">
          <div className="posts">
            <div className="post">
              {children()}
              {isRoot && <LastGitHubProject username="octalmage" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default DefaultLayout;
