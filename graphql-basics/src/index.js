import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

const name = 'Gaylon Alfano';
const location = 'Shanghai, China';
const bio = 'Father of three boys. From Austin, Texas but living in Shanghai.';

// Demo User data. Later this data comes from DB.
const users = [
  {
    id: '1',
    name: 'Gaylon',
    email: 'gaylon@gmail.com',
    age: 38,
    comments: ['101']
  },
  {
    id: '2',
    name: 'Archie',
    email: 'archie@gmail.com',
    age: 5,
    comments: ['102', '104']
  },
  {
    id: '3',
    name: 'Aaron',
    email: 'aaron@gmail.com',
    comments: ['103']
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
    author: '1',
    comments: ['101']
  },
  {
    id: '2',
    title: 'Post 2 Bananas',
    body: 'Bananas are a fruit.',
    published: false,
    author: '2'
    // leaving comments out for testing. No comments for this post.
  },
  {
    id: '3',
    title: 'Post 3 Oranges',
    body: 'Oranges are a fruit.',
    published: true,
    author: '4',
    comments: ['103']
  },
  {
    id: '4',
    title: 'Post 4 Strawberries',
    body: 'Strawberries are my favorite.',
    published: true,
    author: '2',
    comments: ['102', '104']
  }
];

// Dummy Comments data
const comments = [
  {
    id: '101',
    text: 'Today was a great day. I really liked this post!',
    author: '3',
    post: '1'
  },
  {
    id: '102',
    text: 'This place looks amazing! Thanks for sharing!',
    author: '2',
    post: '4'
  },
  {
    id: '103',
    text:
      'I hope to do the same some day when time permits. Interesting post and thanks for sharing.',
    author: '1',
    post: '3'
  },
  {
    id: '104',
    text: 'Where will you go?',
    author: '1',
    post: '4'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!,
    me: User!,
    post: Post!,
    posts(query: String, published: Boolean): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!,
    name: String!,
    email: String!,
    age: Int,
    posts: [Post!]!,
    comments: [Comment!]!
  }

  type Post {
    id: ID!,
    title: String!,
    body: String!,
    published: Boolean!,
    author: User!,
    comments: [Comment!]!
  }

  type Comment {
    id: ID!,
    text: String!,
    author: User!
    post: Post!
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
    },
    comments(obj, args, context, info) {
      return comments;
    }
  },
  Mutation: {
    createUser(obj, args, context, info) {
      // Check whether email is unique
      const emailTaken = users.some(user => user.email === args.email);
      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const user = {
        id: uuidv4(),
        ...args
      };

      // Save/add the new user to users array
      users.push(user);

      // Return the user object so the client can get its values
      return user;
    },
    createPost(obj, args, context, info) {
      // Check if existing user
      const userExists = users.some(user => user.id === args.author);

      // Throw error if not a user (later could redirect to createUser maybe)
      if (!userExists) {
        throw new Error('Not an existing user.');
      }

      // Create a post object with the details
      const post = {
        id: uuidv4(),
        ...args
      };

      // Add/save post object to posts data array
      posts.push(post);

      // Return Post object per definition
      return post;
    },
    createComment(obj, args, context, info) {
      // Confirm user exists and post exists, else throw error.
      const userExists = users.some(user => user.id === args.author);
      const postExists = posts.some(
        post => post.id === args.post && post.published
      );

      if (!userExists || !postExists) {
        throw new Error(
          `Error. Does user exist? ${userExists} Does post exist? ${postExists}`
        );
      }
      // If they do exist, create the comment and return it
      const comment = {
        id: uuidv4(),
        ...args
      };

      // Save/add comment to comments array
      comments.push(comment);

      // Return comment
      return comment;
    }
  },
  Post: {
    author(obj, args, context, info) {
      return users.find(user => user.id === obj.author);
    },
    comments(obj, args, context, info) {
      // Matching comments to corresponding posts
      return comments.filter(comment => comment.post === obj.id);
    }
  },
  User: {
    posts(obj, args, context, info) {
      // return posts associated with a user id
      return posts.filter(post => post.author === obj.id);
    },
    comments(obj, args, context, info) {
      // return comments associated with user id
      return comments.filter(comment => comment.author === obj.id);
    }
  },
  Comment: {
    author(obj, args, context, info) {
      return users.find(user => user.id === obj.author);
    },
    post(obj, args, context, info) {
      return posts.find(post => post.id === obj.post);
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
