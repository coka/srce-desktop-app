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

function testConnection() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            if (!fs.existsSync(pathToDatabase)) {
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
            console.log('Already created db srce.');
            testConnection();
        }
    });
};

function createDatabase() {
    // eslint-disable-next-line no-unused-vars
    const db = new sqlite3.Database(pathToDatabase, e => {
        if (e) {
            console.error(e.message);
        } else {
            console.log('Created new db!');
        }
    });
}

const volunteer = VolunteerModel(sequelize, Sequelize);

volunteer.findOne({ where: { volunteer_id: 55 } }).then(vol => {
    if (vol == null) {
        volunteer.create({
            volunteer_id: 55,
            first_name: 'Marko',
            last_name: 'Marin',
            created_at: new Date()
        });
    } else {
        console.log(vol.first_name);
    }
});

sequelize.sync();

exports.countVolunteers = () => {
    const count = volunteer.count().then(c => {
        return c;
    });
    return count;
};

exports.getVolunteerNames = () => {
    const rows = volunteer
        .findAll({
            attributes: ['first_name', 'last_name'],
            raw: true
        })
        .then(volunteers => {
            return volunteers;
        });
    return rows;
};

exports.getVolunteers = range => {
    const rows = volunteer
        .findAndCountAll({
            order: [['created_at', 'DESC']],
            raw: true,
            offset: range.offset,
            limit: range.limit
        })
        .then(result => {
            return { count: result.count, volunteers: result.rows };
        });
    return rows;
};

exports.deleteVolunteer = id => {
    const isDeleted = volunteer
        .destroy({
            where: { volunteer_id: id }
        })
        .then(console.log('Deleted volunteer with id: ' + id));
    return isDeleted;
};

exports.insertVolunteer = v => {
    const insertedID = volunteer.create(v).then(row => {
        return row.dataValues.volunteer_id;
    });
    return insertedID;
};
