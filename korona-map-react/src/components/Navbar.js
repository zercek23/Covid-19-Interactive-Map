import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="topnav">
                <Link to="/">
                    <button >
                        Home
                    </button>
                </Link>
                <Link to="/signup">
                    <button >
                        Sign up
                    </button>
                </Link>
            </div>
        )
    }
}

export default Navbar
