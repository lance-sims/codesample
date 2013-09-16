/**
 * Created with JetBrains WebStorm.
 * User: lance
 * Date: 9/15/13
 * Time: 7:13 AM
 */
'use strict';
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectID;

var UserSchema = new Schema({
    name: {type:String, unique: true}
}, {collection:'user'});

mongoose.model('User', UserSchema);


