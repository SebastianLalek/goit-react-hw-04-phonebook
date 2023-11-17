import css from './filter.module.css';

import PropTypes from 'prop-types';

export default function Filter({ onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label className={css.label}>
        <p>Find your contact by name</p>
        <input type="text" name="filter" onChange={onChange} />
      </label>
    </form>
  );
}

Filter.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
