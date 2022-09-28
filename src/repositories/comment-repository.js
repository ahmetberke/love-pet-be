import Comment from '../models/comment.js';

const commentRepo = {
  findComment: async (commentId) => {
    return await Comment.findByPk(commentId);
  },

  findComments: async () => {
    return await Comment.findAll();
  },

  createComment: async (comment) => {
    return await Comment.create(comment);
  },

  deleteComment: async (commentId) => {
    return await Comment.destroy({
      where: {
        id: commentId,
      },
    });
  },

  updateComment: async (commentId, comment) => {
    return await Comment.update(comment, {
      where: {
        id: commentId,
      },
      returning: true,
    });
  },
};

export default commentRepo;
