import { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: new Date().toLocaleString(),
            randomQuote: ''
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: new Date().toLocaleString()
            })
        }, 1000);

        this.fetchRandomQuote();
        setInterval(() => {
            this.fetchRandomQuote();
        }, 15000);
    }

    fetchRandomQuote() {
        fetch("https://api.quotable.io/random")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    randomQuote: response.content + " - " + response.author
                });
            });
    }

    render() {
        return (
            <div className="Footer">
                <p>{this.state.currentTime}</p>
                <p>{this.state.randomQuote}</p>
            </div>
        );
    }
}

export default Footer;
