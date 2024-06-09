from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
     __tablename__ = "products"
     id = db.Column(db.Integer, primary_key=True, )
     name = db.Column(db.String(80), nullable=False)
     description = db.Column(db.String(150))
     weight = db.Column(db.Float)
     dueDate = db.Column(db.DateTime)
     price = db.Column(db.Float, nullable=False)
     