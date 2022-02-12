import { Component } from 'react';
import './BookDetails.css';
import { bookImagesPath, bookPriceLimits } from '../../../data/data.js';

class BookDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            book: props.updatingBookProp ? props.updatingBookProp : {
                id: null,
                title: '',
                imagePath: '',
                genreId: null,
                authorId: null,
                price: '',
            },
            error: null,
            isLoaded: false,
            requestSuccess: false,
            responseMessage: null,
            genres: [],
            authors: [],
            showAlert: false,
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleImagePathChange = this.handleImagePathChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                        this.fetchGenres();
                    } else {
                        this.props.history.push('/');
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    fetchGenres() {
        fetch("http://localhost:8080/genres")
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({
                            genres: response.data,
                            book: {
                                ...this.state.book,
                                genreId: response.data[0].id
                            }
                        });
                        this.fetchAuthors();
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

    fetchAuthors() {
        fetch("http://localhost:8080/authors")
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({
                            authors: response.data,
                            book: {
                                ...this.state.book,
                                authorId: response.data[0].id
                            },
                            isLoaded: true,
                            error: null
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

    handleTitleChange(event) {
        this.setState({ book: { ...this.state.book, title: event.target.value } });
    }

    handleImagePathChange(event) {
        this.setState({ book: { ...this.state.book, imagePath: event.target.value } });
    }

    handleGenreChange(event) {
        this.setState({ book: { ...this.state.book, genreId: event.target.value } });
    }

    handleAuthorChange(event) {
        this.setState({ book: { ...this.state.book, authorId: event.target.value } });
    }

    handlePriceChange(event) {
        this.setState({ book: { ...this.state.book, price: event.target.value } });
    }

    handleSubmit(event) {
        event.preventDefault();

        const genreId = this.state.book.genreId;
        const authorId = this.state.book.authorId;
        const booksUrl = 'http://localhost:8080/books';
        const postBody = {
            id: this.state.book.id,
            title: this.state.book.title,
            imagePath: this.state.book.imagePath,
            genreData: { id: genreId },
            authorData: { id: authorId },
            price: this.state.book.price
        };
        const requestMetadata = {
            method: this.state.book.id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(booksUrl, requestMetadata)
            .then(res => res.json())
            .then(
                (response) => {
                    if ((this.state.book.id && response.statusCode == 200) || (!this.state.book.id && response.statusCode == 201)) {
                        this.setState({ requestSuccess: true, responseMessage: response.message, showAlert: true });
                        setTimeout(() => {
                            this.setState({
                                showAlert: false
                            })
                        }, 2000);
                    } else {
                        this.setState({ requestSuccess: false, responseMessage: response.message });
                    }
                },
                (error) => {
                    this.setState({ requestSuccess: false, responseMessage: error });
                }
            );
    }

    renderBookDetails() {
        const genreOptions = this.state.genres.map((genre) =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        );

        const authorOptions = this.state.authors.map((author) =>
            <option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Title</label>
                            <input type="text" className="form-control offset-bottom" required value={this.state.book.title} onChange={this.handleTitleChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Price</label>
                            <input type="number" min={bookPriceLimits.lower} max={bookPriceLimits.upper} className="form-control offset-bottom" required value={this.state.book.price} onChange={this.handlePriceChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Genre</label>
                            <select id="genre" className="form-control offset-bottom" onChange={this.handleGenreChange}>
                                {genreOptions}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Author</label>
                            <select id="author" className="form-control offset-bottom" onChange={this.handleAuthorChange}>
                                {authorOptions}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Image</label>
                            <input type="text" className="form-control offset-bottom" required value={this.state.book.imagePath} onChange={this.handleImagePathChange}></input>
                            <img className="book-image" src={bookImagesPath + '/' + this.state.book.imagePath + '.png'} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <button className="btn btn-primary btn-create" type="submit">{this.state.book.id ? "Update" : "Create"}</button>
                        </div>
                    </div>

                    {this.state.showAlert && this.state.responseMessage ? (
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className={this.state.requestSuccess ? "alert alert-primary" : "alert alert-danger"}>
                                    {this.state.responseMessage}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </form>
        );
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return this.renderBookDetails();
        }
    }
}

export default BookDetails;
