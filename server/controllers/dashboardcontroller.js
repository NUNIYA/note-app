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
  

  /**
 * GET/
  *view specific note
 */

  exports.dashboardViewNote=async(req,res)=>{
    const note=await Note.findById({_id:req.params.id})
    .where({user:req.user.id}).lean();

    if(note){
      res.render('dashboard/view-notes', {
        noteID: req.params.id,
        note,
        layout: '../views/layouts/dashboard'
    });
    
    }else{
      res.send("something went wrong.")
    }

  }

  /**
 * put/
  *update specific note
 */

  exports.dashboardUpdateNote=async(req,res)=>{
    try{
      await Note.findOneAndUpdate(
        {_id:req.params.id},
        {title:req.body.title,body:req.body.body}
      ).where({user:req.user.id});
      res.redirect('/dashboard');
    }catch(error){
      console.log(error);

    }
  }
 
/**
 * Delete/
  *Delete note
 */

  exports.dashboardDeleteNote=async(req,res)=>{
    try{
      await Note.deleteOne({_id:req.params.id}).where({user:req.user.id});
      res.redirect('/dashboard');
  }catch(error){
    console.log(error);
  }
}


/**
 * GET/
  *ADD notes
 */


exports.dashboardAddNote=async(req,res)=>{
  res.render('dashboard/add',{
    layout:'../views/layouts/dashboard'
  });
}

/**
 * POST/
  *ADD notes
 */
exports.dashboardAddNoteSubmit=async(req,res)=>{
try{
  req.body.user=req.user.id;
await Note.create(req.body)
res.redirect('/dashboard')
}catch(error){
  console.log(error);

}
}