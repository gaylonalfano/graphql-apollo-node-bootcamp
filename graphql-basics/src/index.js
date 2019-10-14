import { GraphQLServer } from 'graphql-yoga';

const name = 'Gaylon Alfano';
const location = 'Shanghai, China';
const bio = 'Father of three boys. From Austin, Texas but living in Shanghai.';

// Demo User data
const users = [
  {
    id: '1',
    name: 'Gaylon',
    email: 'gaylon@gmail.com',
    age: 38
  },
  {
    id: '2',
    name: 'Archie',
    email: 'archie@gmail.com',
    age: 5
  },
  {
    id: '3',
    name: 'Aaron',
    email: 'aaron@gmail.com'
  },
  {
    id: '4',
    name: 'Mike',
    email: 'mike@gmail.com'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
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
    users(obj, args, context, info) {
      if (args.query) {
        return args.filter(e => e.contains(args.query));
      } else {
        return users;
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
