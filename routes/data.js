
const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('../db/data.db');
const veryfyToken = require('../middleware/verifytoken');


router.get('/data', async(req, res) => {
    try{
        let {page = 1, limit = 20} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const skip = (page - 1) * limit
        const datas = await Data.find().sort({newDate: -1}).collation({locale: "en", strength: 2}).skip(skip).limit(limit);
        const total = await Data.countDocuments()
        res.json({
            status:201,
            totalPage:Math.ceil(total / limit),
            total:total,
            message: "Data fetched successfully",
            data:datas
        });
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

router.get('/mydata', veryfyToken, async (req, res)=>{
    console.log(req.user.userId)
    try{
        let {page = 1, limit = 20} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const skip = (page - 1) * limit
        const mydata = await Data.find({User_id:req.user.userId}).sort({newDate: -1}).collation({locale: "en", strength: 2}).skip(skip).limit(limit)
        const total = await Data.countDocuments({ User_id: req.user.userId })
        res.json({
            status:201,
            message:"find my data success",
            totalPage:Math.ceil(total / limit),
            total:total,
            data:mydata
        })
    }catch(e){
        res.status(404).json({message:e})
        console.log(e)
    }

})

router.post('/data', async(req, res) => {
    try{
        const {Seed_RepDate,Seed_Year,Seeds_YearWeek,Seed_Varity,Seed_RDCSD,Seed_Stock2Sale,Seed_Season,Seed_Crop_Year,User_id} = req.body;
        if(!(Seed_RepDate && Seed_Year && Seeds_YearWeek && Seed_Varity && Seed_RDCSD && Seed_Stock2Sale && Seed_Season && Seed_Crop_Year && User_id)){
            res.status(400).send('All input is required');
        }
        const data = await Data.create({
            Seed_RepDate: Seed_RepDate,
            Seed_Year: Seed_Year,
            Seeds_YearWeek: Seeds_YearWeek,
            Seed_Varity: Seed_Varity,
            Seed_RDCSD: Seed_RDCSD,
            Seed_Stock2Sale: Seed_Stock2Sale,
            Seed_Season: Seed_Season,
            Seed_Crop_Year: Seed_Crop_Year,
            User_id: User_id
        });
        res.status(201).json({
            status:201,
            message:"insert success",
            data:data
        });
    }catch(err){
        res.status(404).json({message: err.message});
    }
});

router.put('/data/:id',async(req, res) => {
    console.log("id:",req.params.id)
    console.log("token:",req.user)
    try{
        const {Seed_RepDate,Seed_Year,Seeds_YearWeek,Seed_Varity,Seed_RDCSD,Seed_Stock2Sale,Seed_Season,Seed_Crop_Year,User_id} = req.body;
        if(!(Seed_RepDate && Seed_Year && Seeds_YearWeek && Seed_Varity && Seed_RDCSD && Seed_Stock2Sale && Seed_Season && Seed_Crop_Year && User_id)){
            res.status(400).send('All input is required');
        }
        const findData = await Data.findById(req.params.id);
        if(!findData){
            res.status(402).send('Data not found');
        }
        const data = await Data.findByIdAndUpdate(req.params.id,{
            Seed_RepDate: Seed_RepDate,
            Seed_Year: Seed_Year,
            Seeds_YearWeek: Seeds_YearWeek,
            Seed_Varity: Seed_Varity,
            Seed_RDCSD: Seed_RDCSD,
            Seed_Stock2Sale: Seed_Stock2Sale,
            Seed_Season: Seed_Season,
            Seed_Crop_Year: Seed_Crop_Year,
            User_id: User_id
        });
        res.status(201).json({
            status:201,
            message:"update data is success",
            data:data
        });
    }catch(err){
        res.status(404).json({message: err.message});
    }
});

router.delete('/data/:id',async(req, res) => {
    console.log("s:",req.params.id)
    try{
        const data = await Data.findByIdAndDelete(req.params.id);
        if(data){
            res.status(200).json({
                status:201,
                message:"delete success",
                data:data
            });
        }else{
            res.status(402).json({message:" delete false"})
        }
    }catch(err){
        res.status(404).json({message: err.message});
    }
})


module.exports = router;