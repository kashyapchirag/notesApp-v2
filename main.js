import express from 'express'
import mongoose from 'mongoose'
import { note } from './models/notes.js'

const app = express()
const port = 3000
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try {
    const conn = await mongoose.connect("mongodb://localhost:27017/allnotes")
    console.log('mongoose connected with express successfully!');
} catch (err) {
    console.log(err);

}


app
    .get('/', async (req, res) => {
        let data = await note.find()
        res.render('index', { data })
    })

    .get('/note/:id', async (req, res) => {
        let bottom = await note.findOne({ _id: req.params.id}, {title:1, desc: 1})
        res.render('desc', { title: bottom.title, bottom })
    })

    .get('/note/edit/:id', async (req, res) => {
        let bottom = await note.findOne({ _id: req.params.id }, {title:1, desc: 1})
        res.render('edit', { title: bottom.title, bottom })
    })

    .post('/create', async (req, res) => {
        let title = req.body.title
        let desc = req.body.details
        if (title.trim() == '' || desc.trim() == '') {

            res.redirect('/')
        }
        else {
            await note.create({
                title: title,
                desc: desc
            })
            res.redirect('/')
        }
    })

    .post('/note/edit/:id', async (req, res) => {
        let newTitle = req.body.title
        let newDesc = req.body.details
        if (newTitle.trim() == '' || newDesc.trim() == '') {

            res.redirect(`/note/edit/${req.params.id}`)
        }
        else {
            await note.updateOne({
                _id:req.params.id
            }
                ,{
                title:newTitle,
                desc:newDesc
            })
            res.redirect('/')
        }
    })

    .post('/note/delete/:id', async (req, res) => {
        await note.deleteOne({_id:req.params.id})
        res.redirect('/')
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
