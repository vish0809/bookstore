const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema= require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb+srv://book:vXUjgWNowVNpfR4G@cluster0.wseul.mongodb.net/Vishal?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
    console.log('connected to the database');
}).on('error',function(error){
    console.log('Connection error')
});



app.use('/graphql',graphqlHTTP({
     schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Hiiiii')
});