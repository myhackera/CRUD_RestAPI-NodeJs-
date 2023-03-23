const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql26105',
    database: 'demo'
});

connection.connect(function (err){
    if(err) throw err
    console.log('You are connected to Mysql database');
})

// Create and save a Todo
exports.create = (req, res) =>{
    if(!req.body.description){
        return res.status(400).send({
            message: "Todo description can not be empty"
        });
    }
    var params = req.body;
    console.log(params);

    connection.query("INSERT INTO todos SET ?", params, 
        function(error, results, fields){
            if(error) throw error;
            return res.send({
                data: results,
                message: "New todos has been created successfully"
            });
        });
};

// Retrieve all results
exports.findAll = (req, res) =>{
    connection.query("SELECT * FROM todos", 
        function(error, results, fields){
            if(error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single todo with a id
exports.findOne = (req, res) =>{
    connection.query("SELECT * FROM todos WHERE ID=?",[req.params.id],
        function(error, resuslts, fields){
            if(error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Update a todo
exports.update = (req, res) =>{
    if(!req.body.description){
        return res.status(400).send({
            message: "Todo description can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.description);
    connection.query('UPDATE `todos` SET `name`=?,`description`=? where `id`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a todo
exports.delete = (req, res) =>{
    console.log(req.body);
    connection.query("DELETE FROM `todos` WHERE `ID` = ?", [req.body.id],
        function(error, results, fields){
            if(error) throw error;
            res.end("Record has been deleted");
        });
};











