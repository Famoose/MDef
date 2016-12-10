import { Meteor } from 'meteor/meteor';
import '../imports/api/characteristics/index';
import '../imports/api/categories/index';
import '../imports/api/questions/index';
// import '../imports/api/questions/index.js';
// import { Characteristics } from '../imports/api/characteristics/index.js';

Meteor.startup(() => {
    process.env.MAIL_URL = "smtp://personal.finder.app%40gmail.com:$Welcome16@smtp.gmail.com";

    // if(Characteristics.find().count === 0){
    //     Characteristics.insert("Zielstrebig");
    //     Characteristics.insert("Teamfähig");
    //     Characteristics.insert("Verantwortungsvoll");
    //     Characteristics.insert("Überzeugungsfähig");
    //     Characteristics.insert("Selbstständig");
    //     Characteristics.insert("Zurückhaltend");
    // }
});
