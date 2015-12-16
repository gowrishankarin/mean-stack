var mongoose = require('mongoose');
var productSchema = require('./user');

var User = mongoose.model('User', productSchema);

var u = new User({
    profile: { username: 'garys'}
});

modifyUserProfile(u, {
    picture: ''
});

// modifyUserData can **only** modify
// user.profile, not user.data

function modifyUserProfile(user, profile, callback) {
    user.profile = profile;
    user.save(function(error, user) {
        // handle result
    });
}
