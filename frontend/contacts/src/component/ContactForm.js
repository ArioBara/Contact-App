import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/contacts/add', { name, phone });
      setName('');
      setPhone('');
      window.alert('Tambah data berhasil');
      navigate('/contacts');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <br />
        <button type="submit" style={{ marginRight: '10px' }}>Add Contact</button>
        <Link to='/contacts' className='btn'>Back</Link>
      </form>
    </div>
  );
}

export default ContactForm;
