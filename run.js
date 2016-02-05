var Sequelize = require('sequelize');

/* CONNECTION */
var sequelize = new Sequelize('user', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

/* MODELO */
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

/* QUERY */
Clientes.findAll({
  	attributes: ['nombre']
	}).then(function (foundObject){

	  console.log(foundObject.length)
	  var respuesta = [];
	  for (var i = 0; i < foundObject.length; i++){
	  	console.log(foundObject[i].nombre)
	    respuesta.push(foundObject[i].nombre);
	  }

});
