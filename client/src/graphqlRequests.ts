import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query {
    todos {
      id
      text
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: String!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      text
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      text
      completed
    }
  }
`;