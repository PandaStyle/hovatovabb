/**
 from      string
 to        string
 age       int
 date-out  Datetime
 date-back string
 story     string
 **/

Stories = new Meteor.Collection('stories');

Stories.allow({
    insert: function(){  return true; }
    , update: function(){  return true; }
    , remove: function(){  return true; }
});

Meteor.publish("s", function (obj) {

    return Stories.find({});
});


Meteor.methods({
    submit: function(story){

        // Validation, Error handling

        var storyId = Stories.insert(story);

        story.storyId = storyId;

        return story;

    }
});