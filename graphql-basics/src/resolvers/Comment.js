const Comment = {
  author(obj, args, { db }, info) {
    return db.users.find(user => user.id === obj.author);
  },
  post(obj, args, { db }, info) {
    return db.posts.find(post => post.id === obj.post);
  }
};

export { Comment as default };
