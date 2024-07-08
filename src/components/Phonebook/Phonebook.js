import { useState } from "react";
import { nanoid } from 'nanoid';
import css from './Phonebook.module.css';

function Phonebook({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleChangeInput = (evt) => {
        switch (evt.target.name) {
            case 'name':
                setName(evt.target.value);
                break;
            case 'number':
                setNumber(evt.target.value);
                break;
            default:
                return;
        }
    }

   const handleSubmit = (evt) => {
       evt.preventDefault();
    
       onSubmit({ name, number });
        resetForm();
    }

    const resetForm = () => {
        setName('');
        setNumber('');
    }

    return(
        <>
                <form className={css.form} onSubmit={handleSubmit}>
                    
                    <label id={nameInputId} className={css.labelName}>Name</label>
                    <input type="text" name="name" id={nameInputId} value={name} onChange={handleChangeInput} required className={css.inputForm} />
                    
                    <label id={numberInputId} className={css.labelName}>Number</label>
                     <input type="tel" name="number" id={numberInputId} value={number} required onChange={handleChangeInput} className={css.inputForm}/>
                    
                    <button type="submit" className={css.button}>Add contact</button>
                </form>
        </>
    )
    
}

export default Phonebook;