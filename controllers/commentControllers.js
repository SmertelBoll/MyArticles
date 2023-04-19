import CommentSchema from "../models/comment.js";
import PostSchema from "../models/post.js";

export const getAllCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await CommentSchema.find({ post: postId }).populate("user").exec();

    res.send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося получити коментарі",
    });
  }
};

export const getAllCommentsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const postsByUser = await PostSchema.find({ user: userId }).exec();

    const postsId = postsByUser.map((obj) => obj._id);

    const comments = await CommentSchema.find({ post: { $in: postsId } })
      .populate("user")
      .exec();

    res.send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося получити коментарі",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const doc = new CommentSchema({
      text: req.body.text,
      post: req.body.postId,
      user: req.userId,
    });

    const comment = await doc.save();

    await PostSchema.findOneAndUpdate(
      // filter
      {
        _id: req.body.postId, //по чому шукаємо
      },
      // update
      {
        $inc: { commentsCount: 1 }, // зменшити на 1
      }
    );

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося написати коментар",
    });
  }
};

export const removeComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await CommentSchema.findOneAndDelete({
      _id: commentId,
    });

    if (!comment) {
      return res.json({
        message: "каментар не знайдений",
      });
    }

    await PostSchema.findOneAndUpdate(
      // filter
      {
        _id: comment.post, //по чому шукаємо
      },
      // update
      {
        $inc: { commentsCount: -1 }, // зменшити на 1
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося удалити коментарій",
    });
  }
};
