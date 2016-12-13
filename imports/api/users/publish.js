import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('users', function (){
        if(Roles.userIsInRole(this.userId, ["admin"], "default-group"))
        {
            return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
        }
        return null;
    });
}