from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Test(db.Model):
     __tablename__ = "tablaprueba"
     id = db.Column(db.Integer, primary_key=True)
     nombre = db.Column(db.String(80), nullable=False)
     email = db.Column(db.String(150), unique=True)
