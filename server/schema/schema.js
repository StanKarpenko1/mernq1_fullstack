const { query } = require('express');
const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require ('graphql')

//Mongoose models
const Project  = require ('../models/Project.js')
const Client = require('../models/Client.js')

//#region Client type
const ClientType = new GraphQLObjectType ({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}

    })
});
//#endregion Client Type

//#region Project type
const ProjectType = new GraphQLObjectType ({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent,args){
                return Clients.findById(parent.id)
            }
        }
    })
});
//#endregion Project type

//#region RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
//#region clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parents, args){
                return Client.find(); 
            }

        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID} }, 
            resolve(parent, args) {
                return Client.findById(args.id);
            }
        },
//#endregion clients

//#region projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parents, args){
                // return projects; 
                return  Project.find()
            }

        },
        project: {
            type: ProjectType, 
            args: { id: {type: GraphQLID} }, 
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        }

//#endregion projects
    }
});
//#endregion RootQuery

//#region Mutation
const mutation =  new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add client 
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                const client = new Client ({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save().catch(err => {
                    console.error(err);
                    throw new Error ('Error saving to DB')
                });
            }
        },
        // delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}, 
            },
            resolve(parent, args){
                return Client.findByIdAndDelete(args.id)
            }
        }
       
    }
});

//#endregion

module.exports = new GraphQLSchema({
    query: RootQuery,  
    mutation  
})
