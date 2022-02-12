import { Component } from 'react';
import './Navigation.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

class Navigation extends Component {

    render() {
        return (
            <div className="Navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <NavigationItem link="/"
                                text="Home"
                                currentActiveLinkProp={this.props.currentActiveLinkProp} />
                        </div>
                        <div className="col-lg-2">
                            <NavigationItem link="/books"
                                text="Books"
                                currentActiveLinkProp={this.props.currentActiveLinkProp} />
                        </div>
                        <div className="col-lg-2">
                            <NavigationItem link="/cart"
                                text="Cart"
                                currentActiveLinkProp={this.props.currentActiveLinkProp} />
                        </div>
                        <div className="col-lg-3">
                            <NavigationItem link="/register"
                                text="Register"
                                currentActiveLinkProp={this.props.currentActiveLinkProp} />
                        </div>
                        {this.props.userIdProp == null ?
                            (
                                <div className="col-lg-3">
                                    <NavigationItem link="/login"
                                        text="Login"
                                        currentActiveLinkProp={this.props.currentActiveLinkProp} />
                                </div>
                            ) :
                            (
                                <div className="col-lg-3">
                                    <NavigationItem link="/orders"
                                        text="Orders"
                                        currentActiveLinkProp={this.props.currentActiveLinkProp} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
