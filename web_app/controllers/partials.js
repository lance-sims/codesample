/**
 * Created with IntelliJ IDEA.
 * User: lance_sims
 * Date: 2/23/13
 * Time: 8:30 AM
 * To change this template use File | Settings | File Templates.
 */

exports.partial = function (req, res) {
    var name;
    try {
        name = req.params.name;
        console.info('partial name is: ' + name)
        res.render('partials/' + name);
    } catch(err) {
        console.error('Exception while rendering partial: ' + err.message);
        res.send(500, 'Exception while rendering partial');
    }
};