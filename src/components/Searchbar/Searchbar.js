import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Searchbar.module.css';

const {
  Searchbar: SearchbarWrap,
  SearchForm,
  SearchForm_button,
  SearchForm_input,
} = styles;

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    e.target.reset();
  };

  render() {
    return (
      <header className={SearchbarWrap}>
        <form className={SearchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={SearchForm_button}>
            <BsSearch size="20" />
          </button>

          <input
            className={SearchForm_input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
