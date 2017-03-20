import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Accounts.onCreateUser((options, user) => {
        user.test = options.test;
        return user;
    });
}