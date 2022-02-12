import './Body.css';
import { Switch, Route } from "react-router-dom";
import Home from './Home/Home.js';
import Books from './Books/Books.js';
import Cart from './Cart/Cart.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import BookDetails from './BookDetails/BookDetails';
import { Component } from 'react';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import OrderDetails from './OrderDetails/OrderDetails';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updatingBook: null,
      order: null,
    };
  }

  setUpdatingBook = book => {
    this.setState({
      updatingBook: book == null ? null : {
        id: book.id,
        title: book.title,
        price: book.price,
        imagePath: book.imagePath,
        authorId: book.authorData.id,
        genreId: book.genreData.id
      }
    });
  }

  setOrder = order => {
    this.setState({ order: order });
  }

  render() {
    return (
      <div className="Body">
        <Switch>
          <Route exact path="/">
            <Home setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp} />
          </Route>
          <Route exact path="/books">
            <Books addBookToCartProp={this.props.addBookToCartProp}
              removeBookFromCartProp={this.props.removeBookFromCartProp}
              setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp}
              setUpdatingBookProp={this.setUpdatingBook} />
          </Route>
          <Route exact path="/books/book-details">
            <BookDetails setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp}
              updatingBookProp={this.state.updatingBook} />
          </Route>
          <Route exact path="/cart">
            <Cart cartProp={this.props.cartProp}
              addBookToCartProp={this.props.addBookToCartProp}
              removeBookFromCartProp={this.props.removeBookFromCartProp}
              setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp} />
          </Route>
          <Route exact path="/checkout">
            <Checkout cartProp={this.props.cartProp}
              setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp}
              clearCartProp={this.props.clearCartProp} />
          </Route>
          <Route exact path="/orders">
            <Orders setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp}
              setOrderProp={this.setOrder} />
          </Route>
          <Route exact path="/order-details">
            <OrderDetails setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp}
              orderProp={this.state.order} />
          </Route>
          <Route exact path="/login">
            <Login setUserIdProp={this.props.setUserIdProp}
              setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp}
              clearCartProp={this.props.clearCartProp} />
          </Route>
          <Route exact path="/register">
            <Register setCurrentActiveLinkProp={this.props.setCurrentActiveLinkProp} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Body;
