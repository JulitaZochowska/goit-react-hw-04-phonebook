import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

class ContactList extends Component {
  filterContacts = contacts =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.props.filter.toLowerCase())
    );

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    return (
      <ul>
        {/* filtruje wszystko co przychodzi z API, to co przychodzi z API jest w nawiasie */}
        {/* (this.props.contact)to to, co przychodzi z API */}
        {this.filterContacts(this.props.contacts).map(contact => (
          <li className={css.contact} key={contact.id}>
            {contact.name}: {contact.number}&nbsp;
            <button
              className={css.button}
              onClick={() => {
                this.props.deleteContact(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
export default ContactList;
