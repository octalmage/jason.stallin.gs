import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import TagIcon from 'react-icons/lib/fa/tag';
import OpenIcon from 'react-icons/lib/fa/folder-open';
import { rhythm } from '../utils/typography';

const TaxSpan = styled.span`
   white-space: nowrap;
   display: inline-block;
   margin-right: .5em;
`;

export default ({ node, className = '' }) => (
  <div style={{ marginTop: rhythm(-1 / 2) }} className={className}>
    <TaxSpan>
      <ClockIcon size={14} style={{ position: 'relative', bottom: 1 }} />
      {' '}
      {node.date}
    </TaxSpan>
    {node.categories &&
      node.categories.map(category => (
        <TaxSpan key={category.name}>
          {' '}
          <OpenIcon size={14} style={{ position: 'relative', bottom: 1 }} />
          {' '}
          <Link
            to={`/category/${category.name.toLowerCase()}`}
            href={`/category/${category.name.toLowerCase()}`}
          >
            {category.name}
          </Link>
        </TaxSpan>
      ))}
    {node.tags &&
      node.tags.map(tag => (
        <TaxSpan key={tag.name}>
          {'  '}
          <TagIcon size={14} style={{ position: 'relative', bottom: 1 }} />
          {' '}
          <Link
            to={`/tag/${tag.name.toLowerCase()}`}
            href={`/tag/${tag.name.toLowerCase()}`}
          >
            {tag.name}
          </Link>
        </TaxSpan>
      ))}
  </div>
);

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    date(formatString: "MMMM DD, YYYY")
    tags {
      name
    }
    categories {
      name
    }
  }
`;
