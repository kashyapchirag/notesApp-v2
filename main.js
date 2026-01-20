import express from 'express'
import mongoose from 'mongoose'
import { note } from './models/notes.js'

const app = express()
const port = 3000
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try{
    const conn = await mongoose.connect("mongodb://localhost:27017/allnotes")
    console.log('mongoose connected with express successfully!');
}catch(err){
    console.log(err);
    
}


app.get('/', async(req, res) => {
    let data = await note.find()
    res.render('index',{data})
})
app.get('/:title', async(req, res) => {
    let bottom = await note.findOne({title:req.params.title},{desc:1,_id:0})
    res.render('desc',{title:req.params.title,bottom})
})
app.post('/create', async(req, res) => {
    let title =  req.body.title
    let desc =  req.body.details
    if(title.trim()=='' || desc.trim()==''){

        res.redirect('/')
    }
    else{
        await note.create({
            title: title,
            desc: desc
        })
        res.redirect('/')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
