import { GraphQLServer } from 'graphql-yoga';

const name = 'Gaylon Alfano';
const location = 'Shanghai, China';
const bio = 'Father of three boys. From Austin, Texas but living in Shanghai.';

// Demo User data. Later this data comes from DB.
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

// Demo Post data. Later this would
const posts = [
  {
    id: '1',
    title: 'Post 1 Apples',
    body: 'Apples',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post 2 Bananas',
    body: 'Bananas are a fruit.',
    published: false,
    author: '2'
  },
  {
    id: '3',
    title: 'Post 3 Oranges',
    body: 'Oranges are a fruit.',
    published: true,
    author: '4'
  },
  {
    id: '4',
    title: 'Post 4 Strawberries',
    body: 'Strawberries are my favorite.',
    published: true,
    author: '2'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!,
    me: User!,
    post: Post!,
    posts(query: String, published: Boolean): [Post!]!
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
    published: Boolean!,
    author: User!
  }
`;

// Resolvers (functions that run)
const resolvers = {
  Query: {
    users(obj, args, context, info) {
      // If nothing provided/exists
      if (!args.query) {
        return users;
      }

      // return users.filter(user => {
      //   return user.name.toLowerCase().includes(args.query.toLowerCase());
      // });
      return users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
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
    },
    // posts: (obj, args, context, info) => {
    //   if (!args.query) {
    //     return posts;
    //   }
    //   return posts.filter(
    //     post =>
    //       post.title.toLowerCase().includes(args.query.toLowerCase()) ||
    //       post.body.toLowerCase().includes(args.query)
    //   );
    // },
    // posts(obj, args, context, info) {
    //   if (!args.query) {
    //     return posts;
    //   }
    //   return posts.filter(
    //     post =>
    //       post.title.toLowerCase().includes(args.query) ||
    //       post.body.toLowerCase().includes(args.query)
    //   );
    // },
    // Instructor's
    posts(obj, args, context, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query);
        const isBodyMatch = post.body.toLowerCase().includes(args.query);
        return isTitleMatch || isBodyMatch;
      });
    }
  },
  Post: {
    author(obj, args, context, info) {
      return users.find(user => user.id === obj.author);
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

// 1. Set up an array of three posts with dummy post data (id, title, body, published)
// 2. Set up a "posts" query and resolver that returns all the posts.
// 3. Test the query out.
// 4. Add a "query" argument that only returns posts that contain the query string in the title or body.
// 5. Run a few sample queries searching for posts with a specific title.
