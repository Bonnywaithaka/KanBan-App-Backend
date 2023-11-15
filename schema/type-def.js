const {gql}=require("apollo-server")


const typeDefs=gql `

type Column{
    id:ID!
    name:String!
}
type Task{
    id:ID!
    columnId:ID!
    taskName:String
}
type 
Query{
columns:[Column]
task:[Task]
}

input CreateColumnInput{
        name:String!
}
input CreateTaskInput{
    columnId:ID!
    taskName:String!
}
input UpdateColumnInput{
    name:String
}
input UpdateTaskInput{
    columnId:ID
    taskName:String
}
type Mutation {
    createColumn(input: CreateColumnInput!):Column!
    updateColumn( id:ID!,input: UpdateColumnInput):Column
    deleteColumn(id:ID!):Column

    createTask(input:CreateTaskInput!):Task!
    updateTask(id:ID,input:UpdateTaskInput):Task
    deleteTask(id:ID!):Task
}
`;

module.exports={typeDefs};