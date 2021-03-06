import React from 'react';
import Component from './App.component';
import './App.css';

import * as BooksAPI from './BooksAPI';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.onOpenSearch = this.onOpenSearch.bind(this)
    this.onCloseSearch = this.onCloseSearch.bind(this)
    this.onChangeShelf = this.onChangeShelf.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.state = {
      showSearchPage: false,
      books: null
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(bks => this.setState({ books: bks }))
      .catch(err => this.setState({ books: [] }))
  }

  onCloseSearch(e) {
    BooksAPI.getAll()
      .then(bks => this.setState({ books: bks, showSearchPage: false }))
      .catch(err => this.setState({ books: [] }))
  }

  onOpenSearch(e) {
    this.setState({ 
      showSearchPage: true,
      books: null
    })
  }

  onChangeShelf(e, book) {
    const shelf = e.target.value
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then((bks) => this.setState({ books: bks }))
      .catch(err => this.setState({ books: [] }))
  }

  onSearch(e) {
    e.preventDefault()
    const query = e.target.value
    if (query && query.length > 2) {
      BooksAPI.search(query)
        .then((bks) => this.setState({ books: bks || [] }))
        .catch(err => this.setState({ books: [] }))
    }
  }

  render() {
    return (
      <Component
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        onCloseSearch={this.onCloseSearch}
        onOpenSearch={this.onOpenSearch}
        onChangeShelf={this.onChangeShelf}
        onSearch={this.onSearch}
      />
    );
  }
}

export default App;
