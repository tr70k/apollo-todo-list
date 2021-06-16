const { ApolloServer } = require('apollo-server');
const { generate } = require('shortid');

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Todo {
    id: String!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
    todo(id: String!): Todo
  }

  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: String!, completed: Boolean!): Todo
    deleteTodo(id: String!): Todo
 }
`;

const allTodos = new Map();

// Initialize todo list
[
  {
    id: generate(),
    text: 'My first todo',
    completed: false,
  },
  {
    id: generate(),
    text: 'Completed todo',
    completed: true,
  },
].map(todo => allTodos.set(todo.id, todo));

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => {
      return allTodos.values();
    },
    todo: (_, { id }) => {
      return allTodos.get(id);
    }
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const id = generate();
      const todo = { id, text, completed: false };
      allTodos.set(id, todo)
      return todo;
    },
    updateTodo: (_, { id, completed }) => {
      const todo = { ...allTodos.get(id), completed };
      allTodos.set(id, todo);
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const todo = allTodos.get(id);
      allTodos.delete(id);
      return todo;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
