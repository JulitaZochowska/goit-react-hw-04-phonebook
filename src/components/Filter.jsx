import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

class Filter extends Component {
  render() {
    const { filter, setFilter } = this.props;
    return (
      <div>
        <label>Find contacts by name</label>
        <br />
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filter}
          onChange={setFilter}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};
export default Filter;
