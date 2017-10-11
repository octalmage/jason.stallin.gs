import React, { Component } from 'react';
import Link from 'gatsby-link';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import TagIcon from 'react-icons/lib/fa/tag';
import OpenIcon from 'react-icons/lib/fa/folder-open';

import PostIcons from '../components/PostIcons';


const Home = ({ data }) =>
  (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: data.wordpressPage.title }} />
      <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
    </div>
  );


export default Home;

export const pageQuery = graphql`
  query homePageQuery {
    wordpressPage(slug: {eq: "home"}){
     title
     content
    }
  }
`;
