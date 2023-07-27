import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ filter, contacts, deleteContact }) => {
  const filterContacts = contacts =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <ul>
      {/* filtruje wszystko co przychodzi z API, to co przychodzi z API jest w nawiasie */}
      {/* (this.props.contact)to to, co przychodzi z API */}
      {filterContacts(contacts).map(contact => (
        <li className={css.contact} key={contact.id}>
          {contact.name}: {contact.number}&nbsp;
          <button
            className={css.button}
            onClick={() => {
              deleteContact(contact.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

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
