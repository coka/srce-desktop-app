const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbName = '/srce.db';
const pathToDatabase = path.join(__dirname, dbName);
const DBHelper = require('./dbHelper');
const Sequelize = require('sequelize');

const VolunteerModel = require('./models/volunteer');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: pathToDatabase
  });

function testConnection(){
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    if (!fs.existsSync(pathToDatabase)){
      console.log('Connection will be created.');
      DBHelper.checkIfDatabaseExists();
    } else {
      console.error('Unable to connect to the database:', err);
    }
  });
}

exports.checkIfDatabaseExists = () => {
  fs.access(pathToDatabase, fs.F_OK, e => {
      if (e) {
          createDatabase();
      } else {
          console.log('Already created db srce.')
          testConnection();
      }
  });
}

function createDatabase () {
  // eslint-disable-next-line no-unused-vars
      const db = new sqlite3.Database(pathToDatabase, e => {
      if (e) {
          console.error(e.message);
      } else {
          console.log('Created new db!');
      }
  });
};

const volunteer = VolunteerModel(sequelize, Sequelize);

volunteer.findOne({where: {id: 55}}).then(vol =>{
  if (vol == null){
    volunteer.create({id : 55, first_name: "Marko", last_name: "Marin", created_at: new Date()});
  } else {
    console.log(vol.first_name);
  }
});

sequelize.sync();