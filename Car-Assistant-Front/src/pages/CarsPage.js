import React, { Component } from 'react';
import { getJwt } from '../components/LocalStorage'
import { getUserId } from '../components/LocalStorage'
import axios from 'axios';
import '../styles/ButtonGroup.css';

export const ShowCars = (props) => {

    const cars = props.value.map(car => (<tr key={car.carUserId}>
        <th>{car.brand}</th>
        <th>{car.carModel}</th>
        <th> <button onClick={() => props.onClickDelete(car.carUserId)} className="buttonLeft">Delete</button>
            <button onClick={() => props.onClickShowMore(car.carUserId)} className="buttonRight">Show more</button>
        </th>

    </tr>))

    return (
        <table>
            <tbody>
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Action</th>
                </tr>
                {cars}
            </tbody>
        </table>
    )
}

class Cars extends Component {
    state = {
        carModel: [],

    }

    componentDidMount() {
        const jwt = getJwt();
        const userId = getUserId();
        axios.get(`/car/model/get/model/${userId}`, { headers: { Authorization: `${jwt}` } }).then(res => this.setState({

            carModel: res.data
        })).catch(err => {
            //     localStorage.removeItem('cool-jwt')
            //    this.props.history.push('./Login')
        })
    }

    handleDeleteCar = (carUserId) => {

        let carModel = this.state.carModel.slice()
        carModel = carModel.filter(car => carUserId !== car.carUserId)
        const jwt = getJwt();
        axios.delete(`/users/delete/car/${carUserId}`, { headers: { Authorization: `${jwt}` } })
        this.setState({
            carModel
        })
    }

    handleShowMore = (carUserId) => {

        this.props.history.push({ pathname: '/show/details', state: { selectedCarUserId: carUserId } })
    }

    render() {
        return (<div>
            <ShowCars value={this.state.carModel} onClickDelete={this.handleDeleteCar}
                onClickShowMore={this.handleShowMore}></ShowCars>
        </div>);
    }
}

export default Cars;

