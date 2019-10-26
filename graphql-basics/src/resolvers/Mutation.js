import uuidv4 from 'uuid/v4';
import { type } from 'os';

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
  updateUser(obj, args, { db }, info) {
    // Deconstruct our args
    const { id, data } = args;
    // Find the user object
    const user = db.users.find(user => user.id === id);

    // Throw error if we don't find user
    if (!user) {
      throw new Error('User not found.');
    }
    // Check which fields (if any) are updated. Starting w/ email.
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email);
      const currentUserEmailSameAsUpdate =
        user.email === data.email ? true : false;

      if (emailTaken) {
        if (!currentUserEmailSameAsUpdate) {
          throw new Error(`Email ${data.email} already exists.`);
        }
      }
      // Email not taken. Update email field.
      user.email = data.email;
    }
    // Check name field argument
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    // Check age. Remember age is optional (can be null).
    if (typeof data.age !== 'undefined') {
      if (typeof data.age === 'number' && data.age <= 0) {
        throw new Error('Age cannot be negative.');
      }
      user.age = data.age;
      console.log(typeof data.age);
    }

    return user;
  },
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
  updatePost(obj, args, { db }, info) {
    // Deconstruct our args
    const { id, data } = args;
    // Find and store the existing/matching post
    const post = db.posts.find(post => post.id === id);

    // Throw error if post id not found
    if (!post) {
      throw new Error('Post not found.');
    }
    // Post found. Time to update fields.
    // Must have a title (can't be empty string)
    if (data.title) {
      post.title = data.title;
    }
    // Body can be string or empty string
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    // Published either true or false.
    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }
    // Return updated post object
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
  updateComment(obj, args, { db }, info) {
    // Deconstruct the args
    const { id, data } = args;
    // Find the comment
    const comment = db.comments.find(comment => comment.id === id);

    // Throw error if not found
    if (!comment) {
      throw new Error('Comment not found.');
    }

    // Check the args passed ('text') and update
    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    // Return updated comment
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
