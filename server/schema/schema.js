const { query } = require('express');
const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
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
                return Client.findById(parent.clientId)
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
        },
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType ({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},

                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: {type: GraphQLNonNull(GraphQLID)},
                
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

            return project.save();
            },
        },
        // Delete Project
       deleteProject: {
           type: ProjectType,
           args: {
               id: {type: GraphQLNonNull(GraphQLID)},
           },
           resolve(parent, args){
               return Project.findByIdAndDelete(args.id)
           }
       },
       // Update Project
       updateProject: {
        type: ProjectType,
        args: {
            id: {type: GraphQLNonNull(GraphQLID)},
            name: { type: GraphQLString },
            description: { type: GraphQLString},
            status: {
                type: new GraphQLEnumType ({
                    name: 'ProjectStatusUpdate',
                    values: {
                        new: {value: 'Not Started'},
                        progress: {value: 'In Progress'},
                        completed: {value: 'Completed'},

                    }
                }),
            },
        },
        resolve(parent, args){
            return Project.findByIdAndUpdate(
                args.id,
                {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                },

                { new: true },
                
            )
            }
        }
    },
});

//#endregion

module.exports = new GraphQLSchema({
    query: RootQuery,  
    mutation  
})
