import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

import { nanoid } from 'nanoid';

import ContactList from './contacts/Contacts';
import Form from './form/form';
import Section from './section/section';
import Filter from './filter/filter';

function Phonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // add contact
  const addNewContact = e => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newNumber = e.target.number.value;

    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return Notiflix.Report.failure(
        'Error',
        `${newContact.name} is already in contacts`,
        'OK'
      );
    }

    setContacts(contacts => [...contacts, newContact]);
  };

  // delete contact
  const deleteContact = e => {
    const contactId = e.target.id;

    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );

    setContacts([...updatedContacts]);
  };

  // prevent submit
  const preventSubmit = e => {
    e.preventDefault();
  };

  // filter
  const handleChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // local storage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContats = JSON.parse(savedContacts);

    if (parsedContats === null) {
      return;
    }

    if (parsedContats.length > 0) {
      setContacts(parsedContats);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Section title="Phonebook">
        <Form onSubmit={addNewContact} />
      </Section>
      <Section title="Contacts">
        <ContactList contacts={filteredContacts()} onClick={deleteContact}>
          <Filter onChange={handleChange} onSubmit={preventSubmit} />
        </ContactList>
      </Section>
    </div>
  );
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
