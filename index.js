const express = require('express')
const app = express()
//imports the quizzes controller
const quizzes = require('./controllers/quizzes')

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

//allows users to request data from localhost:3000/quizzes
app.use('/quizzes', quizzes)

app.listen(3000)