import React from 'react';
import 'whatwg-fetch';

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
        'Content-Type': 'application/json'
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
      body
    } = this.state;
    return (
      <div>
        <h1>Contact</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name="name" value={name} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input name="email" value={email} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Subject:
            <input name="subject" value={subject} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Body:
            <textarea name="body" value={body} onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Contact;
