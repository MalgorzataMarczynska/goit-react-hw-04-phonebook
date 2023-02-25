import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './filter/Filter.js';
import { ContactList } from './ContactList/ContactList.js';
import { ContactItem } from './ContactItem/ContactItem.js';
import { ContactForm } from './ContactForm/ContactForm.js';

// const INITIAL_STATE = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
//   filters: '',
// };

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const stateKeys = Array.of('contacts', 'username', 'number');
  const stateMethods = Array.of(setContacts, setUsername, setNumber);

  const { filters } = Filter() || '';

  const handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const typeIndex = stateKeys.findIndex(key => key === name);
    stateMethods[typeIndex](value);
  };

  const handleSubmit = e => {
    //const { username, number } = ContactForm();
    e.preventDefault();
    //e.target.reset();
    const nameId = nanoid();
    const contact = { id: nameId, name: username, number: number };
    setContacts(contacts.concat(contact));
    // const isDuplicate = contacts.find(cont =>
    //   cont.name.toLowerCase().includes(newContact.name.toLowerCase())
    // );
    // if (isDuplicate) return alert(`${newContact.name} is already in contacts`);
    return { contacts };
  };
  const removeContact = id => {
    setContacts(state => {
      contacts.filter(item => item.id !== id);
      return { contacts };
    });
  };

  useEffect(() => {
    const contactList = window.localStorage.getItem('contact-list');
    if (!contactList) return;

    try {
      setContacts(JSON.parse(contactList));
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    const contactListStringified = JSON.stringify(contacts);
    window.localStorage.setItem('contact-list', contactListStringified);
  }, [contacts]);
  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filters.toLowerCase())
  // );
  useEffect(() => {
    console.log('kontakty', contacts, 'name', username, 'number', number);
  }, [contacts, username, number]);
  return (
    <div>
      <h1 className="main-title">Phonebook</h1>
      <section>
        <ContactForm handleSubmit={handleSubmit} handleChange={handleChange} />
      </section>
      <section>
        <h2 className="title">Contacts</h2>
        <Filter />
        <ContactList>
          {filters === '' ? (
            <ContactItem
              stateArray={contacts}
              removeItem={removeContact}
            ></ContactItem>
          ) : (
            <ContactItem
              stateArray={contacts}
              removeItem={removeContact}
            ></ContactItem>
          )}
        </ContactList>
      </section>
    </div>
  );
};
