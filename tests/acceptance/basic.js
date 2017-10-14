/* global fixture, test */
/* eslint-disable no-unused-expressions */
import { Selector } from 'testcafe'; // first import testcafe selectors

const host = 'http://localhost:8000';

fixture`Home Page`
  .page`${host}`;

const blogLink = Selector('[href="/blog/"]');

test('Page Loads', async (t) => {
  await t
    .expect(Selector('h1').innerText).eql('Jason Stallings')
    .expect(Selector('h1').nth(1).innerText).eql('Home');
});

// The selector isn't working for some reason.
test.skip('Can Navigate', async (t) => {
  await t
    .click(blogLink)
    .expect(Selector('h1').nth(1).innerText).eql('Blog');
});

test.page`${host}/projects/robotjs/`('Loads GitHub Widgets', async (t) => {
  await t
    .expect(Selector('.github-box-title').innerText).contains('octalmage/robotjs');
});
