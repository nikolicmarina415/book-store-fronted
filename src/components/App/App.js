import './App.css';
import Header from '../Header/Header.js';
import Navigation from '../Navigation/Navigation.js';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import { BrowserRouter as Router } from "react-router-dom";
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      numberOfBooksInCart: 0,
      userId: sessionStorage.getItem("userId"),
      currentActiveLink: "/"
    };
  }

  addBookToCart = book => {
    const cart = this.state.cart;

    this.setState({ numberOfBooksInCart: this.state.numberOfBooksInCart + 1 });

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].book.id == book.id) {
        cart[i].amount++;
        return;
      }
    }

    cart.push({
      amount: 1,
      book: book,
    });
  }

  removeBookFromCart = book => {
    const cart = this.state.cart;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].book.id == book.id) {
        if (cart[i].amount == 1) {
          cart.splice(i, 1);
        } else {
          cart[i].amount--;
        }
        this.setState({ numberOfBooksInCart: this.state.numberOfBooksInCart - 1 });
        return;
      }
    }
  }

  clearCart = () => {
    this.setState({ cart: [], numberOfBooksInCart: 0 });
  }

  setUserId = (userId, firstName) => {
    if (userId == null) {
      sessionStorage.removeItem("userId");
    } else {
      sessionStorage.setItem("userId", userId);
    }
    if (firstName == null) {
      sessionStorage.removeItem("firstName");
    } else {
      sessionStorage.setItem("firstName", firstName);
    }
    this.setState({ userId: userId });
  }

  setCurrentActiveLink = link => {
    this.setState({ currentActiveLink: link });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header numberOfBooksInCartProp={this.state.numberOfBooksInCart}
            setUserIdProp={this.setUserId}
            userIdProp={this.state.userId}
            clearCartProp={this.clearCart} />
          <Navigation userIdProp={this.state.userId}
            currentActiveLinkProp={this.state.currentActiveLink} />
          <Body addBookToCartProp={this.addBookToCart}
            removeBookFromCartProp={this.removeBookFromCart}
            cartProp={this.state.cart}
            clearCartProp={this.clearCart}
            setUserIdProp={this.setUserId}
            setCurrentActiveLinkProp={this.setCurrentActiveLink} />
        </Router>
        <Footer />
      </div>
    );
  };
}

export default App;
