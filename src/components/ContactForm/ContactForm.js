import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

export const ContactForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>Name</label>
      <input
        className={css.input}
        type="text"
        name="username"
        value={username}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={e => setUsername(e.target.value)}
      />
      <label className={css.label}>Number</label>
      <input
        className={css.input}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={e => setNumber(e.target.value)}
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  inputChange: PropTypes.func,
  leaveSubmit: PropTypes.func,
};
