import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { SocialIcons } from 'react-social-icons';
import styled from 'styled-components';
import LastGitHubProject from '../components/LastGitHubProject';

const linkStyle = {
  marginLeft: '1em',
  color: 'white',
  textDecoration: 'none',
};

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
  height: 25px !important;
  width: 25px !important;
  margin-right: 5px;
`;

const StyledLink = styled(Link)`
  margin-left: 1em;
  color: white;
  text-decoration: none;

  @media (max-width: 500px) {
    margin-right: ${props => (props['data-isLast'] ? '0' : '1em')};
    margin-left: 0;
  }
`;

const StyledHeader = styled.div`
   margin: 0 auto;
   max-width: 800px;
   padding: ${props => (props.isRoot ? '1.45rem 1.0875rem' : '1rem 0.75rem')};
   @media (max-width: 500px) {
     text-align: center;
   }
`;

const DefaultLayout = ({ children, location }) => {
  const isRoot = location.pathname === '/';
  const isContact = location.pathname === '/contact/';
  // const isRoot = false;
  return (
    <div>
      <Helmet
        title="Jason Stallings | Programmer and stuff"
        meta={[
          {
            name: 'description',
            content: 'Hey! I&#039;m Jason Stallings and I&#039;m a prolific open source software developer. Writing code has been my passion since I was 14. I eat, sleep, and breathe code.'
          },
        ]}
      />
      <div
        style={{
           background: 'rebeccapurple',
           marginBottom: '1.45rem',
         }}
      >
        <StyledHeader
          isRoot={isRoot}
        >
          <h1 style={{ margin: 0, fontSize: isRoot ? '2.5rem' : '2rem', display: 'inline-block' }}>
            <Link
              to="/"
              href="/"
              style={{
                 color: 'white',
                 textDecoration: 'none',
                 display: 'inline-block',
               }}
            >
               Jason Stallings
            </Link>
          </h1>
          {links.map((link, i) => (
            <StyledLink
              key={link.url}
              to={link.url}
              href={link.url}
              data-isLast={i === links.length - 1}
            >
              {link.title}
            </StyledLink>
            ))}
        </StyledHeader>
      </div>
      <div
        style={{
           margin: '5em auto',
           maxWidth: 800,
           padding: '0px 1.0875rem 1.45rem',
           paddingTop: 0,
         }}
      >
        {children()}
        {isRoot && <LastGitHubProject username="octalmage" />}
      </div>
      <center>
        {(isRoot || isContact) && <StyledSocialIcons urls={urls} />}
        Powered by <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a> and <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">WordPress</a>.
      </center>
    </div>
  );
};


DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default DefaultLayout;
