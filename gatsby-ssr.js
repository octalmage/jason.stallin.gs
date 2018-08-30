// Move Typography.js styles to the top of the head section so they're loaded first.
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  headComponents.sort((x, y) => {
    if (x.key === 'TypographyStyle') {
      return -1;
    } if (y.key === 'TypographyStyle') {
      return 1;
    }
    return 0;
  });
  replaceHeadComponents(headComponents);
};
