//this file contains our REST for the quizzes database

const express = require("express")
const router = express.Router()
//calls our quiz model, the models/index.js file created by sequelize automatically exports my models
const { Quiz } = require('../models')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))

//returns all quizzes
router.get('/', async (req, res) => {
    const quiz = await Quiz.findAll()
    res.json(quiz)
})

//adds a quiz
router.post('/', async (req, res) => {
    const { name } = req.body
    const quiz = await Quiz.create({ name })
    res.json(quiz)
})

router.get('/:id', async (req, res) => {
    //finds all quizzes where the id matches our id query
    const quiz = await Quiz.findByPk(req.params.id)
    res.json(quiz)
})

//updates a quiz
router.post('/:id', async (req, res) => {
    const { name } = req.body
    const { id } = req.params
    const quiz = await Quiz.update({ name }, {
        where: { id }
    })
    res.json(await Quiz.findByPk(req.params.id))
})

//deletes a quiz
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await Quiz.destroy({
        where: { id }
    })
    const quiz = await Quiz.findAll()
    res.json(quiz)
    res.redirect('/quizzes')
})

module.exports = router