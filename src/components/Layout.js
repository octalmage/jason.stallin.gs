import React from 'react';
import Helmet from 'react-helmet';
import { SocialIcon } from 'react-social-icons';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import '../css/poole.css';
import '../css/main.css';

const internalLinks = [
  { title: 'Home', url: '/' },
  { title: 'Blog', url: '/blog/' },
  { title: 'Contact', url: '/contact/' },
];

const externalLinks = [
  { title: 'GitHub', url: 'https://github.com/octalmage' },
];

const urls = [
  'http://github.com/octalmage',
  'http://twitter.com/octalmage',
  'http://vimeo.com/octalmage/',
  'http://facebook.com/octalmage/',
  'http://www.linkedin.com/in/jasonstallings',
];

const StyledSocialIcon = styled(SocialIcon)`
  height: 15px !important;
  width: 15px !important;
  margin-right: 5px;
`;

const StyledFooter = styled.div`
  font-size: .8em;
  text-align: center;
`;

const Footer = ({ type }) => (
  <StyledFooter className={`FooterType-${type}`}>
    <div>
      {urls.map(url => (
        <StyledSocialIcon url={url} bgColor="#ffffff" key={url} rel="noopener noreferrer" />
      ))}
    </div>
    Powered by{' '}
    <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>{' '}
    and{' '}
    <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">WordPress</a>.
  </StyledFooter>
);

const DefaultLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query indexLayoutQuery {
        site {
          siteMetadata {
            title
            subtitle
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          meta={[{ name: 'description', content: data.site.siteMetadata.description }]}
        >
          <html lang="en" />
        </Helmet>
        <header>
          <div className="sidebar">
            <div className="container sidebar-sticky">
              <div className="sidebar-about">
                <Link to="/">
                  <h1>{data.site.siteMetadata.title}</h1>
                </Link>
                <p className="lead">{data.site.siteMetadata.subtitle}</p>
              </div>
              <ul className="sidebar-nav">
                {internalLinks.map((link) => (
                  <li key={link.url}>
                    <Link to={link.url}>
                      {link.title}
                    </Link>
                  </li>
                ))}
                {externalLinks.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
              <hr />
              <Footer type="sidebar" />
            </div>
          </div>
        </header>
        <div className="amp-wp-article">
          <div className="amp-wp-article-content content container">
            <div className="posts">
              <div className="post">{children}</div>
            </div>
          </div>
        </div>
        <Footer type="bottom" color="black" />
      </div>
    )}
  />
);

export default DefaultLayout;
