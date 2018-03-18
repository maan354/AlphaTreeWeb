const mongoose = require('mongoose');
var Schema =   mongoose.Schema();
var mongooseUniqueValidator = require('mongoose-unique-validator');
var schema = new Schema(
    {
        id : { type: String ,require:true },
        nom: { type: String ,require:true },
        prenom: { type: String ,require:true },
        password: { type: String ,require:true },
        age: { type: Number, min: 18, index: true ,require:true },
        sexe: { type: String},require:true ,
        adMail: { type: String, default: 'hahaha' ,require:true , unique :true},
        adresse: { type: String, default: 'hahaha' ,require:true },
        codePostal: { type: Number, default: 'hahaha',require:true  },
        dateNaiss: { type: Date,require:true },
        lieuNaiss: { type: String,require:true },
        buff: Buffer,
        roles : [{type :Schema.Types.ObjectId ,ref :'Roles'}]

      }
);
schema.plugin(mongooseUniqueValidator);



module.exports = mongoose.model('User', schema);


