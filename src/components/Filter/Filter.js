import css from '../Phonebook/Phonebook.module.css';
import { nanoid } from 'nanoid';

function Filter({filter, filtering}) {
    const filterInputId = nanoid();
    
    const onChangeFilterInput = (evt) => {
        const { value } = evt.currentTarget;
        filtering(value);
    }

     return (
            <>
                <label id={filterInputId} className={css.labelName}>Find contacts by name</label>
                <input type="text" name="filter" value={filter} id={filterInputId} className={css.inputForm} onChange={onChangeFilterInput} />
            </>
            
        )

}

export default Filter;