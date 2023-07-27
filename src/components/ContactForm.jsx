import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = ({ addContact }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSubmit = e => {
    e.preventDefault();

    addContact(nanoid(), state.name, state.number);

    // zresetuje cały formularz po wysłaniu
    setState(prev => ({ ...INITIAL_STATE }));
  };

  // zeby mona bylo zmienić wartość inputa
  const handleChange = e => {
    const { name, value } = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        className={css.input}
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label>Number</label>
      <input
        className={css.input}
        type="tel"
        name="number"
        value={state.number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};

export default ContactForm;
