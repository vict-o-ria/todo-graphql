import { buildSchema } from "graphql";

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
        getTodos: [Todo!]!
    }

    type Mutation {
        createTodo(input: TodoInput): Todo
    }

`);

export default schema;
