import { Component } from 'react';
import './Home.css';

class Home extends Component {

    componentDidMount() {
        this.props.setCurrentActiveLinkProp('/');
    }

    render() {
        return (
            <div className="Home">
                <div className="row">

                    <div className="col-lg-6">
                        <img src="/bookImages/book.png" className="book-home-image"></img>
                    </div>

                    <div className="col-lg-4">
                        <div className="container">
                            <div className="row general-text">
                                E-Book is a relatively new bookstore, which has been operating since 2018. It exectly focuses on online book sales. On our site's pages, you
                                can find the complete range we offer.
                            </div>
                            <div className="row about-text">
                                You can contact us as follows:
                            </div>
                            <div className="row about-text">
                                Contact phone: +381 11 4239-252
                            </div>
                            <div className="row about-text">
                                Email address: office@ebook.rs
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;
