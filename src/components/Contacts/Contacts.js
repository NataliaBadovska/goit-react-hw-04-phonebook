import css from './Contacts.module.css';

function Contacts({ options, deleteContact }) {
     return (
         <ul className={css.listContact}>
            
                {options.map(contact =>
                    <li key={contact.id} className={css.contact}>
                        <div className={css.info}>{contact.name}: {contact.number}</div>
                        <button type="button" className={css.button} onClick={()=>deleteContact(contact.id)}>Delete</button>
                    </li>)} 
               
            </ul>
        )
}

export default Contacts;