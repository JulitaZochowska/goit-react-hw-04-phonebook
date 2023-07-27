import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (id, name, number) => {
    // map jest by zrobić tablicę name'ów a bez map byłaby tablica obiektów (obiekt zawiera id, name...)
    if (this.state.contacts.map(contact => contact.name).includes(name)) {
      // alert to funkcja!!!
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: id,
            name: name,
            number: number,
          },
        ],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => {
      const updatedContacts = [...prevState.contacts];
      // zwraca nam numer w tablicy elementu id
      const index = updatedContacts.map(contact => contact.id).indexOf(id);
      updatedContacts.splice(index, 1);
      return { contacts: updatedContacts };
    });
  };

  setFilter = event => {
    this.setState(prevState => ({
      ...prevState,
      filter: event.target.value,
    }));
  };

  componentDidMount() {
    const contactsJSON = localStorage.getItem('contacts');

    if (contactsJSON) {
      this.setState({ contacts: JSON.parse(contactsJSON) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
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
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} setFilter={this.setFilter} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
