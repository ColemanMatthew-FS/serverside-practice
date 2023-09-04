const express = require('express')
const app = express()
//imports the quizzes controller
const quizzes = require('./controllers/quizzes')

//all our view templates are in the views folder
app.set('views', __dirname + '/views')
app.set('view engine', 'twig')

app.get('/', (request, response) => {
    response.render('home')
})

//everything after the : is a parameter called productName
//going to localhost:3000/products/foo returns "Product page! Product name: foo"
app.get('/products/:productName', (request, response) => {
    response.send('Product page! Product name: '+ request.params.productName)
})

//allows users to request data from localhost:3000/quizzes
//"'/quizzes" allows us to use urls ending in "/quizzes", the "quizzes" variable we set earlier tells the app to use the controllers/quizzes router
app.use('/quizzes', quizzes)

app.listen(3000)