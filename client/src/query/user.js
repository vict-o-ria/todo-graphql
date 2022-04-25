import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
    query {
        getTodos {
            id, username
        }
    }

`

export const GET_TODOS = gql`
    query {
        getTodos {
            id, username, text
        }
    }

`
