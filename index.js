const express = require('express')
const app = express()
//imports the quizzes controller
const quizzesCtrl = require('./src/controllers/quizzes')

//all our view templates are in the views folder
app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

app.get('/', async (request, response) => {
    response.render('home/home')
})

//allows users to request data from localhost:5000/quizzes
//"'/quizzes" allows us to use urls ending in "/quizzes", the "quizzes" variable we set earlier tells the app to use the controllers/quizzes router
app.use('/quizzes', quizzesCtrl)

app.listen(5000)