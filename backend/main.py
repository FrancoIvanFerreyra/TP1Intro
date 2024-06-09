from flask import Flask, request, jsonify
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
          "dueDate": product.dueDate,
          "price": product.price
       }
       productsList.append(productData)
    return productsList

@app.route("/stock", methods = ["POST"])
def AddNewProduct():
    #Unpacking product data
    _name = request.json.get("name")
    _description = request.json.get("description")
    _weight = request.json.get("weight")
    _dueDate = request.json.get("dueDate")
    _price = request.json.get("price")

    #Creating product model
    newProduct = Product(
       name = _name,
       description = _description,
       weight = _weight,
       dueDate = _dueDate,
       price = _price
       )
    #Id autoincrement(catching empty table exception)
    try:
      newProduct.id = GetAllProducts()[-1]["id"] + 1
    except IndexError:
       newProduct.id = 1
    
    #Adding row to table and saving changes
    db.session.add(newProduct)
    db.session.commit()

    #Result is OK
    return jsonify("Product saved correctly"), 200

if __name__ == "__main__":
    db.init_app(app)
    with app.app_context():
      db.create_all()
    app.run(port=5000)

