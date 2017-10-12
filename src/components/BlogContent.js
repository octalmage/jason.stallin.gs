import React from 'react';
import reactStringReplace from 'react-string-replace';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/styles';

const BlogContent = ({ content }) => {
  // https://regex101.com/r/IqDWgu/1
  const newContent = reactStringReplace(content, /<pre.*>([\S\s]*?)<\/pre>/g, (match, i) => (
    <SyntaxHighlighter key={i} language="javascript" style={monokai}>{match}</SyntaxHighlighter>
  ));

  return (
    <div>
      {newContent.map((body) => {
        if (typeof body === 'string') {
          return (
            <div key={body} dangerouslySetInnerHTML={{ __html: body }} />
          );
        }
        return body;
      })}
    </div>
  );
};

export default BlogContent;
