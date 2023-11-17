import css from './Contacts.module.css';

import PropTypes from 'prop-types';

export default function ContactList({ contacts, children, onClick }) {
  return (
    <>
      {children}
      <ul className={css.list}>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button className={css.button} id={contact.id} onClick={onClick}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  children: PropTypes.object,
  onClick: PropTypes.func,
};
