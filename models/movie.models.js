const mongoose = require("mongoose");


const movieSchema=new mongoose.Schema({
    movieTitle:String,
    director:String,
    genre:String
})

const Moviess=mongoose.model("Moviess", movieSchema)

module.exports={Moviess}