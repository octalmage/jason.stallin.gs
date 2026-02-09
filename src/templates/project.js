import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const ProjectTemplate = ({ pageContext }) => (
  <Layout>
    <Helmet title="Project" />
    <h1>Project</h1>
    <p>This project page is no longer available.</p>
  </Layout>
);

export default ProjectTemplate;
