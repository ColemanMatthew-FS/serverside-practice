const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('Home Page! GET...')
})

app.post('/', (request, response) => {
    response.send('Home Page! POST...')
})

//everything after the : is a parameter called productName
//going to localhost:3000/products/foo returns "Product page! Product name: foo"
app.get('/products/:productName', (request, response) => {
    response.send('Product page! Product name: '+ request.params.productName)
})

app.listen(3000)