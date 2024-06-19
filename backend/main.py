from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Product, Category


app = Flask(__name__)
CORS(app)
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

def hardcore_db_data():
    category_list = [
        {'id':1, 'name':'Perifericos'},
        {'id':2, 'name':'Tarjetas Graficas'},
        {'id':3, 'name':'Procesadores'}
    ]

    product_list = [
        {'id':1, 'name':'Teclado Redragon Kumara K552', 'category_id':1, 'description':'La gran calidad del Redragon Kumara K552, y su precio económico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla.', 'price':80000},
        {'id':2, 'name':'Teclado HyperX Alloy Origins', 'category_id':1, 'description':'Teclado HyperX de alto rendimiento diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo.', 'price':132100},
        {'id':3, 'name':'Auriculares Patriot Viper', 'category_id':1, 'description':'Con los Patriot V330 no te pierdes ningún detalle y escuchas el audio tal y como fue diseñado por los creadores.', 'price':43147},
        {'id':4, 'name':'Intel Core i5 10400F', 'category_id':3, 'description':'Con sus 6 núcleos y 12 hilos de CPU, este procesador te permitirá disfrutar de tus juegos favoritos sin interrupciones ni demoras.', 'price':142000},
        {'id':5, 'name':'GeForce GTX 1650', 'category_id':2, 'description':'GDDR6, 4GB VRAM, PCI-Express 3.0', 'price':208250},
        {'id':6, 'name':'Mouse Logitech G305', 'category_id':1, 'description':'200-12000 DPI, 1000hz (1ms) de respuesta, con 99g de peso.', 'price':49040},
        {'id':7, 'name':'GeForce RTX 4090', 'category_id':2, 'description':'GDDR6X, 24GB VRAM, PCI-Express 4.0', 'price':2544700},
        {'id':8, 'name':'XFX Radeon RX 7600 XT', 'category_id':2, 'description':'GDDR6, 8GB VRAM, PCI-Express 4.0', 'price':480110},
        {'id':9, 'name':'Mouse Razer Viper Mini', 'category_id':1, 'description':'Este mouse superligero te ofrecerá la posibilidad de marcar la diferencia y sacar ventajas en tus partidas.', 'price':117830},
        {'id':10, 'name':'AMD Ryzen 5 4600G', 'category_id':3, 'description':'', 'price':150000},
        {'id':11, 'name':'Auriculares Redragon Zeus X H510', 'category_id':1, 'description':'Diseño over-ear que genera una comodidad insuperable gracias a sus suaves almohadillas y sonido envolvente del mas alto nivel.', 'price':95400},
        {'id':12, 'name':'Intel Core i7 12700', 'category_id':3, 'description':'Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.', 'price':392000},
        {'id':13, 'name':'Intel Core i9 14900K', 'category_id':3, 'description':'El procesador mas poderoso en el mercado. Productividad y entretenimiento, todo disponible en tu computadora de escritorio.', 'price':918300},
        {'id':14, 'name':'Asrock Radeon RX 6600', 'category_id':2, 'description':'La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración.', 'price':302100},
        {'id':15, 'name':'Intel Pentium Gold G5400', 'category_id':3, 'description':'2 Nucleos y 2 Hilos, consumo de 54 W.', 'price':69000},
        {'id':16, 'name':'GeForce RTX 3060', 'category_id':2, 'description':'12 GB de memoria GDDR6 y una velocidad de 15000 MHz, conexión rápida y estable a la placa madre.', 'price':434600},
        {'id':17, 'name':'AMD Ryzen 3 3100', 'category_id':3, 'description':'3,59 GHz, 4 Nucleos 8 Hilos.', 'price':108000},
        {'id':18, 'name':'GeForce GTX 1050Ti', 'category_id':2, 'description':'GDDR5, 4 VRAM, PCI-Express 3.0', 'price':198050},
    ]

    # {'id':, 'name':'', 'category_id':, 'description':'', 'price':},

    with app.app_context():
       print("hola")

    return

if __name__ == "__main__":
    db.init_app(app)
    with app.app_context():
      db.create_all()
    app.run(port=5000)

