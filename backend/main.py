from flask import Flask, request, jsonify
from models import db, Product, Category, Client


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False


@app.route("/")
def hello_world():
    return "<p>Hello world</p>"


@app.route("/products", methods = ["GET"])
def GetAllProducts():
    productsList = []

    #Getting all products from database
    products = Product.query.order_by(Product.id).all()
    for product in products:
       
       #Saving product data in a dictionary
       productData ={
          "id" : product.id,
          "name" : product.name,
          "category_id" : product.category_id,
          "description" : product.description,
          "price" : product.price,
       }
       productsList.append(productData)
    return productsList


@app.route("/products/<id>", methods = ["GET", "PUT", "DELETE"])
def GetProduct(id):
    #Getting product from database
    product = Product.query.where(Product.id == id).first()
    if product:
      if request.method == "PUT":
        product.name = request.json.get("name")
        product.category_id = request.json.get("category_id")
        product.description = request.json.get("description")
        product.price = request.json.get("price")
        db.session.commit()
        return jsonify("Product data succesfully changed"), 200
      
      elif request.method == "DELETE":
        db.session.delete(product)
        db.session.commit()
        return jsonify("Product deleted succesfully"), 200
      
      else:
        productData ={
          "id" : product.id,
          "name" : product.name,
          "category_id" : product.category_id,
          "description" : product.description,
          "price" : product.price,
       }
        return productData, 200
    else:
       return jsonify("Error: Product doesn´t exist"), 404


@app.route("/products", methods = ["POST"])
def AddNewProduct():
    #Unpacking product data
    _name = request.json.get("name")
    _category_id = request.json.get("category_id")
    _description = request.json.get("description")
    _price = request.json.get("price")

    #Verifying if already exists in database
    coincidence = Product.query.where(Product.name == _name, Product.price == _price).first()
    if coincidence:
      return jsonify("Error, product already exists"), 400
    
    #Creating product model
    newProduct = Product(
      name = _name,
      category_id = _category_id,
      description = _description,
      price = _price,
      )
    #Id autoincrement(catching empty table exception)
    try:
      newProduct.id = GetAllProducts()[-1]["id"] + 1
    except IndexError:
       newProduct.id = 1
    
    #Adding row to table and saving changes
    db.session.add(newProduct)
    try:
      db.session.commit()
    except Exception as error:
       return jsonify(f"Error: {error}"), 500

    #Result is OK
    return jsonify("Product saved correctly"), 200


@app.route("/categories", methods=["GET"])
def get_all_categories():
    categories_list = []

    #Gets categories from database by 'id' order
    categories = Category.query.order_by(Category.id).all()

    #Fills the categories list with the correspondent data
    for category in categories:
        category_data={
            "id": category.id,
            "name": category.name,
        }

        categories_list.append(category_data)

    return categories_list

@app.route("/clients", methods = ["POST"])
def AddNewClient():
    #Unpacking client data
    _name = request.json.get("name")
    _surname = request.json.get("surname")
    _email = request.json.get("email")
    _phoneNumber = request.json.get("phoneNumber")
    _paymentMethod = request.json.get("paymentMethod")

    #Verifying if already exists in database
    coincidence = Client.query.where(Client.email == _email).first()
    if coincidence:
      return jsonify("Error, client already exists"), 400
    
    #Creating client model
    newClient = Client(
      name = _name,
      surname = _surname,
      email = _email,
      phoneNumber = _phoneNumber,
      paymentMethod = _paymentMethod
      )
    
    #Adding row to table and saving changes
    db.session.add(newClient)
    try:
      db.session.commit()
    except Exception as error:
       return jsonify(f"Error: {error}"), 500

    #Result is OK
    return jsonify("Client saved correctly"), 200


if __name__ == "__main__":
    db.init_app(app)
    with app.app_context():
      db.create_all()
    app.run(port=5000)

