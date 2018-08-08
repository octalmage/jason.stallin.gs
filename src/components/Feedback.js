import React from 'react';
import styled from 'styled-components';
import { FaTwitter } from 'react-icons/fa';

const BlogFeedback = styled.div`
  margin: 50px 0;
  background-color: #fafbfc;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 1px 5px #f1f1f1;
`;

const Header = styled.h2`
  padding: 10px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  border-bottom: none;
`;

const Twitter = styled(FaTwitter).attrs({
  color: '229ce5',
  width: '20px',
  height: '20px',
})`
  float: right;
`;

const Feedback = ({ url, username }) => (
  <BlogFeedback>
    <Header>
      Have feedback on this post? Let{' '}
      <a
        href={`https://twitter.com/intent/tweet?text=@${username}%20&amp;related=github&amp;url=${url}`}
        target="blank"
      >
          @{username}
      </a> know on Twitter.
      <Twitter />
    </Header>
  </BlogFeedback>
);

export default Feedback;
