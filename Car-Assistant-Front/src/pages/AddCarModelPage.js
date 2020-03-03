import React, { Component } from 'react';
import axios from 'axios'
import { getJwt } from '../components/LocalStorage'

class AddCarModelPage extends Component {
    state = {

        carModel: {
            oil: '',
            timingGear: '',
            brakePads: '',
            model: '',
            carBrand: ''
        }
    }

    handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        this.setState({

            [name]: value,
            carModel: {
                ...this.state.carModel,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        const jwt = getJwt();
        const carModel = this.state.carModel

        if (carModel.oil === '' || carModel.timingGear === '' || carModel.brakePads === '' || carModel.model === '' || carModel.carBrand === '') {
            window.alert("You should complete all fields")
        }
        else {
            axios.post(`/car/model/add/car/model`,
                this.state.carModel, { headers: { Authorization: `${jwt}` } }).then((respone) => {
                    if (respone.status === 201) {

                        this.props.history.push('/');
                    }
                }).catch(error => {

                    if (error.response.status === 400) {
                        window.alert(error.response.data.errors);
                    }
                    if (error.response.status === 409) {

                        window.alert("This model is exist");
                    }
                })
        }
    }

    render() {
        return (

            <form onSubmit={this.handleSubmit} >

                <label>
                    Brand:
              <input type="text" name="carBrand" onChange={this.handleChange} value={this.state.carModel.carBrand} className="form" />
                </label>

                <label>
                    Model:
                    <input type="text" name="model" value={this.state.carModel.model} onChange={this.handleChange} className="form" />
                </label>


                <label>
                    Recommended oil change after passing:
                    <input type="number" name="oil" onChange={this.handleChange} value={this.state.carModel.oil} className="form" />
                </label>


                <label>
                    Recommended replacement of brake pads after passing:
                    <input type="number" name="brakePads" onChange={this.handleChange} value={this.state.carModel.brakePads} className="form" />
                </label>


                <label>
                    Recommended timing gear replacement after passing:
                    <input type="number" name="timingGear" onChange={this.handleChange} value={this.state.carModel.timingGear} className="form" />
                </label>
                <input type="submit" value="Dodaj" className="form" />

            </form>


        )
    }
}

export default AddCarModelPage;