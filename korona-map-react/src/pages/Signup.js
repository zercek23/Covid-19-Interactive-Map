import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from "react-router-dom";

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            password: ''
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
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const { name, password } = this.state;
        if (true) {
            <Redirect to="/" />
        }
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="name" value={name} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="password" value={password} onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>

                </form>
            </div>
        )
    }
}
