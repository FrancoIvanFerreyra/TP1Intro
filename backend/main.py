from flask import Flask
from models import db, Product

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False


@app.route("/")
def hello_world():
    return "<p>Hello world</p>"

@app.route("/stock", methods = ["GET"])
def GetAllProducts():
    productsList = []

    #Getting all products from database
    products = Product.query.order_by(Product.id).all()
    for product in products:
       
       #Saving product data in a dictionary
       productData ={
          "id" : product.id,
          "name" : product.name,
          "description" : product.description,
          "weight" : product.weight,
          "due_date": product.due_date,
          "price": product.price
       }
       productsList.append(productData)
    return productsList

if __name__ == "__main__":
    db.init_app(app)
    with app.app_context():
      db.create_all()
    app.run(port=5000)

