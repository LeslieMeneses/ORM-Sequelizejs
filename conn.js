var express    = require("express");
var http = require("http");
var mysql      = require('mysql');
var Sequelize = require('sequelize');
/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'user'
});*/

var app = express();

/* Conection to database */
var sequelize = new Sequelize('user', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

/* Model */
var Clientes = sequelize.define('clientes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: Sequelize.TEXT,
  variable: Sequelize.TEXT,
  valor: Sequelize.TEXT
});

app.get('/', function (req, res) {
  Clientes.findAll({
    attributes: ['nombre']
  }).then(function (foundObject){
    
    var respuesta = [];
    for (var i = 0; i < foundObject.length; i++){
      respuesta.push(foundObject[i].nombre);
    }
    res.send(respuesta);
  });
});

/*SELECT nombre from clientes where clienteID 
in(select clienteID from datos where variable='Mascota' and valor='Si' and clienteID 
in (select clienteID from datos where variable='Ciudad' and valor='Bogota' and clienteID 
in (select clienteID from datos where variable='Genero' and valor='F' )))*/


app.listen(1000, function () {
  console.log('Example app listening on port 1000!');
});

/* Server 
var server = http.createServer(function (peticion, respuesta){
   respuesta.end("Hola DesarrolloWeb.com");
});

server.listen(3000, function(){
   console.log("tu servidor está listo en " + this.address().port);
});*/

/*
Connecition and list
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get("/",function(req,res){
connection.query('SELECT * from clientes', function(err, rows, fields) {
connection.end();
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
});
*/
