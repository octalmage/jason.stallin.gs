import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { SocialIcons } from 'react-social-icons';
import styled from 'styled-components';
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
  text-align: center;
`;

const Footer = ({ type, color }) => (
  <StyledFooter className={`FooterType-${type}`}>
    <StyledSocialIcons urls={urls} color={color} />
    Powered by <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a> and <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">WordPress</a>.
  </StyledFooter>
);

const DefaultLayout = ({ children, data }) => (
  <div className="theme-base-0g">
    <Helmet
      meta={[
          {
            name: 'description',
            content: data.site.siteMetadata.description,
          },
        ]}
    >
      <script type="text/javascript">
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-57460911-1', 'auto');
          ga('require', 'GTM-5XDG3W2');
          ga('send', 'pageview');
        `}
      </script>
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
              <h1>{data.site.siteMetadata.title}</h1>
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
                  data-isLast={i === links.length - 1}
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
            {children()}
          </div>
        </div>
      </div>
    </div>
    <Footer type="bottom" color="black" />
  </div>
);

export default DefaultLayout;

export const pageQuery = graphql`
  query indexLayoutQuery {
    site {
      siteMetadata {
        title
        subtitle
        description
      }
    }
  }
`;
