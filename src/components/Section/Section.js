import css from './Section.module.css'

function Section({ children, title }) {
     return (
            <div className={css.section}>
                <h2 className={css.section__title}>{title}</h2> 
                {children}
            </div>
        )
    }


export default Section;