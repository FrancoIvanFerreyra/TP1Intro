from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
     __tablename__ = "products"
     id = db.Column(db.Integer, primary_key=True, )
     name = db.Column(db.String(80), nullable=False)
     description = db.Column(db.String(150))
     price = db.Column(db.Float, nullable=False)

class Client(db.Model):
     __tablename__ = "clients"
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(80), nullable=False)
     surname = db.Column(db.String(80), nullable=False)
     email = db.Column(db.String(80), unique=True, nullable=False)
     phoneNumber = db.Column(db.String(80), nullable=False)
     