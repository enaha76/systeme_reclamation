const mongoose = require('mongoose');


const claimSchema = new mongoose.Schema({
  marticule:{
    type:String,
    required: true
  }
  ,
  matiere: {
    type: Object,
    required: true
  },
  commentaire: {
    type: String,
    required: true
  }
});



module.exports = mongoose.model('Claim', claimSchema);
