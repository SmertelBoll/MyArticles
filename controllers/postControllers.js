import PostModel from "../models/post.js";
import UserModel from "../models/user.js";

export const getAllPosts = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const regex = new RegExp(filter, "i");

    const sortBy = req.query.sortBy;
    const sortObj = {};

    let posts = [];

    if (sortBy) {
      sortObj[sortBy] = -1;
      posts = await PostModel.find({ title: regex })
        .sort(sortObj)
        .populate({
          path: "user",
          populate: {
            path: "avatar",
          },
        })
        .exec();
    } else {
      if (filter) {
        posts = await PostModel.find({ title: regex })
          .sort({ viewsCount: -1 })
          .populate({
            path: "user",
            populate: {
              path: "avatar",
            },
          })
          .exec();
      } else {
        posts = await PostModel.find({ title: regex })
          .sort({ createdAt: -1 })
          .populate({
            path: "user",
            populate: {
              path: "avatar",
            },
          })
          .exec();
      }
    }

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося получити статті",
    });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const posts = await PostModel.findOneAndUpdate(
      // filter
      {
        _id: postId, //по чому шукаємо
      },
      // update
      {
        $inc: { viewsCount: 1 }, // збільшити на 1
      },
      // return new or not
      {
        new: true,
      }
    ).populate({
      path: "user",
      populate: {
        path: "avatar",
      },
    });
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося получити статтю",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося створити статтю",
    });
  }
};

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentUserId = req.userId;

    const currentPost = await PostModel.find({ _id: postId }).populate("user").exec();
    const currentUser = await UserModel.findById(currentUserId);

    if (currentUserId !== currentPost[0].user._id.toString() && currentUser.accessLevel !== "admin") {
      console.log("відмовлено в доступі");
      return res.status(500).json({
        message: "відмовлено в доступі",
      });
    }

    const post = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!post) {
      return res.json({
        message: "стаття не знайдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося удалити статтю",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentUserId = req.userId;

    const post = await PostModel.find({ _id: postId }).populate("user").exec();
    const currentUser = await UserModel.findById(currentUserId);

    if (currentUserId !== post[0].user._id.toString() && currentUser.accessLevel !== "admin") {
      console.log("відмовлено в доступі");
      return res.status(500).json({
        message: "відмовлено в доступі",
      });
    }

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: post[0].user._id,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося обновити статтю",
    });
  }
};
