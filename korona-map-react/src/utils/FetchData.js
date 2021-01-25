import React, { Component } from "react";

const FetchData = (apiUrl, a) => {
    fetch(apiUrl)
        .then(res => res.json())
        .then((data) => {
            this.setState({ countries: data })
        })
        .catch(console.log)
        
}
