import { Component } from 'react';
import Notiflix from 'notiflix';

import { nanoid } from 'nanoid';

import ContactList from './contacts/Contacts';
import Form from './form/form';
import Section from './section/section';
import Filter from './filter/filter';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const name = this.state.name;
    const number = this.state.number;

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return Notiflix.Report.failure(
        'Error',
        `${newContact.name} is already in contacts`,
        'OK'
      );
    }

    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  preventSubmit = e => {
    e.preventDefault();
  };

  filter = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = e => {
    const contactId = e.target.id;

    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({
      contacts: [...updatedContacts],
    });
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContats = JSON.parse(savedContacts);

    if (parsedContats === null) {
      return;
    }

    if (parsedContats.length > 0) {
      this.setState({ contacts: parsedContats });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newState = this.state;
    if (prevState.contacts.length !== newState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(newState.contacts));
    }
  }

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit} />
        </Section>
        <Section title="Contacts">
          <ContactList contacts={this.filter()} onClick={this.deleteContact}>
            <Filter
              onChange={this.handleChange}
              onSubmit={this.preventSubmit}
            />
          </ContactList>
        </Section>
      </div>
    );
  }
}

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <Phonebook />
    </div>
  );
};
