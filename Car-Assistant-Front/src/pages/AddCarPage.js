import React, { Component } from 'react';
import Axios from 'axios';
import { getJwt } from '../components/LocalStorage'
import { getUserId } from '../components/LocalStorage'



export const SelectCarModel = (props) => {
    const list = props.carModel.map(carModel => <option key={carModel.carModelId} value={carModel.carModelId}>{carModel.carBrand}  {carModel.model}</option>)

    return (

        <select name={props.name} value={props.carModel.carModelId} onChange={props.handleChange}>
            {list}
        </select>
    )
}



class AddCar extends Component {

    state = {

        carModel: [
        ],

        car: {
            carMilages: '',
            numberOfKilomentersPerMonth: '',
            kilometersSinceTheLastChangeBraekPads: '',
            kilometersSinceTheLastChangeTimingGear: '',
            kilometersSinceTheLastChangeOil: '',
            carModelId: '',
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

    handleSubmit = (e) => {
        e.preventDefault();
        const car = this.state.car;


        if (car.carMilages === '' || car.numberOfKilomentersPerMonth === '' || car.kilometersSinceTheLastChangeBraekPads === '' ||
            car.kilometersSinceTheLastChangeTimingGear === '' || car.kilometersSinceTheLastChangeOil === '' || car.carModelId === '') {
            window.alert("You should complete all fields")
        } else {
            const jwt = getJwt();
            const userId = getUserId();
            Axios.post(`/users/addCar/${userId}`,
                this.state.car, { headers: { Authorization: `${jwt}` } }
            ).then((respone) => {
                if (respone.status === 201) {

                    this.props.history.push('/cars');
                }
            }).catch(error => {

                if (error.response.status === 400) {
                    window.alert(error.response.data.errors);
                }
            })
        }
    }

    componentDidMount() {
        const jwt = getJwt();
        Axios.get('/car/model', { headers: { Authorization: `${jwt}` } }).then(res => this.setState({
            carModel: res.data
        })).catch(err => {
            localStorage.removeItem('cool-jwt')
            this.props.history.push('./Login')
        })


    }

    render() {
        return (

            <form onSubmit={this.handleSubmit} >

                <label>
                    Car model:
                <SelectCarModel name="carModelId" carModel={this.state.carModel} carModelId={this.state.carModelId} handleChange={this.handleChange} />
                </label>


                <label>
                    Car milages:
              <input type="number" value={this.state.car.carMilages} name="carMilages" onChange={this.handleChange} className="form" />
                </label>

                <label>
                    Number of kilomenters per month:
                    <input type="number" name="numberOfKilomentersPerMonth" value={this.state.car.numberOfKilomentersPerMonth} onChange={this.handleChange} className="form" />
                </label>

                <label>
                    Number kilometers since the last change braek pads:
                    <input type="number" name="kilometersSinceTheLastChangeBraekPads" value={this.state.car.kilometersSinceTheLastChangeBraekPads} onChange={this.handleChange} className="form" />
                </label>

                <label>
                    Number kilometers since the last change oil:
                    <input type="number" name="kilometersSinceTheLastChangeOil" value={this.state.car.kilometersSinceTheLastChangeOil} onChange={this.handleChange} className="form" />
                </label>

                <label>
                    Number kilometers since the last change timing gear:
                    <input type="number" name="kilometersSinceTheLastChangeTimingGear" value={this.state.kilometersSinceTheLastChangeTimingGear} onChange={this.handleChange} className="form" />
                </label>

                <input type="submit" value="Add" className="form" />
            </form>

        );
    }
}

export default AddCar;


