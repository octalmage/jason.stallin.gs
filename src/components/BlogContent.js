import React from 'react';
import GitHubWidget from 'react-github-widget';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/styles/hljs';
import HtmlToReact from 'html-to-react';

let cachedRepo;

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
        <SyntaxHighlighter
          key={index}
          language="javascript"
          style={monokai}
          codeTagProps={{ style: { lineHeight: '1.5em', fontSize: '0.9em' } }}
        >
          {nodeToProcess.children.map(n => n.data).join('')}
        </SyntaxHighlighter>
      );
    },
  },
  {
    // Replace <div class="github-widget"> with GitHubWidget.
    shouldProcessNode: node => node.attribs && node.attribs.class === 'github-widget',
    processNode: (node, children, index) => (
      <GitHubWidget key={index} repository={node.attribs['data-repo']} data={cachedRepo} />
    ),
  },
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  }];
const htmlToReactParser = new HtmlToReactParser();


const BlogContent = ({ content, repo }) => {
  if (repo) {
    cachedRepo = {
      description: repo.description,
      pushed_at: repo.pushedAt,
      homepage: repo.homepageUrl,
      forks: repo.forkCount,
      watchers: repo.stargazers.totalCount,
      default_branch: repo.defaultBranchRef.name,
    };
  }

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
