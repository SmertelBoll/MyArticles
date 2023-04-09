import PostSchema from "../models/user.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find().populate("user").exec();

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

    const posts = await PostSchema.findOneAndUpdate(
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
    ).populate("user");
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
    const doc = new PostSchema({
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

    const post = await PostSchema.findOneAndDelete({
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

    await PostSchema.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
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
