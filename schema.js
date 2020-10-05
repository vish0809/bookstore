const graphql = require('graphql');
const Book = require('../model/book');
const assert = require('assert');
const { db } = require('../model/book');

const {GraphQLObjectType,GraphQLString,GraphQLID} = graphql;

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        ean:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{ean:{type:GraphQLString}},
            resolve(parent,args){
                return Book.find({ean:args.ean});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                ean:{type:GraphQLString},
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    ean:args.ean,
                });
               return book.save().then(function(){
                   console.log("Data stored succesfully")
               });
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});