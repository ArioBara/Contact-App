from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash

app = Flask(__name__)
api = Api(app)

# Konfigurasi SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/contact'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi ekstensi SQLAlchemy
db = SQLAlchemy(app)
CORS(app)

# Model untuk tabel kontak
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

# Model untuk tabel pengguna
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Parser untuk mengambil data dari request
parser = reqparse.RequestParser()
parser.add_argument('name', type=str, help='Name of the contact')
parser.add_argument('phone', type=str, help='Phone number of the contact')

# Resource untuk menangani operasi CRUD pada daftar kontak
class ContactResource(Resource):
    def get(self, contact_id=None):
        if contact_id is None:
            contacts = Contact.query.all()
            contacts_list = [
                {'id': contact.id, 'name': contact.name, 'phone': contact.phone} 
                for contact in contacts]
            return jsonify(contacts_list)
        else:
            contact = Contact.query.get_or_404(contact_id)
            return jsonify({'id': contact.id, 'name': contact.name, 'phone': contact.phone})

    def post(self):
        args = parser.parse_args()
        new_contact = Contact(name=args['name'], phone=args['phone'])
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({'message': 'Contact created successfully'})

    def put(self, contact_id):
        args = parser.parse_args()
        contact = Contact.query.get_or_404(contact_id)
        contact.name = args['name']
        contact.phone = args['phone']
        db.session.commit()
        return jsonify({'message': 'Contact updated successfully'})

    def delete(self, contact_id):
        contact = Contact.query.get_or_404(contact_id)
        db.session.delete(contact)
        db.session.commit()
        return jsonify({'message': 'Contact deleted successfully'})

# Resource untuk menangani operasi CRUD pada pengguna
class UserResource(Resource):
    def post(self):
        data = request.json
        username = data['username']
        password = data['password']

        # Mengenkripsi password sebelum disimpan ke database
        hashed_password = generate_password_hash(password)

        # Membuat objek User baru
        new_user = User(username=username, password=hashed_password)

        # Menyimpan data pengguna ke database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'})

# Resource untuk menangani operasi login
class LoginResource(Resource):
    def post(self):
        data = request.json
        username = data['username']
        password = data['password']

        # Mengambil data pengguna dari database berdasarkan username
        user = User.query.filter_by(username=username).first()

        # Memeriksa apakah pengguna ditemukan dan password cocok
        if user and check_password_hash(user.password, password):
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Invalid username or password'})

# Menambahkan resource ke API dengan endpoint yang sesuai
api.add_resource(ContactResource,
                 '/contacts',
                 '/contacts/<int:contact_id>',
                 '/contacts/add', '/contacts/edit/<int:contact_id>',
                 '/contacts/delete/<int:contact_id>')
api.add_resource(UserResource, '/register')
api.add_resource(LoginResource, '/login')

if __name__ == '__main__':
    with app.app_context():
        # Membuat tabel dalam database jika belum ada
        db.create_all()
    app.run(debug=True)
