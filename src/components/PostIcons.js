import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  FaClock as ClockIcon,
  FaTag as TagIcon,
  FaFolderOpen as OpenIcon,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { rhythm } from '../utils/typography';

const TaxSpan = styled.span`
   white-space: nowrap;
   display: inline-block;
   margin-right: .5em;
`;

const PostIcons = ({ node, className = '' }) => {
  const categories = node.categories && node.categories.nodes ? node.categories.nodes : node.categories || [];
  const tags = node.tags && node.tags.nodes ? node.tags.nodes : node.tags || [];

  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <div style={{ marginTop: rhythm(-1 / 2), marginBottom: rhythm(1 / 2) }} className={className}>
        <TaxSpan>
          <ClockIcon size={14} style={{ position: 'relative', bottom: 1 }} />
          {' '}{node.date}
        </TaxSpan>
        {categories.map(category => (
          <TaxSpan key={category.name}>
            {' '}<OpenIcon size={14} style={{ position: 'relative', bottom: 1 }} />
            {' '}<Link to={`/category/${category.name.toLowerCase()}`}>
              {category.name}
            </Link>
          </TaxSpan>
        ))}
        {tags.map(tag => (
          <TaxSpan key={tag.name}>
            {'  '}<TagIcon size={14} style={{ position: 'relative', bottom: 1 }} />
            {' '}<Link to={`/tag/${tag.name.toLowerCase()}`}>
              {tag.name}
            </Link>
          </TaxSpan>
        ))}
      </div>
    </IconContext.Provider>
  );
};

export default PostIcons;
