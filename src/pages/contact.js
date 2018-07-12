import React from 'react';
import Mailto from 'react-mailto';
import NotificationSystem from 'react-notification-system';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import 'whatwg-fetch';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import Layout from '../components/Layout';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subject: '',
      email: '',
      body: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      email,
      subject,
      body,
    } = this.state;

    this.notifications.addNotification({
      title: 'Email sent!',
      message: 'Thanks, I\'ll be in touch soon.',
      level: 'success',
    });

    this.setState({
      name: '',
      email: '',
      subject: '',
      body: '',
    });

    fetch('/api/sendContactEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        body,
      }),
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      name,
      email,
      subject,
      body,
    } = this.state;
    const { data } = this.props;
    return (
      <MuiThemeProvider>
        <Layout>
          <Helmet title={`Contact | ${data.site.siteMetadata.title}`} />
          <NotificationSystem ref={(e) => { this.notifications = e; }} />
          <h1>Contact</h1>
          <p>
            The best way to get in touch is via email:{' '}
            <Mailto email="jason@stallin.gs" obfuscate>jason@stallin.gs</Mailto>{' '}
            or by filling out the form below.
          </p>
          <TextField
            hintText="Name"
            name="name"
            value={name}
            fullWidth
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            hintText="Email"
            name="email"
            value={email}
            fullWidth
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            hintText="Subject"
            name="subject"
            value={subject}
            fullWidth
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            floatingLabelText="Content"
            multiLine
            rows={4}
            name="body"
            value={body}
            fullWidth
            onChange={this.handleInputChange}
          />
          <br />
          <RaisedButton label="Send Email" primary onClick={this.handleSubmit} disableTouchRipple />
        </Layout>
      </MuiThemeProvider>
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
