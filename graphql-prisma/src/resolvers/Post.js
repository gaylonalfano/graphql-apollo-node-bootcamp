const Post = {
  author(obj, args, { db }, info) {
    return db.users.find(user => user.id === obj.author);
  },
  comments(obj, args, { db }, info) {
    // Matching comments to corresponding posts
    return db.comments.filter(comment => comment.post === obj.id);
  }
};

export { Post as default };
