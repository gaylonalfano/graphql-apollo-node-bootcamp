import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(obj, args, { db }, info) {
    // Check whether email is unique
    const emailTaken = db.users.some(user => user.email === args.data.email);
    if (emailTaken) {
      throw new Error('Email taken.');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    // Save/add the new user to users array
    db.users.push(user);

    // Return the user object so the client can get its values
    return user;
  },
  deleteUser(obj, args, { db }, info) {
    // Find the user's index
    const userIndex = db.users.findIndex(user => user.id === args.id);

    // Check if we didn't find a match
    if (userIndex === -1) {
      throw new Error('User not found.');
    }

    // Delete the user and store deletedUsers so we can return it
    const deletedUsers = db.users.splice(userIndex, 1);

    // Filter out the posts that belong to this user and re-save to posts
    db.posts = db.posts.filter(post => {
      // Check if post was created by deleted user
      const match = post.author === args.id;

      // If post is match, then delete all its comments.
      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }

      // Return only posts that are NOT the user's
      return !match;
    });

    // Remove all comments made by the deleted user from other posts
    // Gotta find comment.author
    db.comments = db.comments.filter(comment => comment.author !== args.id);

    // Return the deleted user object per our type definition
    return deletedUsers[0];
  },
  updateUser(obj, args, { db }, info) {},

  createPost(obj, args, { db }, info) {
    // Check if existing user
    const userExists = db.users.some(user => user.id === args.data.author);

    // Throw error if not a user (later could redirect to createUser maybe)
    if (!userExists) {
      throw new Error('Not an existing user.');
    }

    // Create a post object with the details
    const post = {
      id: uuidv4(),
      ...args.data
    };

    // Add/save post object to posts data array
    db.posts.push(post);

    // Return Post object per definition
    return post;
  },
  deletePost(obj, args, { db }, info) {
    // Store the post's index
    const postIndex = db.posts.findIndex(post => post.id === args.id);

    // Check if post doesn't exist and throw error
    if (postIndex === -1) {
      throw new Error('Post not found.');
    }

    // Remove and return the deleted post
    const deletedPosts = db.posts.splice(postIndex, 1);

    // Update posts array
    db.posts = db.posts.filter(post => post.id !== args.id);

    // Remove comments that were on the deleted post
    db.comments = db.comments.filter(comment => comment.post !== args.id);

    // return the deleted Post object
    return deletedPosts[0];
  },
  createComment(obj, args, { db }, info) {
    // Confirm user exists and post exists, else throw error.
    const userExists = db.users.some(user => user.id === args.data.author);
    const postExists = db.posts.some(
      post => post.id === args.data.post && post.published
    );

    if (!userExists || !postExists) {
      throw new Error(
        `Error. Does user exist? ${userExists} Does post exist? ${postExists}`
      );
    }
    // If they do exist, create the comment and return it
    const comment = {
      id: uuidv4(),
      ...args.data
    };

    // Save/add comment to comments array
    db.comments.push(comment);

    // Return comment
    return comment;
  },
  deleteComment(obj, args, { db }, info) {
    // Find the index of the comment so can return later
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    );

    // Check if comment exists, else throw error
    if (commentIndex === -1) {
      throw new Error('Comment not found.');
    }

    // Comment found. Time to delete and store deleted comment
    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  }
};

export { Mutation as default };
