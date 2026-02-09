import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import HtmlToReact from 'html-to-react';

const HtmlToReactParser = HtmlToReact.Parser;
const isValidNode = () => true;

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [
  {
    shouldProcessNode: node => node.name && node.name === 'pre',
    processNode: (node, children, index) => {
      const nodeToProcess = node.children[0] && node.children[0].name === 'code' ? node.children[0] : node;
      return (
        <SyntaxHighlighter
          key={index}
          language="javascript"
          style={monokai}
          codeTagProps={{ style: { lineHeight: '1.5em', fontSize: '0.9em' } }}
        >
          {nodeToProcess.children.map(n => n.data || '').join('')}
        </SyntaxHighlighter>
      );
    },
  },
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  },
];
const htmlToReactParser = new HtmlToReactParser();

const BlogContent = ({ content }) => {
  if (!content) return null;

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
