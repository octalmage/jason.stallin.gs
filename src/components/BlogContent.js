import React from 'react';
import GitHubWidget from 'react-github-widget';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/styles';
import HtmlToReact from 'html-to-react';

const HtmlToReactParser = HtmlToReact.Parser;
const isValidNode = () => true;

// Order matters. Instructions are processed in the order they're defined.
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [
  {
    // Replace <pre> with SyntaxHighlighter.
    shouldProcessNode: node => node.name && node.name === 'pre',
    processNode: (node, children, index) => {
      // Support <code> tags inside of <pre> tags.
      const nodeToProcess = node.children[0].name === 'code' ? node.children[0] : node;
      return (
        <SyntaxHighlighter key={index} language="javascript" style={monokai}>
          {nodeToProcess.children.map(n => n.data).join('')}
        </SyntaxHighlighter>
      );
    },
  },
  {
    // Replace <div class="github-widget"> with GitHubWidget.
    shouldProcessNode: node => node.attribs && node.attribs.class === 'github-widget',
    processNode: (node, children, index) => (
      <GitHubWidget key={index} repository={node.attribs['data-repo']} />
    ),
  },
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  }];
const htmlToReactParser = new HtmlToReactParser();


const BlogContent = ({ content }) => {
  const newContent = htmlToReactParser.parseWithInstructions(
    content,
    isValidNode,
    processingInstructions,
  );

  return (
    <div>
      {newContent}
    </div>
  );
};

export default BlogContent;
