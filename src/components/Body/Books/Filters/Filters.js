import { Component } from 'react';
import './Filters.css';
import { bookPriceLimits } from '../../../../data/data.js';

class Filters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: true,
            books: props.books,
            genres: []
        };
    }

    componentDidMount = () => {
        this.filters = {
            title: document.getElementById('title'),
            author: document.getElementById('author'),
            priceFrom: document.getElementById('priceFrom'),
            priceTo: document.getElementById('priceTo'),
            genre: document.getElementById('genre'),
        };

        fetch("http://localhost:8080/genres")
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({
                            isLoaded: true,
                            genres: response.data
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

    filterBooks = () => {
        let filteredBooks = this.state.books.filter(book => {
            return this.checkBookTitle(book) &&
                this.checkBookAuthor(book) &&
                this.checkBookPrice(book) &&
                this.checkBookGenre(book);
        });

        this.props.updateBooksProp(filteredBooks);
    }

    checkBookTitle = book => {
        const titleFilter = this.filters.title.value;
        return !/\S/.test(titleFilter) || book.title.toLowerCase().includes(titleFilter.toLowerCase());
    }

    checkBookAuthor = book => {
        const authorFilter = this.filters.author.value;
        const authorFullName = book.authorData.firstName + ' ' + book.authorData.lastName;
        return !/\S/.test(authorFilter) || authorFullName.toLowerCase().includes(authorFilter.toLowerCase());
    }

    checkBookPrice = book => {
        const priceFrom = this.filters.priceFrom.value;
        const priceTo = this.filters.priceTo.value;

        if (priceFrom && !priceTo && priceFrom >= bookPriceLimits.lower && priceFrom <= bookPriceLimits.upper && book.price >= priceFrom) {
            return true;
        }

        if (priceTo && !priceFrom && priceTo >= bookPriceLimits.lower && priceTo <= bookPriceLimits.upper && book.price <= priceTo) {
            return true;
        }

        if (priceTo && priceFrom && priceTo >= bookPriceLimits.lower && priceTo <= bookPriceLimits.upper &&
            priceFrom >= bookPriceLimits.lower && priceTo <= bookPriceLimits.upper && priceFrom <= priceTo && book.price >= priceFrom && book.price <= priceTo) {
            return true;
        }

        if (!priceTo && !priceFrom) {
            return true;
        }

        return false;
    }

    checkBookGenre = book => {
        const selectedGenreId = this.filters.genre.value;
        if (selectedGenreId == 'All') {
            return true;
        }
        return book.genreData.id == selectedGenreId;
    }

    resetFilters = () => {
        this.filters.title.value = '';
        this.filters.author.value = '';
        this.filters.priceFrom.value = null;
        this.filters.priceTo.value = null;
        this.filters.genre.value = 'All';
        this.filterBooks();
    }

    renderFilters() {
        const genreOptions = this.state.genres.map((genre) =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        );

        return (
            <div className="Filters">

                <label>Title</label>
                <input id="title" type="text" className="form-control offset-bottom" onChange={this.filterBooks}></input>

                <label>Author</label>
                <input id="author" type="text" className="form-control offset-bottom" onChange={this.filterBooks}></input>

                <label>Price from</label>
                <input min={bookPriceLimits.lower} max={bookPriceLimits.upper} id="priceFrom" type="number" className="form-control" onChange={this.filterBooks}></input>

                <label>Price to</label>
                <input min={bookPriceLimits.lower} max={bookPriceLimits.upper} id="priceTo" type="number" className="form-control offset-bottom" onChange={this.filterBooks}></input>

                <label>Genre</label>
                <select id="genre" className="form-control offset-bottom" onChange={this.filterBooks}>
                    <option value="All">All</option>
                    {genreOptions}
                </select>

                <button className="btn btn-primary" onClick={this.resetFilters}>
                    Reset filters
                </button>
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
            return this.renderFilters();
        }
    }
}

export default Filters;
