const { query } = require('express');
const {projects, clients} = require('../sampleData.js')
const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList
} = require ('graphql')

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
                return clients.find(client => client.id === parent.clientId)
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
                return clients; 
            }

        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID} }, 
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        },
//#endregion clients

//#region projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parents, args){
                return projects; 
            }

        },
        project: {
            type: ProjectType, 
            args: { id: {type: GraphQLID} }, 
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        }

//#endregion projects
    }
});
//#endregion RootQuery





module.exports = new GraphQLSchema({
    query: RootQuery    
})
