// src/db.js
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

// Create our database object
const db = {
  users,
  posts,
  comments
};

export { db as default };
