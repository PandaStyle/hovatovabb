


if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set('fromCityId', null);
        Session.set('toCityId', null);
    });

}

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'listpage'
    });

    this.route('about');
    this.route('listpage');
    this.route('add');
});
