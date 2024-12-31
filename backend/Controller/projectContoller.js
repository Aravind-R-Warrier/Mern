const projects=require('../Model/projectSchema')
const { options } = require('../Route/route')

//Add projects

exports.addProjects=async(req,res)=>{
    const{title,laguages,overview,github,website}=req.body
    const projectImage=req.file.filename
    const userId=req.payload
    // console.log(title,laguages,overview,github,website,projectImage,userId)
    // res.status(200).json('add project request received')
    try {
        const existinProject=await projects.findOne({github})
        if(existinProject){
            res.status(406).json('project already exists')
        }else{
            const newProject=new projects({
                title,laguages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
   
}

// getHomeProjects
exports.getHomeProjects=async(req,res)=>{
    console.log('inside home projects function')

    try {
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// getAllProjects

exports.getAllProjects=async(req,res)=>{
    console.log('inside getAllPorjcts function')
    const searchKey=req.query.search
    const query={
        laguages:{$regex:searchKey,$options:'i'}
    }

    try {
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// userProjects

exports.getUserProjects=async(req,res)=>{
    console.log("inside getUserProjects")
   const userId=req.payload
   try {
    const userProjects=await projects.find()
    res.status(200).json(userProjects)
} catch (error) {
      
    res.status(401).json(error)
   }
}

// EditProjects
exports.editProjects=async(req,res)=>{
    const{title,laguages,overview,github,website,projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage
    const {pid}=req.params
    const userId=req.payload
    try {
        
        const updateProject=await projects.findByIdAndUpdate({_id:pid},{title,laguages,overview,github,website,projectImage:uploadImage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete
exports.deleteProjects=async(req,res)=>{
    console.log('inside delete')
    const{pid}=req.params
    try {
        const deleteProject=await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteProject)
    } catch (error) {
        res.status(401).json(error)
    }

}