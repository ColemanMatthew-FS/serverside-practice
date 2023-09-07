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
    //if there's a json header. (it returns -1 if no json header is found)
    // it sends a json response

    //all routes now return raw json if the accept json header is a part of the request
    //otherwise, it renders a page with the new quiz being passed as an object
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes)
    } else {
        //otherwise, it renders the twig template
        res.render('quiz/index', {quizzes})
    }
    
})

//loads the form to create a quiz
//this one must be relatively high up in the controller, or else "/new" gets misinterpreted as an "/:id"

//this also doesnt have an if/else like the other routes, since it's only for rendering a form
router.get('/new', async (req, res) => {
    res.render('quiz/create')
})

//adds a quiz
router.post('/', async (req, res) => {
    const { name } = req.body
    const quiz = await Quiz.create({ name })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        //calls the route to display a specific quiz, using the ID of the quiz we just created
        res.redirect('/quizzes/' + quiz.id)
    }
})

router.get('/:id', async (req, res) => {
    //finds all quizzes where the id matches our id query
    const quiz = await Quiz.findByPk(req.params.id)
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        res.render('quiz/show', {
            quiz
        })
    }
})

//loads the form to edit a quiz
//this doesnt have an if/else like the other routes, since it's only for rendering a form
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
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        //Redirects to show you the updated quiz
        res.redirect('/quizzes/' + id)
    }
})

//deletes a quiz, HTML doesnt support delete endpoints
router.get('/:id/delete', async (req, res) => {
    const { id } = req.params
    const deleted = await Quiz.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': true})
    } else {
        res.redirect('/quizzes')
    }
})

module.exports = router