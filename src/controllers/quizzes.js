//this file contains our REST for the quizzes database

const express = require("express")
const router = express.Router()
//calls our quiz model, the models/index.js file created by sequelize automatically exports my models
const { Quiz } = require('../models')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))

//returns all quizzes
router.get('/', async (req, res) => {
    const quizzes = await Quiz.findAll()
    res.render('quiz/index', {quizzes})
    //res.json(quizzes)
})

//loads the form to create a quiz
//this one must go at the start, or else "/new" gets misinterpreted as "/:id"
router.get('/new', async (req, res) => {
    res.render('quiz/create')
})

//adds a quiz
router.post('/', async (req, res) => {
    const { name } = req.body
    const quiz = await Quiz.create({ name })
    //calls the route to display a specific quiz, using the ID of the quiz we just created
    res.redirect('/quizzes/' + quiz.id)
})

router.get('/:id', async (req, res) => {
    //finds all quizzes where the id matches our id query
    const quiz = await Quiz.findByPk(req.params.id)
    res.render('quiz/show', {
        quiz
    })
})

//loads the form to edit a quiz
router.get('/:id/edit', async (req, res) => {
    const quiz = await Quiz.findByPk(req.params.id)
    res.render('quiz/edit', {
        quiz
    })
})

//updates a quiz
router.post('/:id', async (req, res) => {
    const { name } = req.body
    const { id } = req.params
    const quiz = await Quiz.update({ name }, {
        where: { id }
    })
    //Redirects to show you the updated quiz
    res.redirect('/quizzes/' + id)
})

//deletes a quiz, HTML doesnt support delete endpoints
router.get('/:id/delete', async (req, res) => {
    const { id } = req.params
    const deleted = await Quiz.destroy({
        where: { id }
    })
    res.redirect('/quizzes')
})

module.exports = router