import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import React, { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = (id, name, number) => {
    // map jest by zrobić tablicę name'ów a bez map byłaby tablica obiektów (obiekt zawiera id, name...)
    if (contacts.map(contact => contact.name).includes(name)) {
      // alert to funkcja!!!
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevState => [
        ...prevState,
        {
          id: id,
          name: name,
          number: number,
        },
      ]);
    }
  };

  const deleteContact = id => {
    setContacts(prevState => {
      const updatedContacts = [...prevState];
      // zwraca nam numer w tablicy elementu id
      const index = updatedContacts.map(contact => contact.id).indexOf(id);
      updatedContacts.splice(index, 1);
      return updatedContacts;
    });
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  // componentDidMount
  useEffect(() => {
    const contactsJSON = localStorage.getItem('contacts');

    if (contactsJSON) {
      setContacts(JSON.parse(contactsJSON));
    }
  }, []);

  //componentDidUpdate dla contacts
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
        marginLeft: '45px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleFilterChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
