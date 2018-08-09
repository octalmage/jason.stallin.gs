import React from 'react';
import Helmet from 'react-helmet';
import { SocialIcons } from 'react-social-icons';
import styled from 'styled-components';
import LastfmWidget from 'react-lastfm-widget';
import { StaticQuery, graphql, Link } from 'gatsby';
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
  text-align: center;
`;

const LastfmDiv = styled.div.attrs({
  id: 'LastfmWidget',
})`
  position: fixed;
  bottom: 5px;
  right: 5px;
`;

const Footer = ({ type, color }) => (
  <StyledFooter className={`FooterType-${type}`}>
    <StyledSocialIcons urls={urls} color={color} />
    Powered by
    {' '}
    <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
      Gatsby
    </a>
    {' '}
    and
    {' '}
    <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">
      WordPress
    </a>
    .
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
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <header>
          <div className="sidebar">
            <div className="container sidebar-sticky">
              <div className="sidebar-about">
                <Link
                  to="/"
                  href="/"
                >
                  <h1>
                    {data.site.siteMetadata.title}
                  </h1>
                </Link>
                <p className="lead">
                  {data.site.siteMetadata.subtitle}
                </p>
              </div>

              <ul className="sidebar-nav">
                {links.map((link, i) => (
                  <li key={link.url}>
                    <Link
                      to={link.url}
                      href={link.url}
                      data-islast={i === links.length - 1}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <hr />
              <Footer type="sidebar" color="white" />
            </div>
          </div>
        </header>
        <div
          className="amp-wp-article"
        >
          <div className="amp-wp-article-content content container">
            <div className="posts">
              <div className="post">
                {children}
              </div>
            </div>
          </div>
        </div>
        <LastfmDiv>
          <LastfmWidget
            username="comic_coder"
            apikey="1f633977acf0e2d0630ec11dbc350d3e"
            size="150px"
            onlyShowNowPlaying
          />
        </LastfmDiv>
        <Footer type="bottom" color="black" />
      </div>
    )}
  />
);

export default DefaultLayout;
