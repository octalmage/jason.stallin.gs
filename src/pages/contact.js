import React from 'react';
import Mailto from 'react-protected-mailto';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subject: '',
      email: '',
      body: '',
      sent: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, subject, body } = this.state;

    this.setState({ name: '', email: '', subject: '', body: '', sent: true });

    fetch('/api/sendContactEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, body }),
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, subject, body, sent } = this.state;
    const { data } = this.props;
    return (
      <Layout>
        <Helmet title={`Contact | ${data.site.siteMetadata.title}`} />
        <h1>Contact</h1>
        <p>
          The best way to get in touch is via email:{' '}
          <Mailto email="jason@stallin.gs">jason@stallin.gs</Mailto>{' '}
          or by filling out the form below.
        </p>
        {sent && <p style={{ color: 'green' }}>Email sent! Thanks, I will be in touch soon.</p>}
        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={subject}
              onChange={this.handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <textarea
              placeholder="Content"
              name="body"
              value={body}
              onChange={this.handleInputChange}
              rows={4}
              style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'rebeccapurple',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Send Email
          </button>
        </form>
      </Layout>
    );
  }
}

export default Contact;

export const pageQuery = graphql`
  query contactPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
