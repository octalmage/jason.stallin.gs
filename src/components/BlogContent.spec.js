import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import BlogContent from './BlogContent';

configure({ adapter: new Adapter() });

test('Replaces <pre> tags with <SyntaxHighlighter>', () => {
  const component = shallow(<BlogContent content="<pre>test</pre>" />);
  expect(component.find('SyntaxHighlighter').children().text()).toEqual('test');
});

test('Replaces <pre><code> tags with <SyntaxHighlighter>', () => {
  const component = shallow(<BlogContent content="<pre><code>test</code></pre>" />);
  expect(component.find('SyntaxHighlighter').children().text()).toEqual('test');
});
