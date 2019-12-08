import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// prisma.query
//   .users(null, '{ id name email posts { id title published }}')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(err => console.log(err));

// prisma.query
//   .comments(null, '{ id text author { id name } post { id title }}')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(err => console.log(err));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ck3bba18n01390747dsymmryb'
//           }
//         }
//       }
//     },
//     '{ id title body published author { id name }}'
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     return prisma.query.users(
//       null,
//       '{ id name email posts { id title published }}'
//     );
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
// .catch(err => console.log(err));

// Challenge - updatePost and query posts
// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         body:
//           'Updated body content for my post. Using mutation.updatePost() to make it happen.',
//         published: true
//       },
//       where: {
//         id: 'ck3wac8wm000s0708l9id24ow'
//       }
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(
//       null,
//       '{ id title body published author { name }}'
//     );
//   })
//   .then(data => {
//     console.log(data);
//   });

// For fun. Create comment on existing post with new user
// prisma.mutation
//   .createComment(
//     {
//       data: {
//         text: "Hi I'm new here! Love this post!",
//         post: {
//           connect: {
//             id: 'ck3wac8wm000s0708l9id24ow'
//           }
//         },
//         author: {
//           create: {
//             name: 'Gaylon',
//             email: 'gaylon@test.com'
//           }
//         }
//       }
//     },
//     '{ id text author { name } post { id title }}'
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     return prisma.query.users(null, '{ name email createdAt }');
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
