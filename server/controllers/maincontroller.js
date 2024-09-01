/**
 * GET/
 * *homepage
 */
exports.homepage = async (req, res) => {
    const locals = {
        title: "NodeJs Notes",
        description: "Free NodeJs Notes app.",
    };
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
}

/**
 * GET/
 * about page
 */
exports.about=async(req,res)=>{
    const locals={
        title:" about NodeJs Notes",
        description:"Free NodeJs Notes app.",
    }
    res.render('about',locals);
}