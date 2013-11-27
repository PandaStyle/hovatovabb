if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to hovatovabb.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
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
        template: 'intro'
    });

    this.route('add', {
        path: '/add',
        template: 'add'
    });

    this.route('list', {
        path: '/list',
        template: 'list'
    });

    this.route('intro', {
        path: '/intro',
        template: 'intro'
    });

});
