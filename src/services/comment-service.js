import commentRepo from '../repositories/comment-repository.js';

const commentService = {
  findComment: async (commentId) => {
    return await commentRepo.findComment(commentId);
  },

  findComments: async () => {
    return await commentRepo.findComments();
  },

  createComment: async (comment) => {
    return await commentRepo.createComment(comment);
  },

  deleteComment: async (commentId) => {
    return await commentRepo.deleteComment(commentId);
  },

  updateComment: async (commentId, comment) => {
    return await commentRepo.updateComment(commentId, comment);
  },
};

export default commentService;
