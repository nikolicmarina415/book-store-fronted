import './OrderDetails.css';
import Book from '../Books/Book/Book.js';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class OrderDetails extends Component {

    componentDidMount() {
        this.props.setCurrentActiveLinkProp('/orders');
    }

    getTotalOrderPrice = (order) => {
        let totalPrice = 0;
        for (let i = 0; i < order.orderEntryDataList.length; i++) {
            totalPrice += order.orderEntryDataList[i].price;
        }
        return totalPrice;
    }

    renderOrderDetails() {
        const order = this.props.orderProp;
        
        return (
            <div className="row">
                <div id="order-attributes" className="col-lg-3 col-md-3">
                    <div className="row">
                        <label>Country</label>
                        <input type="text" className="form-control offset-bottom" disabled value={order.country}></input>
                    </div>
                    <div className="row">
                        <label>City</label>
                        <input type="text" className="form-control offset-bottom" disabled value={order.city}></input>
                    </div>
                    <div className="row">
                        <label>Address</label>
                        <input type="text" className="form-control offset-bottom" disabled value={order.address}></input>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="row">
                        {order.orderEntryDataList.map(orderEntry => {
                            return (
                                <div key={orderEntry.id} className="col-lg-3 col-md-4 col-sm-12 col-12">
                                    <Book bookProp={orderEntry.bookData}
                                        disableBookButtonsProp={true} />
                                    <div className="quantity">
                                        Quantity: {orderEntry.quantity}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 total-order-price">
                    Total price:
                    <div>{this.getTotalOrderPrice(order)} <span style={{ color: "green" }}>$</span></div>
                </div>
            </div>
        );
    }

    render() {
        const order = this.props.orderProp;
        if (order) {
            return this.renderOrderDetails();
        }
        this.props.history.push('/orders');
        return <div></div>
    }
}

export default withRouter(OrderDetails);
