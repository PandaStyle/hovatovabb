Stories = new Meteor.Collection('stories');

Deps.autorun(function () {
    Meteor.subscribe("s", {fromId: Session.get("fromCityId"), toId: Session.get("toCityId")});
});

Template.list.stories = function(){
    if(Session.get('fromCityId') == null && Session.get('toCityId') == null) {
        return Stories.find({});
    }

    if(Session.get('fromCityId') != null && Session.get('toCityId') == null) {
        return Stories.find({fromCityId: Session.get('fromCityId')});
    }

    if(Session.get('fromCityId') == null && Session.get('toCityId') != null) {
        return Stories.find({toCityId: Session.get('toCityId')});
    }

    if(Session.get('fromCityId') != null && Session.get('toCityId') != null) {
        return Stories.find({toCityId: Session.get('toCityId'),
            fromCityId: Session.get('fromCityId')});
    }
}


