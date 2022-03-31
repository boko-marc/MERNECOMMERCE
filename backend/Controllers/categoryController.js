const category = require('../Models/categoryModel');

// add a category 
exports.addCategory = (req, res) => {
    const cat = new category({
        ...req.body
    })
    cat.save().then(() => {
        return res.json({response: "Category add succefuly", succes:true})
    }).
   catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "collections not found",
                succes:false
            })
        }
        return res.send({
            error: "Category not add",
            succes:false
        })
})
}
// delete category
exports.deleteCategory = (req,res) => {
    category.findByIdAndRemove(req.params.id).then(category => {
        if(!category) {
            return res.json({response:'Category not found'})
        }
        return res.json({response: 'Category delete succefuly', succes:true})
    }).catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Category not found"
            })
        }
        return res.send({
            error: "Could not delete product"
        })
    })
}
// get all category
exports.getAllCategory = (req,res) => {
    category.find({}).sort({createdAt: -1}).populate("collections", "-__v")
    .exec((err,content) => {
        if(!content) 
        {
           return res.status(400).send({message: 'category not found'})
        }
        if(err) {
            return res.send({error : err.message})
        }
        res.send(content);
    })
}

// get category by id
exports.getCategoryById = (req,res) => {
    category.findOne(req.params.id).sort({createdAt: -1}).populate("collections", "-__v")
    .exec((err,content) => {
        if(!content) 
        {
           return res.status(400).send({message: 'category not found'})
        }
        if(err) {
            return res.send({error : err.message})
        }
        res.send(content);
    })
}
// update category
exports.updatecategory = (req, res) => {

            category.findOneAndUpdate(req.params.id,{
                name:req.body.name,
                $push:{collections:{$each : req.body.collections}}},{new:true}).then((category) => {
                    if(!category) {
                        return res.json({response: "Category not found"})
                    }
                 return res.json({response:"Category update succefuly", succes:true})
    }).catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "category not found",
                succes:false
            })
        }
        return res.send({
            error: "Could not update category",
            succes:false
        })
})
}