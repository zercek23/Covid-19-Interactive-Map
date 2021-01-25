import React, { Component } from 'react'
import axios from 'axios'

class PostForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            countries: []
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        fetch('http://localhost:3000/result')
            .then(res => res.json())
            .then((data) => {
                this.setState({ countries: data })
            })
            .catch(console.log);
        console.log(this.state.countries);
    }

    submitHandler = async (e) => {
        e.preventDefault();


        console.log(this.state.countries);


        this.state.countries.forEach(async (country) => {
            await axios.post('http://localhost:64148/api/Cases/getCountries', country)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        });



    }

    render() {
        const { name, code } = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="name" value={name} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="code" value={code} onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm
