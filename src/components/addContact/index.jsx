import React, { Component } from "react";
import css from "./addContact.module.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid'
import ContactForm from "../contactForm";
import ContactList from "../contactList";






class AddContact extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
  };

  addContact = (newContact) => {
   let existedContact = this.state.contacts.some(
    contact => contact.name === newContact.name && contact.number === newContact.number);
    if (existedContact){
    Notify.warning('This contact already exists');
    return;  
    }
    newContact.id = nanoid()
      this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  render() {
   
    return (
      <div className={css.wrapper}>
        <div className= {css.phoneBook}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        </div>
        
        <ContactList contacts={this.state.contacts} />
      </div>
    );
  }
}

export default AddContact;
