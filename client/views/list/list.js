
Stories = new Meteor.Collection('stories');


//WebFont.load({
//    google: {
//        families: ["Montserrat:400,700","PT Sans:400,700","Varela Round:400","Varela:400"]
//    }
//});

Template.list.stories = function(){
        return Stories.find();
}