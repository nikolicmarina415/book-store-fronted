import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            responseMessage: null
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setCurrentActiveLinkProp('/login');
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    clearForm() {
        this.setState({
            email: '',
            password: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginUrl = 'http://localhost:8080/auth/login';
        const postBody = {
            email: this.state.email,
            password: this.state.password
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(loginUrl, requestMetadata)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({ loggedIn: true, responseMessage: response.message });
                        this.clearForm();
                        this.props.setUserIdProp(response.data.id, response.data.firstName);
                        this.props.clearCartProp();
                        this.props.history.push('/');
                    } else {
                        this.setState({ loggedIn: false, responseMessage: response.message });
                    }
                },
                (error) => {
                    this.setState({ loggedIn: false, responseMessage: error });
                }
            );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container"><div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Email</label>
                            <input type="text" className="form-control offset-bottom" required value={this.state.email} onChange={this.handleEmailChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Password</label>
                            <input type="password" className="form-control offset-bottom" required value={this.state.password} onChange={this.handlePasswordChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                    </div>

                    {this.state.responseMessage ? (
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className={this.state.loggedIn ? "alert alert-primary" : "alert alert-danger"}>
                                    {this.state.responseMessage}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </form>
        );
    }
}

export default withRouter(Login);
