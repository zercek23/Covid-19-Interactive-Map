import React from 'react'

const Contacts = ({ contacts }) => {
    return (
        <div>
            <center><h1>Contact List</h1></center>
            {contacts.map((contact) => (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{contact.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.name}</h6>
                        <h5 className="card-title">{contact.code}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.totalCase}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.totalRecovered}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.totalDeaths}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Contacts