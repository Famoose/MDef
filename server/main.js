import { Meteor } from 'meteor/meteor';
import '../imports/api/characteristics/index';
import '../imports/api/categories/index';
import '../imports/api/questions/index';
import '../imports/api/questions-characteristcs/index';
import '../imports/api/game/index.js';
import '../imports/api/answer/index.js';
import '../imports/api/users/index.js';
// import '../imports/api/questions/index.js';
// import { Characteristics } from '../imports/api/characteristics/index.js';

Meteor.startup(() => {
    process.env.MAIL_URL = "smtp://personal.finder.app%40gmail.com:"+process.env.MAILPW+"@smtp.gmail.com";
    Accounts.config({sendVerificationEmail: true});
    var user = Accounts.findUserByUsername(process.env.DUSERNAME);
    if(!user){
        var id = Accounts.createUser({username: process.env.DUSERNAME, email: process.env.DUSEREMAIL, password: process.env.PW});
        Roles.addUsersToRoles(id, ['admin'], 'default-group');
    }
    // if(Characteristics.find().count === 0){
    //     Characteristics.insert("Zielstrebig");
    //     Characteristics.insert("Teamfähig");
    //     Characteristics.insert("Verantwortungsvoll");
    //     Characteristics.insert("Überzeugungsfähig");
    //     Characteristics.insert("Selbstständig");
    //     Characteristics.insert("Zurückhaltend");
    // }
});
