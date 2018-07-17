import React from 'react';
import PropTypes from 'prop-types';

function arraymove(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

function fixTypography(headComponents) {
  const typographyIndex = headComponents.findIndex(item => item.key === 'TypographyStyle');
  arraymove(headComponents, typographyIndex, 0);
  return headComponents;
}

const HTML = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => {
  // Fix for https://github.com/gatsbyjs/gatsby/issues/6302
  const newHeadOrder = fixTypography(headComponents);
  return (
    <html {...htmlAttributes}> {/* eslint-disable-line jsx-a11y/html-has-lang */}
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {newHeadOrder}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  );
};

HTML.propTypes = {
  htmlAttributes: PropTypes.object.isRequired,
  headComponents: PropTypes.array.isRequired,
  bodyAttributes: PropTypes.object.isRequired,
  preBodyComponents: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  postBodyComponents: PropTypes.array.isRequired,
};

export default HTML;
