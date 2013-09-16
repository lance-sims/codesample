/**
 * Created with JetBrains WebStorm.
 * User: lance
 * Date: 9/15/13
 * Time: 9:10 AM
 */
'use strict';

/**
 * load the models at boostrap time
 */
module.exports.loadModels = function() {
    //order can be important when load modules so we make a method for it
    require('../models/User');
    require('../models/Location');
}
