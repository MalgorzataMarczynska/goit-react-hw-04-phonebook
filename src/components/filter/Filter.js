import css from './Filter.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useState, useRef } from 'react';

export const Filter = searchQuery => {
  const [filters, setFilters] = useState('');
  const filterRef = useRef('');

  const handleFilter = () => {
    setFilters(filterRef.current);
    console.log(filters);
  };
  return (
    <div className={css.filter}>
      <label className={css.label}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        ref={filterRef}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleFilter}
      />
    </div>
  );
};
Filter.propTypes = {
  searchQuery: PropTypes.func,
};
