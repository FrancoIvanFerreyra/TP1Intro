# Goldfish Tech

  

Bienvenidos a Goldfish Tech, la web de insumos informaticos mas goldfish del pais!

  

___

## Base de datos

  
Para poder utilizar esta demo necesitas instalar una base de datos PostgreSQL
con usuario postgres y password postgres (informacion sobre instalacion en la [web de postgres](https://www.postgresql.org/))


  
  

## Clonar el repositorio

  

Escribi en una terminal:

  

```

git clone https://github.com/FrancoIvanFerreyra/TP1Intro.git

```

  

Ubicate en la carpeta creada

  

```

cd ./tp1-intro

```

  

Listo para continuar a la instalación.

  
  

## Instalación

  



  
  En la terminal, crea un entorno virtual

```

python3 -m venv venv

```

 

Instala los requerimientos.

  

```

pip install -r requirements.txt


```

  

Listo para utilizar!

___

## Correr

  

Para correr el proyecto debemos tener dos terminales y activamos dentro de ellas el venv

  

```

source venv/bin/activate

```

  

Levanta el servidor backend en una de las terminales:

```

cd backend/

python3 main.py

```

El servidor del back ya esta corriendo en el puerto 5000.

  

Para levantar el servidor frontend en una de las terminales debejos ejecutar:

  

```

cd frontend/

python3 -m http.server

```

El servidor del front ya esta corriendo en el puerto 8000.  
