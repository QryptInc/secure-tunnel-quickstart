const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;
const upstream = process.env.UPSTREAM;

app.use(bodyParser.json());

app.post('/', (req, res) => {

    // Log request content as is
    console.log(req.body)
 
    // Forward the request if upstream is defined
    if(upstream){
        axios.post(`http://${upstream}`, req.body, {headers: {'Content-Type': 'application/json'}})
            .then(response => console.log(`Received ${response.data} from ${upstream}`))
            .catch(err => console.error(err))
    }

    // IMPORTANT: 
    res.status(200).send();
})

app.listen(port, () => {
    console.log(`Application is listening on container port ${port}`)
})