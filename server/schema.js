const {buildSchema} = require("graphql")

const schema = buildSchema(`

    type User {
        id: ID
        username: String
    }

    type Todo {
        id: ID,
        text: String
        username: String
    }

    input UserInput {
        id: ID
        username: String!
    }

    input TodoInput {
        id: ID
        username: String!
        text: String!
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        createUser(input: UserInput): User
        createTodo(input: TodoInput): Todo
    }

`)

module.exports = schema;
