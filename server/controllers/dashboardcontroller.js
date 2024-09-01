const Note = require('../models/notes');
const mongoose = require('mongoose');

/**
 * GET/
 * *dashboard
 */
exports.dashboard = async (req, res) => {
    let perPage = 12;
    let page = req.query.page || 1;
  
    const locals = {
      title: "Dashboard",
      description: "Free NodeJS Notes App.",
    };
  
    try {
      const notes = await Note.aggregate([
        { $sort: { updatedAt: -1 } },  // Sort notes by update time, descending
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },  // Match notes to the current user
        {
          $project: {
            title: { $substr: ["$title", 0, 30] },  // Trim title to 30 characters
            body: { $substr: ["$body", 0, 100] },  // Trim body to 100 characters
          },
        },
      ])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  
      const count = await Note.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });
  
      res.render('dashboard/index', {
        UserName: req.user.firstName,  // Pass the user's first name
        locals,
        notes,
        layout: "../views/layouts/dashboard",
        current: page,
        pages: Math.ceil(count / perPage),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };
  