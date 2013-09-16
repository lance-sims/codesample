/**
 * Created with JetBrains WebStorm.
 * User: lance
 * Date: 9/15/13
 * Time: 7:16 AM
 */
'use strict';
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var LocationSchema = new Schema({
    loc: Schema.Types.Mixed,
    userId: Schema.Types.ObjectId
}, {collection:'location'});

mongoose.model('Location', LocationSchema);
