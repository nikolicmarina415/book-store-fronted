import './Orders.css';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            isAdmin: false,
        };
    }

    componentDidMount() {
        const userId = sessionStorage.getItem("userId");
        if (userId == null) {
            this.props.history.push('/');
        }

        this.props.setCurrentActiveLinkProp('/orders');
        this.isAdminUser();
    }

    isAdminUser() {
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
                        this.setState({ isAdmin: true });
                    } else {
                        this.setState({ isAdmin: false });
                    }
                    this.fetchOrdersForUser();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    fetchOrdersForUser() {
        const userId = sessionStorage.getItem("userId");
        fetch('http://localhost:8080/users/' + userId + '/orders')
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.setState({
                            isLoaded: true,
                            orders: response.data
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                            error: response.message
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getTotalOrderPrice = (order) => {
        let totalPrice = 0;
        for (let i = 0; i < order.orderEntryDataList.length; i++) {
            totalPrice += order.orderEntryDataList[i].price;
        }
        return totalPrice;
    }

    completeOrder = order => {
        const ordersUrl = 'http://localhost:8080/orders/' + order.id;
        const requestMetadata = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(ordersUrl, requestMetadata)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.statusCode == 200) {
                        this.fetchOrdersForUser();
                    } else {
                        this.setState({
                            isLoaded: true,
                            error: response.message
                        });
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

    viewOrderDetails = order => {
        this.props.setOrderProp(order);
        this.props.history.push('/order-details');
    }

    renderOrders() {
        const orders = this.state.orders.map(order =>
            <tr key={order.id}>
                <td>{order.id}</td>
                {this.state.isAdmin ? (
                    <td>{order.userData.firstName} {order.userData.lastName}</td>
                ) : null}
                <td>{order.orderStatusData.name}</td>
                <td>{order.country}</td>
                <td>{order.city}</td>
                <td>{order.address}</td>
                <td>{this.getTotalOrderPrice(order)} <span style={{ color: "green" }}>$</span></td>
                <td>
                    <button className="btn btn-light margin-right" onClick={() => this.viewOrderDetails(order)}>View details</button>
                    {this.state.isAdmin && order.orderStatusData.name == "PENDING" ? (
                        <button className="btn btn-secondary" onClick={() => this.completeOrder(order)}>Complete</button>
                    ) : null}
                </td>
            </tr>
        );

        return (
            <div id="table-container" className="container">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            {this.state.isAdmin ? (
                                <th>User</th>
                            ) : null}
                            <th>Status</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Total price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>
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
            return this.renderOrders();
        }
    }
}

export default withRouter(Orders);
