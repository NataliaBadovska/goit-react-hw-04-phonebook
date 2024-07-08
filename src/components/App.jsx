import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook';
import Section from './Section';
import Contacts from "./Contacts";
import Filter from "./Filter";

function App() {
    const [contacts, setContacts] = useState(
        [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ]);
    const [filter, setFilter] = useState('');

    const prevContactsRef = useRef();

    useEffect(() => {
        prevContactsRef.current = contacts;
    }, [contacts])

    // useEffect(() => {
    //     let keys = Object.keys(localStorage);

    //     for (let key of keys) {
    //         let receivedKeys = localStorage.getItem(key)
    //         const parsedContacts = JSON.parse(receivedKeys);
    //         if (parsedContacts) {
    //         //   const x=  contacts.filter(contact => contact.name !== parsedContacts.name)
            
    //              setContacts(prevState =>  [parsedContacts, ...prevState]);
    //         }
    //      }
    // },[contacts])

    const entryToStorage = () => {
        const prevContacts = prevContactsRef.current;

        if (prevContacts === undefined || !prevContacts.length) {
            return
        }

        for (const firstContact of prevContacts) {
                 const addedContact = contacts.find(contact => contact !== firstContact)
                 localStorage.setItem(addedContact.id, JSON.stringify(addedContact))
            }
            
            for (const contactActual of contacts) {
                const deletedContact = prevContacts.find(prevContact => prevContact !== contactActual)
                localStorage.setItem(deletedContact.id, JSON.stringify(deletedContact))
            }
    }

   entryToStorage() 
    
    const verifyingIdentityOfNames = (name) => {
        const normalizedName = name.toLowerCase();
    
        for (const contact of contacts) {
            if (contact.name.toLowerCase() === normalizedName)
            {
                alert(name + " is already in contacts.");
                return true;
            }
        }
    }

    const addContact = ({ name, number }) => {
        const contact = {
            name,
            number,
            id: nanoid()
        }  
        
        setContacts(prevState =>  [contact, ...prevState] );
    }
    
    const getVerifiedContact = ({ name, number }) => {
        !verifyingIdentityOfNames(name) && addContact({ name, number });
    }
    
    const filteringByName = (data) => {
        setFilter(data)
    }
    
    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        if (contacts === undefined || !contacts.length) {
            return
        }
        return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));
    }
    
    const deleteContact = (contactId) => {
       setContacts(prevState => prevState.filter(contact => contact.id !== contactId ))
  }
    
    const visibleContacts = getVisibleContacts();
    
    return (
       <>
         <Section title="Phonebook">
           <Phonebook onSubmit={getVerifiedContact} contacts={contacts} />
         </Section >

         <Section title="Contacts">
                <Filter filtering={filteringByName} filter={filter} />
                <Contacts options={visibleContacts} deleteContact={deleteContact} />
                
         </Section>
         
       </>
    )
}

export default App;