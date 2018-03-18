const mongoose = require('mongoose');
var Schema =   mongoose.Schema();
var schema = new Schema(
    {
        name: { type: String, default: 'hahaha' },
        Type: { type: Number, default: 'hahaha'},
        user: { type :Schema.Types.ObjectId,ref :'User'}
      }
);

module.exports = mongoose.model('Roles', schema);


