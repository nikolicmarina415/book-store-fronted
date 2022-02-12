import { Component } from 'react';
import './Register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            emailError: null,
            registered: false,
            responseMessage: null
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setCurrentActiveLinkProp('/register');
    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    clearForm() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
    }

    emailValidation() {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!this.state.email || regex.test(this.state.email) === false) {
            this.setState({
                emailError: "Email is not valid"
            });
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.emailValidation()) {
            return;
        }

        this.setState({emailError: null});

        const registerUrl = 'http://localhost:8080/auth/register';
        const postBody = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
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

        fetch(registerUrl, requestMetadata)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 201) {
                        this.setState({ registered: true, responseMessage: response.message });
                        this.clearForm();
                    } else {
                        this.setState({ registered: false, responseMessage: response.message });
                    }
                },
                (error) => {
                    this.setState({ registered: false, responseMessage: error });
                }
            );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>First name</label>
                            <input type="text" className="form-control offset-bottom" required value={this.state.firstName} onChange={this.handleFirstNameChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Last name</label>
                            <input type="text" className="form-control offset-bottom" required value={this.state.lastName} onChange={this.handleLastNameChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <label>Email</label>
                            {this.state.emailError ? (
                                <div className="email-error">{this.state.emailError}</div>
                            ) : null}
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
                            <button className="btn btn-primary" type="submit">Register</button>
                        </div>
                    </div>

                    {this.state.responseMessage ? (
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className={this.state.registered ? "alert alert-primary" : "alert alert-danger"}>
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

export default Register;
