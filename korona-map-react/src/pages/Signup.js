import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            password: '',
            isLogined: false,
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = async (e) => {
        e.preventDefault();

        console.log(this.state);

        await axios.post('http://localhost:64148/api/Login', this.state)
            .then(response => {
                console.log(response)
                this.setState({ isLogined: true });
            })
            .catch(error => {
                console.log(error)
            })        
    }

    render() {
        const { name, password } = this.state;
        if (this.state.isLogined) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="name" value={name} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
