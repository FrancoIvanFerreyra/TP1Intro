from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class PaymentMethod(enum.Enum):
     CASH = 1
     BANK_TRANSFER = 2
     EWALLET_TRANSFER = 3
     CREDIT_CARD = 4
     DEBIT_CARD = 5

class Product(db.Model):
     __tablename__ = "products"
     id = db.Column(db.Integer, primary_key=True, )
     name = db.Column(db.String(80), nullable=False)
     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
     description = db.Column(db.String(150))
     price = db.Column(db.Float, nullable=False)

class Category(db.Model):
     __tablename__ = "categories"
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(50), nullable=False)

class Client(db.Model):
     __tablename__ = "clients"
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(80), nullable=False)
     surname = db.Column(db.String(80), nullable=False)
     email = db.Column(db.String(80), unique=True, nullable=False)
     payment_method = db.Column(db.Enum(PaymentMethod), nullable=False)
     phone_number = db.Column(db.String(80), nullable=False)
     
     


