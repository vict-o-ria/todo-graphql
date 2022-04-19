import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
      createUser (input: $input) {
          id,  username, age
      }
    }
`;

export const CREATE_TODO = gql`
  mutation createTodo($input: TodoInput) {
    createTodo (input: $input) {
          id,  username, text
      }
    }
`;
