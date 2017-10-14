import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import 'whatwg-fetch';
import 'typeface-roboto'; // eslint-disable-line import/extensions

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

    this.setState({
      name: '',
      email: '',
      subject: '',
      body: '',
    });

    fetch('/sendContactEmail', {
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
    return (
      <MuiThemeProvider>
        <div>
          <h1>Contact</h1>

          <TextField
            hintText="Name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            hintText="Email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            hintText="Subject"
            name="subject"
            value={subject}
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            floatingLabelText="Content"
            multiLine
            rows={4}
            name="body"
            value={body}
            onChange={this.handleInputChange}
          />
          <br />
          <RaisedButton label="Send Email" primary onClick={this.handleSubmit} disableTouchRipple />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Contact;
