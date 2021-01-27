import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cases: 0,
            recovered: 0,
            deaths: 0,
            country: '',
            countryId: 0,
            countries: [],
            isSumbitted: false,
            isCountriesLoaded: false,
        }
    }



    changeHandler = e => {
        if (e.target.name === "country") {
            this.setState({[e.target.name]: e.target.value })
            this.setState({countryId: e.target.id })

            //Goruntu
            console.log(e.target.tagName)
            console.log(e.currentTarget.value)
        }
        else{
            this.setState({[e.target.name]: e.target.value })
        }
        
    }

    changeHandlerForOption = e => {
        this.setState({ [e.target.value]: e.target.key })
    }

    async componentDidMount() {
        await fetch('http://localhost:64148/api/Cases/countries')
            .then(res => res.json())
            .then((data) => {
                this.setState({ countries: data, isCountriesLoaded: true })
            })
            .catch(console.log);
    }



    componentDidUpdate(){
        console.log(this.state)
    }

    submitHandler = async (e) => {
        e.preventDefault();


        this.setState({ cases: parseInt(this.state.cases), recovered: parseInt(this.state.recovered), deaths: parseInt(this.state.deaths) });
        console.log(this.state);
        await axios.post('http://localhost:64148/api/Cases/newcase', this.state)
            .then(response => {
                console.log(response)
                this.setState({ isSumbitted: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { cases, recovered, deaths, country, countryId } = this.state;
        if (this.state.isSumbitted) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="cases" value={cases} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="recovered" value={recovered} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="deaths" value={deaths} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <select name="country" value={country} id={countryId} onChange={this.changeHandler}>
                            {this.state.isCountriesLoaded ? this.state.countries.map((countryItem) => (
                                <option key={countryItem.id} id={countryItem.id} >{countryItem.name}</option>
                            )) : <option>loading...</option>}
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
