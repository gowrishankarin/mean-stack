/* 
* @Author: Gowri Shankar
* @Date:   2016-01-26 19:37:40
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-26 19:59:20
*/

var Config = require('./config.json');

function setupAuth(User, app) {
	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.
			findOne({ _id: id }).
			exec(done);
	});

	passport.use(new FacebookStrategy(
		{
			clientID: Config.facebookClientId,
			clientSecret: Config.facebookClientSecret,
			callbackURL: 'http://localhost:3000/auth/facebook/callback',
			profileFields: ['id', 'email', 'link', 'locale']
		},
		function(accessToken, refreshToken, profile, done) {
			if(!profile.emails || !profile.emails.length) {
				return done('No emails associated with this account!');
			}

			User.findOneAndUpdate(
				{ 'data.oauth': profile.id},
				{
					$set: {
						'profile.username': profile.emails[0].value,
						'profile.picture': 'http://graph.facebook.com/' +
						profile.id.toString() + '/picture?type=large'
					}
				},
				{ 'new': true, upsert: true, runValidators: true },
				function(error, user) {
					done(error, user);
				}
			);
		}
	));

	app.use(require('express-session')({
		secret: 'this is a secret'
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/auth/facebook',
		passport.authenticate('facebook', {scope: ['email'] }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/fail' }),
		function(req, res) {
			res.send('Welcome, ' + req.user.profile.username);
		}
	);
}

module.exports = setupAuth;