// var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost');


var db = mongoose.createConnection('mongodb://localhost');

//db.on('open', function() {

//console.log('Connection Open');
// //this.models = {
//   db.model('Links', new Schema({
//     id: Number,
//     url: String,
//     baseUrl: String,
//     code: String,
//     title: String,
//     visits: Number
//   }, {timestamps: true}));


 
//
//}

//});

module.exports = db;


// module.exports.Link = mongoose.Model('Link', urlSchema);


// module.exports.Link = mongoose.Model('Link', urlSchema);


// module.exports.Users = mongoose.Model('User', usersSchema);


//module.exports.db = db;

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

