import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ContactUpdate() {
    const { id } = useParams(); // Ambil id kontak dari URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Mendapatkan detail kontak dari server saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contacts/${id}`);
                const { name, phone } = response.data;
                setName(name);
                setPhone(phone);
            } catch (error) {
                console.error('Error fetching contact details:', error);
            }
        };

        fetchData();
    }, [id]); // Jadikan id sebagai dependensi untuk memperbarui data saat id berubah

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/contacts/edit/${id}`, { name, phone });
            window.alert('Edit data berhasil');
            navigate('/contacts'); // Navigasi kembali ke halaman daftar kontak setelah pembaruan berhasil
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <div className="container">
            <h2>Update Contact</h2>
            <form onSubmit={handleUpdate}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <br />
                <button type="submit" style={{ marginRight: '10px' }}>Update contact</button>
                <Link to='/contacts' className='btn'>Back</Link>
            </form>
        </div>
    );
}

export default ContactUpdate;
