import './Header.css';
import { bookImagesPath } from '../../data/data.js';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    getLogoSrc = () => {
        return bookImagesPath + '/e-book.png';
    }

    getCartLogoSrc = () => {
        return bookImagesPath + '/cart.png';
    }

    logout = () => {
        this.setState({ loggedIn: false });
        this.props.clearCartProp();
        this.props.setUserIdProp(null, null);
        this.props.history.push('/');
    }

    render() {
        const userName = this.props.userIdProp != null ? sessionStorage.getItem("firstName") : null;

        return (
            <div className="Header">
                <div className="row">
                    <div className="col-lg-3">
                        <a className="navbar-brand" href="#">
                            <img src={this.getLogoSrc()} className="d-inline-block align-top e-book-logo"></img>
                        </a>
                    </div>
                    <div className={userName != null ? "col-lg-2 e-book-text" : "col-lg-6 e-book-text"}>
                        E-BOOK
                    </div>
                    {userName != null ? (
                        <div className="col-lg-2 username-text">
                            Welcome {userName}
                        </div>
                    ) : null}
                    <div className="col-lg-2">
                        <div className="navbar-brand">
                            <img src={this.getCartLogoSrc()} className="d-inline-block align-top e-book-logo"></img>
                            <div className="cart-logo">
                                <span>{this.props.numberOfBooksInCartProp}</span>
                            </div>
                        </div>
                    </div>
                    {this.props.userIdProp != null ? (
                        <div className="col-lg-1 logout">
                            <button className="btn btn-primary" onClick={() => this.logout()}>Logout</button>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
