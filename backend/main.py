from flask import Flask, request, jsonify
from models import db, Product, Category, Client, PurchaseOrder
from sqlalchemy import func


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False


@app.route("/")
def hello_world():
    return "<p>Hello world</p>"


@app.route("/products", methods = ["GET"])
def get_all_products():
    products_list = []

    #Getting all products from database
    products = Product.query.order_by(Product.id).all()
    for product in products:
       
       #Saving product data in a dictionary
       product_data ={
          "id" : product.id,
          "name" : product.name,
          "category_id" : product.category_id,
          "description" : product.description,
          "price" : product.price,
       }
       products_list.append(product_data)
    return products_list


@app.route("/products/<id>", methods = ["GET", "PUT", "DELETE"])
def get_product(id):
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
def add_new_product():
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
    new_product = Product(
      name = _name,
      category_id = _category_id,
      description = _description,
      price = _price,
      )
    #Id autoincrement(catching empty table exception)
    try:
      new_product.id = get_all_products()[-1]["id"] + 1
    except IndexError:
       new_product.id = 1
    
    #Adding row to table and saving changes
    db.session.add(new_product)
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

@app.route("/clients", methods = ["GET"])
def get_all_clients():
    clients_list = []

    #Getting all clients from database
    clients = Client.query.order_by(Client.id).all()
    for client in clients:
       
       #Saving client data in a dictionary
       client_data ={
          "id" : client.id,
          "name" : client.name,
          "surname" : client.surname,
          "email" : client.email,
          "payment_method" : str(client.payment_method).replace("PaymentMethod.", ""),
          "phone_number" : client.phone_number
       }
       clients_list.append(client_data)
    return clients_list


@app.route("/clients", methods = ["POST"])
def add_new_client():
    #Unpacking client data
    _name = request.json.get("name")
    _surname = request.json.get("surname")
    _email = request.json.get("email")
    _phone_number = request.json.get("phone_number")
    _payment_method = request.json.get("payment_method")

    #Verifying if already exists in database
    coincidence = Client.query.where(Client.email == _email).first()
    if coincidence:
      return jsonify("Error, client already exists"), 400
    
    #Creating client model
    new_client = Client(
      name = _name,
      surname = _surname,
      email = _email,
      phone_number = _phone_number,
      payment_method = _payment_method
      )
    
    #Id autoincrement(catching empty table exception)
    try:
      new_client.id = get_all_clients()[-1]["id"] + 1
    except IndexError:
       new_client.id = 1
    
    #Adding row to table and saving changes
    db.session.add(new_client)
    try:
      db.session.commit()
    except Exception as error:
       return jsonify(f"Error: {error}"), 500

    #Result is OK
    return jsonify("Client saved correctly"), 200

@app.route("/purchase_orders", methods = ["POST"])
def add_new_purchase_order():
    #Unpacking order data
    _client_id = request.json.get("client_id")
    _product_id = request.json.get("product_id")
    _product_qty = request.json.get("product_qty")
    _order_number = request.json.get("order_number")

    #Verifying if product already exists in order from database
    coincidence = PurchaseOrder.query.where(PurchaseOrder.order_number == _order_number, PurchaseOrder.product_id == _product_id).first()
    if coincidence:
      return jsonify("Error, product already exists in order"), 400
    
    #Creating order model
    new_purchase_order = PurchaseOrder(
      client_id = _client_id,
      product_id = _product_id,
      product_qty = _product_qty,
      order_number = _order_number,
      )
    #Id autoincrement(catching empty table exception)
    try:
      new_purchase_order.id = db.session.query(func.max(PurchaseOrder.id)).scalar() + 1
    except TypeError:
       new_purchase_order.id = 1
    
    #Adding row to table and saving changes
    db.session.add(new_purchase_order)
    try:
      db.session.commit()
    except Exception as error:
       return jsonify(f"Error: {error}"), 500

    #Result is OK
    return jsonify("Order saved correctly"), 200


@app.route("/purchase_orders/<order_number>", methods = ["GET"])
def get_purchase_order(order_number):
  purchase_order_entries = PurchaseOrder.query.where(PurchaseOrder.order_number == order_number).all()
  if not purchase_order_entries:
    return jsonify("Error, order not found!"), 404
  purchase_order_data = []
  client_id = None
  for entry in purchase_order_entries:
    if client_id == None:
      client_id = entry.client_id
    item = {
      "product_id" : entry.product_id,
      "product_qty" : entry.product_qty
    }
    purchase_order_data.append(item)
  
  response = {
     "order_number" : order_number,
     "client_id" : client_id,
     "products" : purchase_order_data
  }

  return response

if __name__ == "__main__":
    db.init_app(app)
    with app.app_context():
      db.create_all()
    app.run(port=5000)

