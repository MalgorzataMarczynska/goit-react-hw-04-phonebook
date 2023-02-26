import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './filter/Filter.js';
import { ContactList } from './ContactList/ContactList.js';
import { ContactItem } from './ContactItem/ContactItem.js';
import { ContactForm } from './ContactForm/ContactForm.js';

const INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactList = localStorage.getItem('contact-list');
    const parsedList = JSON.parse(contactList);
    return parsedList?.length > 0 ? parsedList : INITIAL_STATE;
  });

  const [filters, setFilters] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const target = e.target;
    const username = target.username.value;
    const number = target.number.value;
    const nameId = nanoid();
    const contact = { id: nameId, name: username, number: number };
    setContacts(contacts.concat(contact));
    const isDuplicate = contacts.find(cont =>
      cont.name.toLowerCase().includes(contact.name.toLowerCase())
    );
    if (isDuplicate) {
      setContacts(contacts);
      return alert(`${contact.name} is already in contacts`);
    }

    return { contacts };
  };
  const handleFilter = evt => {
    const filterValue = evt.target.value;
    setFilters(filterValue);
  };

  const removeContact = id => {
    const filteredContacts = contacts.filter(item => item.id !== id);
    setContacts(filteredContacts);
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
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <div>
      <h1 className="main-title">Phonebook</h1>
      <section>
        <ContactForm handleSubmit={handleSubmit} />
      </section>
      <section>
        <h2 className="title">Contacts</h2>
        <Filter searchQuery={handleFilter} />
        <ContactList>
          {filters === '' ? (
            <ContactItem
              stateArray={contacts}
              removeItem={removeContact}
            ></ContactItem>
          ) : (
            <ContactItem
              stateArray={filteredContacts}
              removeItem={removeContact}
            ></ContactItem>
          )}
        </ContactList>
      </section>
    </div>
  );
};
