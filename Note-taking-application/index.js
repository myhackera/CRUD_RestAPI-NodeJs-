const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.json({
        "message": "Welcome"
    });
});

require('./routes/todo.routes.js')(app);

app.listen(3000, ()=>{
    console.log(`App is listening on port 3000`);
})