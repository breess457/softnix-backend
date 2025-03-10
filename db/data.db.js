const moongoose = require('mongoose');
const dataSchema = new moongoose.Schema({
    Seed_RepDate: {
        type: String,
        required: true
    },
    Seed_Year: {
        type: Number,
        required: true
    },
    Seeds_YearWeek: {
        type: Number,
        required: true
    },
    Seed_Varity: {
        type: String,
        required: true
    },
    Seed_RDCSD: {
        type: String,
        required: true
    },
    Seed_Stock2Sale:{
        type: String,
        required: true
    },
    Seed_Season:{
        type: String,
        required: true
    },
    Seed_Crop_Year:{
        type: String,
        required: true
    },
    User_id:{
        type: moongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    newDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = moongoose.model('Data', dataSchema);