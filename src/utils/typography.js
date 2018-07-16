import Typography from 'typography';
import github from 'typography-theme-github';

github.headerLineHeight = 1.1;
github.overrideThemeStyles = () => ({
  a: {
    color: 'rebeccapurple',
  },
  h1: {
    borderBottom: 'none',
  },
});

const typography = new Typography(github);
export default typography;
