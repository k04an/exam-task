const express = require('express')
const mysql = require('mysql2')
const config = require('./config')
const {request} = require("express");

const app = express()

function createConnection() {
    return mysql.createConnection({
        host: config.DATABASE_HOST,
        user: config.DATABASE_USER,
        database: config.DATABASE_NAME,
        password: config.DATABASE_PASSWORD
    })
}

async function getDataFromTable(tableName, id) {
    return new Promise((resolve) => {
        let connection = createConnection()
        connection.execute(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, fields) => {
            if (err) throw new Error(err.message)
            resolve(fields)
        })
        connection.end()
    })
}

// Конечная точка - Клиенты
app.route(config.API_PREFIX + 'client')
    .get((req, res) => {
        if (req.query.id === undefined) {
            let connection = createConnection()
            connection.execute('SELECT * FROM clients', (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else if (!isNaN(Number(req.query.id)) && req.query.id != '') {
            let connection = createConnection()
            connection.execute(`SELECT * FROM clients WHERE id = ${req.query.id}`, (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else {
            res.status(400).end()
        }
    })
    .post(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.surname && req.body.name && req.body.patronymic && req.body.passport_series && req.body.passport_number && req.body.phone) {
            let connection = createConnection()
            connection.execute(`INSERT INTO clients (surname, name, patronymic, passport_series, passport_number, phone_number)
            VALUES ("${req.body.surname}", "${req.body.name}", "${req.body.patronymic}", ${req.body.passport_series}, ${req.body.passport_number}, "${req.body.phone}")`, (err, fields) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .put(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.id && req.body.surname && req.body.name && req.body.patronymic && req.body.passport_series && req.body.passport_number && req.body.phone) {
            let connection = createConnection()
            connection.execute(`UPDATE clients
                                    SET surname="${req.body.surname}", name="${req.body.name}", patronymic="${req.body.patronymic}",
                                    passport_series=${req.body.passport_series}, passport_number=${req.body.passport_number}, phone_number="${req.body.phone}"
                                    WHERE id=${req.body.id}`, (err) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        if (req.query.id === undefined || isNaN(Number(req.query.id))) {
            res.status(400).end()
        } else {
            let connection = createConnection()
            connection.execute(`DELETE FROM clients WHERE id = ${req.query.id}`)
            connection.end()
            res.end()
        }
    })

// Конечная точка - Типы транспортных средств
app.route(config.API_PREFIX + 'vehicle')
    .get((req, res) => {
        if (req.query.id === undefined) {
            let connection = createConnection()
            connection.execute('SELECT * FROM vehicle_types', (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else if (!isNaN(Number(req.query.id)) && req.query.id != '') {
            let connection = createConnection()
            connection.execute(`SELECT * FROM vehicle_types WHERE id = ${req.query.id}`, (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else {
            res.status(400).end()
        }
    })
    .post(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.name) {
            let connection = createConnection()
            connection.execute(`INSERT INTO vehicle_types (name) VALUES ("${req.body.name}")`, (err, fields) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .put(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.id && req.body.name) {
            let connection = createConnection()
            connection.execute(`UPDATE vehicle_types SET name="${req.body.name}" WHERE id=${req.body.id}`, (err) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        if (req.query.id === undefined || isNaN(Number(req.query.id))) {
            res.status(400).end()
        } else {
            let connection = createConnection()
            connection.execute(`DELETE FROM vehicle_types WHERE id = ${req.query.id}`)
            connection.end()
            res.end()
        }
    })

// Конечная точка - Виды транспортировки
app.route(config.API_PREFIX + 'transportation')
    .get((req, res) => {
        if (req.query.id === undefined) {
            let connection = createConnection()
            connection.execute('SELECT * FROM transportation_types', (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else if (!isNaN(Number(req.query.id)) && req.query.id != '') {
            let connection = createConnection()
            connection.execute(`SELECT * FROM transportation_types WHERE id = ${req.query.id}`, (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else {
            res.status(400).end()
        }
    })
    .post(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.name) {
            let connection = createConnection()
            connection.execute(`INSERT INTO transportation_types (name) VALUES ("${req.body.name}")`, (err, fields) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .put(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.id && req.body.name) {
            let connection = createConnection()
            connection.execute(`UPDATE transportation_types SET name="${req.body.name}" WHERE id=${req.body.id}`, (err) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        if (req.query.id === undefined || isNaN(Number(req.query.id))) {
            res.status(400).end()
        } else {
            let connection = createConnection()
            connection.execute(`DELETE FROM transportation_types WHERE id = ${req.query.id}`)
            connection.end()
            res.end()
        }
    })

// Конечная точка - Маршруты
app.route(config.API_PREFIX + 'route')
    .get((req, res) => {
        if (req.query.id === undefined) {
            let connection = createConnection()
            connection.execute('SELECT * FROM routes', (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else if (!isNaN(Number(req.query.id)) && req.query.id != '') {
            let connection = createConnection()
            connection.execute(`SELECT * FROM routes WHERE id = ${req.query.id}`, (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else {
            res.status(400).end()
        }
    })
    .post(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.departure && req.body.destination) {
            let connection = createConnection()
            connection.execute(`INSERT INTO routes (departure_address, destination_address) VALUES ("${req.body.departure}", "${req.body.destination}")`, (err, fields) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .put(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.id && req.body.departure && req.body.destination) {
            let connection = createConnection()
            connection.execute(`UPDATE routes SET departure_address="${req.body.departure}", destination_address="${req.body.destination}" WHERE id=${req.body.id}`, (err) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        if (req.query.id === undefined || isNaN(Number(req.query.id))) {
            res.status(400).end()
        } else {
            let connection = createConnection()
            connection.execute(`DELETE FROM routes WHERE id = ${req.query.id}`)
            connection.end()
            res.end()
        }
    })

// Конечная точка - Схемы
app.route(config.API_PREFIX + 'scheme')
    .get((req, res) => {
        if (req.query.id === undefined) {
            let connection = createConnection()
            connection.execute('SELECT schemes.id, schemes.vehicle_type, schemes.transportation_type, schemes.route, schemes.vehicle_number, vehicle_types.name AS "vehicle_type_name", transportation_types.name AS "transportation_type_name", routes.departure_address, routes.destination_address FROM schemes, vehicle_types, transportation_types, routes WHERE schemes.vehicle_type = vehicle_types.id AND schemes.transportation_type = transportation_types.id AND schemes.route = routes.id', (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields.map(field => {
                    return {
                        id: field.id, vehicle_type: {
                            id: field.vehicle_type, name: field.vehicle_type_name
                        }, transportation_type: {
                            id: field.transportation_type, name: field.transportation_type_name
                        }, route: {
                            id: field.route,
                            departure_address: field.departure_address,
                            destination_address: field.destination_address
                        },
                        vehicle_number: field.vehicle_number
                    }
                })))
            })
            connection.end()
        } else if (!isNaN(Number(req.query.id)) && req.query.id != '') {
            let connection = createConnection()
            connection.execute(`SELECT schemes.id, schemes.vehicle_type, schemes.transportation_type, schemes.route, schemes.vehicle_number, vehicle_types.name AS "vehicle_type_name", transportation_types.name AS "transportation_type_name", routes.departure_address, routes.destination_address FROM schemes, vehicle_types, transportation_types, routes WHERE schemes.vehicle_type = vehicle_types.id AND schemes.transportation_type = transportation_types.id AND schemes.route = routes.id AND schemes.id = ${req.query.id}`, (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields.map(field => {
                    return {
                        id: field.id, vehicle_type: {
                            id: field.vehicle_type, name: field.vehicle_type_name
                        }, transportation_type: {
                            id: field.transportation_type, name: field.transportation_type_name
                        }, route: {
                            id: field.route,
                            departure_address: field.departure_address,
                            destination_address: field.destination_address
                        },
                        vehicle_number: field.vehicle_number
                    }
                })))
            })
            connection.end()
        } else {
            res.status(400).end()
        }
    })
    .post(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.vehicle_type && req.body.transportation_type && req.body.route && req.body.vehicle_number) {
            let connection = createConnection()
            connection.execute(`INSERT INTO schemes (vehicle_type, transportation_type, route, vehicle_number) VALUES (${req.body.vehicle_type}, ${req.body.transportation_type}, ${req.body.route}, ${req.body.vehicle_number})`, (err, fields) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .put(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.vehicle_type && req.body.transportation_type && req.body.route && req.body.vehicle_number) {
            let connection = createConnection()
            connection.execute(`UPDATE schemes SET vehicle_type=${req.body.vehicle_type}, transportation_type=${req.body.transportation_type}, route=${req.body.route}, vehicle_number=${req.body.vehicle_number} WHERE id=${req.body.id}`, (err) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        if (req.query.id === undefined || isNaN(Number(req.query.id))) {
            res.status(400).end()
        } else {
            let connection = createConnection()
            connection.execute(`DELETE FROM schemes WHERE id = ${req.query.id}`)
            connection.end()
            res.end()
        }
    })

// Конечная точка - Заявки
app.route(config.API_PREFIX + 'request')
    .get((req, res) => {
        if (req.query.id === undefined) {
            let connection = createConnection()
            connection.execute('SELECT * FROM requests', (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else if (!isNaN(Number(req.query.id)) && req.query.id != '') {
            let connection = createConnection()
            connection.execute(`SELECT * FROM requests WHERE id = ${req.query.id}`, (err, fields) => {
                if (err) throw new Error(err.message)
                res.end(JSON.stringify(fields))
            })
            connection.end()
        } else {
            res.status(400).end()
        }
    })
    .post(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.scheme && req.body.client && req.body.execution_date && req.body.execution_time && req.body.description) {
            let connection = createConnection()
            connection.execute(`INSERT INTO requests (scheme, client, execution_date, execution_time, description) VALUES (${req.body.scheme}, ${req.body.client}, "${req.body.execution_date}", "${req.body.execution_time}", "${req.body.description}")`, (err, fields) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .put(express.urlencoded({extended: true}), (req, res) => {
        if (req.body.scheme && req.body.client && req.body.execution_date && req.body.execution_time && req.body.description) {
            let connection = createConnection()
            connection.execute(`UPDATE requests SET scheme=${req.body.scheme}, client=${req.body.client}, execution_date="${req.body.execution_date}", execution_time="${req.body.execution_time}" WHERE id=${req.body.id}`, (err) => {
                if (err) throw new Error(err.message)
            })
            connection.end()
            res.end()
        } else {
            res.status(400).end()
        }
    })
    .delete((req, res) => {
        if (req.query.id === undefined || isNaN(Number(req.query.id))) {
            res.status(400).end()
        } else {
            let connection = createConnection()
            connection.execute(`DELETE FROM requests WHERE id = ${req.query.id}`)
            connection.end()
            res.end()
        }
    })

app.listen(config.PORT)