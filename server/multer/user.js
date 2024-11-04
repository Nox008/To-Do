const multer=require('multer')
const storages=multer.diskStorage({
    destination:function(req,file,cb){ 
        cb(null,"upload")

    },
    filename:function(req,file,cb){
        const newname=Date.now()+"_"+Math.round(Math.random()*1E9)
        cb(null,newname+"_"+file.originalname)

    }
})

const upload=multer({storage:storages})

module.exports=upload