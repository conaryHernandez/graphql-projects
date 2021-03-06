"use strict";

require("core-js/modules/es.string.includes.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Query = {
  users(parent, args, ctx, info) {
    const {
      db
    } = ctx;

    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  posts(parent, args, ctx, info) {
    const {
      db
    } = ctx;

    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => {
      return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  comments(parent, args, ctx, info) {
    const {
      db
    } = ctx;
    return db.comments || [];
  },

  me() {
    return {
      id: '123456',
      name: 'conary',
      email: 'conary@example.com',
      age: 25
    };
  },

  post() {
    return {
      id: 'post-1',
      title: 'My first post',
      body: "I'm writing my first post",
      published: true
    };
  }

};
var _default = Query;
exports.default = _default;