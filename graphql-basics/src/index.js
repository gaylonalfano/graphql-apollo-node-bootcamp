import { GraphQLServer } from 'graphql-yoga';

const name = 'Gaylon Alfano';
const location = 'Shanghai, China';
const bio = 'Father of three boys. From Austin, Texas but living in Shanghai.';

// Type definitions (schema)
const typeDefs = `
  type Query {
    add(numbers: [Float!]!): Float!
    greeting(name: String, position: String): String!
    grades: [Int!]!
    me: User!,
    post: Post!
  }

  type User {
    id: ID!,
    name: String!,
    email: String!,
    age: Int
  }

  type Post {
    id: ID!,
    title: String!,
    body: String!,
    published: Boolean!
  }
`;

// Resolvers (functions that run)
const resolvers = {
  Query: {
    add(obj, args, context, info) {
      return args.numbers.reduce((a, b) => a + b, 0);
    },
    grades: (obj, args, context, info) => {
      return [80, 85, 82, 94, 88];
    },
    greeting(obj, args, context, info) {
      if (args.name && args.position) {
        return `Ni hao, ${args.name}! You are my favorite ${args.position}!`;
      } else {
        return 'Hello!';
      }
    },
    me: () => {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com',
        age: 28
      };
    },
    post: () => {
      return {
        id: '111',
        title: '1st Post Title',
        body: 'Post body text that I am entereing in the post resolver.',
        published: true
      };
    }
  }
};

// Create new instance of GraphQL server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

// Start server and pass a callback to run after server is running
server.start(() => {
  console.log(`Hey ${name}, the server is up and running!`);
});