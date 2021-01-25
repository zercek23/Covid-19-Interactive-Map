import React, { Component } from 'react'

export default class CaseList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {countryDatas} = this.props;
        return (
            <div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Total Case</th>
                        <th>Total Recovered</th>
                        <th>Total Deaths</th>
                    </tr>
                    {countryDatas.map((country) => (
                        <tr key={country.id}>
                            <td>
                                {country.name}
                            </td>
                            <td>
                                {country.totalCase}
                            </td>
                            <td>
                                {country.totalRecovered}
                            </td>
                            <td>
                                {country.totalDeaths}
                            </td>
                        </tr>
                    )
                    )}
                </table>
            </div>
        )
    }
}
