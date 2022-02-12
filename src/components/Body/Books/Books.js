import { Component } from 'react';
import './Books.css';
import Filters from './Filters/Filters.js';
import Book from './Book/Book.js';
import { withRouter } from 'react-router-dom';

class Books extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            books: [],
            isAdmin: false,
        };
    }

    componentDidMount() {
        this.props.setCurrentActiveLinkProp('/books');

        const adminUrl = 'http://localhost:8080/auth/admin';
        const postBody = {
            id: sessionStorage.getItem("userId")
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(adminUrl, requestMetadata)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({ isAdmin: true });
                    } else {
                        this.setState({ isAdmin: false });
                    }
                    this.fetchBooks();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    fetchBooks() {
        fetch("http://localhost:8080/books")
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({
                            isLoaded: true,
                            books: response.data
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                            error: response.message
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    updateBooks = filteredBooks => {
        this.setState({ books: filteredBooks });
    }

    plusClicked = book => {
        if (this.state.isAdmin) {
            this.props.setUpdatingBookProp(book);
            this.props.history.push('/books/book-details');
        } else {
            this.props.addBookToCartProp(book);
        }
    }

    minusClicked = book => {
        if (this.state.isAdmin) {
            const answer = window.confirm("Are you sure you want to delete this book?");
            if (answer) {
                this.deleteBook(book);
            }
        } else {
            this.props.removeBookFromCartProp(book);
        }
    }

    deleteBook = book => {
        const booksUrl = 'http://localhost:8080/books/' + book.id;
        const requestMetadata = {
            method: 'DELETE'
        };

        fetch(booksUrl, requestMetadata)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 204) {
                        this.fetchBooks();
                    } else {
                        this.setState({
                            isLoaded: true,
                            error: response.message
                        });
                    }
                }
            );
    }

    createNewBook = () => {
        this.props.setUpdatingBookProp(null);
        this.props.history.push('/books/book-details');
    }

    renderBooks() {
        return (
            <div className="Books container">
                <div className="row">
                    <div className="col-lg-6"></div>
                    {this.state.isAdmin ? (
                        <button className="btn btn-primary create-new-book" onClick={() => this.createNewBook()}>Create new book</button>
                    ) : null}
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                        <Filters books={this.state.books} updateBooksProp={this.updateBooks} />
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                        <div className="container">
                            <div className="row">
                                {this.state.books.map(book => {
                                    return (
                                        <div key={book.id} className="col-lg-3 col-md-4 col-sm-12 col-12">
                                            <Book bookProp={book}
                                                plusClickedProp={this.plusClicked}
                                                minusClickedProp={this.minusClicked}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return this.renderBooks();
        }
    }
}

export default withRouter(Books);
