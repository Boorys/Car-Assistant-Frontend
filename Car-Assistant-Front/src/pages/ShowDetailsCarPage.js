import React, { Component } from 'react';
import Axios from 'axios';
import { getJwt } from '../components/LocalStorage'

class ShowDetailsCarPage extends Component {

    state = {

        carUserId: this.props.location.state.selectedCarUserId,
        car: {
            carMilages: '',
            numberOfKilomentersPerMonth: '',
            kilometersSinceTheLastChangeBraekPads: '',
            kilometersSinceTheLastChangeTimingGear: '',
            kilometersSinceTheLastChangeOil: '',
        }
    }
    handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        this.setState({

            [name]: value,
            car: {
                ...this.state.car,
                [name]: value
            }
        })
    }
    componentDidMount() {
        const jwt = getJwt();
        Axios.get(`/users/get/car/${this.state.carUserId}`, { headers: { Authorization: `${jwt}` } }).then(res => this.setState({

            car: res.data

        })).catch(err => {
            localStorage.removeItem('cool-jwt')
            this.props.history.push('./Login')
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const car = this.state.car;


        if (car.carMilages === '' || car.numberOfKilomentersPerMonth === '' || car.kilometersSinceTheLastChangeBraekPads === '' ||
            car.kilometersSinceTheLastChangeTimingGear === '' || car.kilometersSinceTheLastChangeOil === '' || car.carModelId === '') {
            window.alert("You should complete all fields")
        } else {

            const jwt = getJwt();
            Axios.put(`/users/update/car/${this.state.carUserId}`,
                this.state.car, { headers: { Authorization: `${jwt}` } }
            ).then((respone) => {
                if (respone.status === 200) {

                    this.props.history.push('/cars');
                }
            }).catch(error => {

                if (error.response.status === 400) {
                    window.alert(error.response.data.errors);
                }
            })
        }
    }

    render() {
        return (<>
            <form onSubmit={this.handleSubmit} >

                <label>
                    Car milages:
                    <input type="number" value={this.state.car.carMilages} name="carMilages" onChange={this.handleChange} />
                </label>

                <label>
                    Number of kilomenters per month:
                    <input type="number" name="numberOfKilomentersPerMonth" value={this.state.car.numberOfKilomentersPerMonth} onChange={this.handleChange} />
                </label>

                <label>
                    Number kilometers since the last change braek pads:
                    <input type="number" name="kilometersSinceTheLastChangeBraekPads" value={this.state.car.kilometersSinceTheLastChangeBraekPads} onChange={this.handleChange} />
                </label>

                <label>
                    Number kilometers since the last change oil:
                    <input type="number" name="kilometersSinceTheLastChangeOil" value={this.state.car.kilometersSinceTheLastChangeOil} onChange={this.handleChange} />
                </label>

                <label>
                    Number kilometers since the last change timing gear:
                   <input type="number" name="kilometersSinceTheLastChangeTimingGear" value={this.state.car.kilometersSinceTheLastChangeTimingGear} onChange={this.handleChange} />
                </label>

                <input type="submit" value="Update" />
            </form>

        </>);
    }
}

export default ShowDetailsCarPage;