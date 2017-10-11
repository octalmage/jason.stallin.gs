import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import { rhythm, scale } from '../utils/typography';

const containerStyle = {
  maxWidth: 700,
  margin: '0 auto',
  padding: rhythm(3 / 4),
};

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

const DefaultLayout = ({ children, location }) => {
  // const isRoot = location.pathname === '/';
  const isRoot = false;
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
        <div
          style={{
             margin: '0 auto',
             maxWidth: 960,
             padding: isRoot ? '1.45rem 1.0875rem' : '1rem 0.75rem',
           }}
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
          {links.map(link => (
            <Link
              key={link.url}
              to={link.url}
              href={link.url}
              style={linkStyle}
            >
              {link.title}
            </Link>
            ))}
        </div>
      </div>
      <div
        style={{
           margin: '0 auto',
           maxWidth: 960,
           padding: '0px 1.0875rem 1.45rem',
           paddingTop: 0,
         }}
      >
        {children()}
      </div>
      <center>
        Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a> and <a href="https://wordpress.org/">WordPress</a>.
      </center>
    </div>
  );
};


DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default DefaultLayout;
