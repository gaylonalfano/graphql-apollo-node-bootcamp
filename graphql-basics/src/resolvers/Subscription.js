const Subscription = {
  comment: {
    subscribe(obj, { postId }, { db, pubsub }, info) {
      // Find the post if it exists.
      const post = db.posts.find(post => post.id === postId && post.published);
      // Throw error if not found.
      if (!post) {
        throw new Error('Post not found.');
      }
      // Make the subscription happen with asyncIterator.
      // Channel name must include postId
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe(obj, args, { pubsub }, info) {
      // Simply establish the subscription w/ asyncIterator
      return pubsub.asyncIterator('post');
    }
  }
};

export { Subscription as default };
