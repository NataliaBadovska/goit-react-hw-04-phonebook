import React, { Component } from "react";
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook';
import Section from './Section';
import Contacts from "./Contacts";
import Filter from "./Filter";
 
class App extends Component{
  state = {
    contacts: [],
    // contacts: [
    //   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    //   {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    //   {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    //   {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    // ],
    filter: '',
  }

  // componentDidMount() {
  //   let keys = Object.keys(localStorage);
  //   for (let key of keys) {
  //     let receivedKeys = localStorage.getItem(key)
  //     const parsedContacts = JSON.parse(receivedKeys);

  //     if (parsedContacts)
  //     {
  //       this.setState(prevState => ({ contacts: [...prevState.contacts, parsedContacts] })   
  //       )}
        
  //   }
  //  }   
  

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length < contacts.length) {
      // if (prevState.contacts.length === 0) {
      //   // localStorage.setItem(addedContact.id, JSON.stringify(addedContact))
      // }
      for (const contactPrev of prevState.contacts) {
        const addedContact = contacts.find(contact => contact !== contactPrev)
        localStorage.setItem(addedContact.id, JSON.stringify(addedContact))
      }
      
    }

    if (prevState.contacts.length > contacts.length) {
      for (const contactActual of contacts) {
        const deletedContact = prevState.contacts.find(prevContact => prevContact !== contactActual)
        localStorage.setItem(deletedContact.id, JSON.stringify(deletedContact))
      }
    }
  }

  verifyingIdentityOfNames = (name) => {
    const { contacts } = this.state; 
    const normalizedName = name.toLowerCase();

    for (const contact of contacts) {
        if (contact.name.toLowerCase() === normalizedName)
            {
          alert(name + " is already in contacts.");
          return true;
             }
    }
  }

  addContact = ({ name, number }) => {
  const contact = {
      name,
      number,
      id: nanoid()
    }  

    this.setState(prevState => ({ contacts: [contact, ...prevState.contacts] }));
  }

  getVerifiedContact = ({ name, number }) => {
    !this.verifyingIdentityOfNames(name) && this.addContact({ name, number });

  }

  filteringByName = (data) => {
    this.setState({ filter: data });
  }

  getVisibleContacts = () => {
    const { filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== contactId )})) 
  }

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
  
     return (
       <>
         <Section title="Phonebook">
           <Phonebook onSubmit={this.getVerifiedContact} contacts={contacts} />
         </Section >

         <Section title="Contacts">
           <Filter filtering={this.filteringByName} filter={filter} />
           <Contacts options={visibleContacts} deleteContact={this.deleteContact} />
         </Section>
         
       </>
    )
}
}

// export default App;

