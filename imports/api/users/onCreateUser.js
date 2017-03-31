import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    Accounts.onCreateUser((options, user) => {
        if(options.personal !== undefined && options.personal.leader === undefined){
            options.personal.leader = false;
        }
        user.personal = options.personal;
        return user;
    });
}