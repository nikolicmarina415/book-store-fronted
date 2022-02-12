import './Cart.css';
import Book from '../Books/Book/Book.js';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.props.setCurrentActiveLinkProp('/cart');

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
                        this.props.history.push('/');
                    } else {
                        this.setState({ isLoaded: true });
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

    checkout = () => {
        this.props.history.push('/checkout');
    }

    getTotalCartAmount = (cart) => {
        let totalCartAmount = 0;
        for (let i = 0; i < cart.length; i++) {
            totalCartAmount += cart[i].book.price * cart[i].amount;
        }
        return totalCartAmount;
    }

    renderCart() {
        const cart = this.props.cartProp;

        return (
            <div className="row">
                <div className="col-lg-3 col-md-3 total-cart-amount">
                    Total amount:
                    <div>{this.getTotalCartAmount(cart)} <span style={{ color: "green" }}>$</span></div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="row">
                        {cart.length == 0 ?
                            (<div className="offset-lg-3 col-lg-6 cart-empty">
                                Cart is empty
                            </div>) : (
                                cart.map(cartEntry => {
                                    return (
                                        <div key={cartEntry.book.id} className="col-lg-3 col-md-4 col-sm-12 col-12">
                                            <Book bookProp={cartEntry.book}
                                                plusClickedProp={this.props.addBookToCartProp}
                                                minusClickedProp={this.props.removeBookFromCartProp} />
                                            <div className="book-amount">
                                                Amount: {cartEntry.amount}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    {cart.length != 0 ? (<button className="btn btn-primary btn-checkout" onClick={() => this.checkout()}>Checkout</button>) : null}
                </div>
            </div>
        );
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return this.renderCart();
        }
    }
}

export default withRouter(Cart);
