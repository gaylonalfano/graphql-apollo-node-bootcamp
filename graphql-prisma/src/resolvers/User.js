const User = {
  posts(obj, args, { db }, info) {
    // return posts associated with a user id
    return db.posts.filter(post => post.author === obj.id);
  },
  comments(obj, args, { db }, info) {
    // return comments associated with user id
    return db.comments.filter(comment => comment.author === obj.id);
  }
};

export { User as default };
