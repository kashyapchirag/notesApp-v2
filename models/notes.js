import express from 'express'
import mongoose, { mongo } from 'mongoose'

const notesSchema = new mongoose.Schema({
    title:String,
    desc:String
})

export const note = mongoose.model('note',notesSchema);
