import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('users', function (){
        if(Roles.userIsInRole(this.userId, ["admin"], "default-group"))
        {
            return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
        }
        return null;
    });

    Meteor.publish('Meteor.users.test', function ()  {
        // Validate the arguments to be what we expect


        // Select only the users that match the array of IDs passed in
        const selector = {
            _id: this.userId
        };

        // Only return one field, `initials`
        const options = {
            fields: { personal: 1 }
        };

        return Meteor.users.find(selector, options);
    });
}