const Query = {
  users(obj, args, { db }, info) {
    // If nothing provided/exists
    if (!args.query) {
      return db.users;
    }

    // return users.filter(user => {
    //   return user.name.toLowerCase().includes(args.query.toLowerCase());
    // });
    return db.users.filter(user =>
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
  posts(obj, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(
      post =>
        post.title.toLowerCase().includes(args.query) ||
        post.body.toLowerCase().includes(args.query)
    );
  },
  comments(obj, args, { db }, info) {
    return db.comments;
  }
};

export { Query as default };
