import React, { useState } from 'react';
import './Book.css';
import { bookImagesPath } from '../../../../data/data.js';

function Book(props) {

    const book = props.bookProp;
    const [showBookButtons, setShowBookButtons] = useState(false);

    return (
        <div className="Book"
            onMouseEnter={!props.disableBookButtonsProp ? () => setShowBookButtons(true) : null}
            onMouseLeave={!props.disableBookButtonsProp ? () => setShowBookButtons(false) : null}>
            <img className="book-image" src={bookImagesPath + '/' + book.imagePath + '.png'} />
            <div>{book.genreData.name}</div>
            <div>{book.title}</div>
            <div>{book.authorData.firstName} {book.authorData.lastName}</div>
            <div>{book.price} <span style={{color: "green"}}>$</span></div>

            {showBookButtons ?
                (<>
                    <div className="remove-book-container">
                        <button className="book-button btn-dark" onClick={ () => props.minusClickedProp(book) }>-</button>
                    </div>
                    <div className="add-book-container">
                        <button className="book-button btn-light" onClick={ () => props.plusClickedProp(book) }>+</button>
                    </div>
                </>) : null
            }
        </div>
    );
}

export default Book;
