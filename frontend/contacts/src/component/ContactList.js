import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ContactList() {
    const [contacts, setContact] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, [])


    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/contacts');
            setContact(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/contacts/delete/${id}`)
            window.alert('delete data berhasil');
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
    return (
        <div className="container">
            <h2>Contact List</h2>
            <Link to='/contacts/add' className="btn">Tambah data</Link>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        <p>Name: {contact.name}</p>
                        <p>Phone: {contact.phone}</p>
                        <Link to={`/contacts/edit/${contact.id}`} className="btn">Edit</Link>
                        <button onClick={() => handleDelete(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactList;