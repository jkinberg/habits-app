Habits = new Meteor.Collection('habits');

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
  'navbar': {to: 'navbar'},
  'footer': {to: 'footer'}
  }
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    template: 'home',
  });
  
  this.route('habits', {
    path: '/habits',
    template: 'habits',
    data: {
      habits: function() {
        return Habits.find({}, {sort: {published_at: -1}} );  
      }
    }
  });
  
  this.route('habitShow', {
    path: '/habits/:_id',
    template: 'habitShow',
    data: function() {
      return Habits.findOne({_id: this.params._id});  
    }
  });
  
});

// Server

if (Meteor.isServer) {
  Meteor.publish('habits', function() {
    return Habits.find({}, {sort: {order: 1}});
  });
  
  Meteor.publish('habit', function() {
    return Habits.find({_id: id});
  });
}

// Client

if (Meteor.isClient) {
  App = {
    subs: {
      habits: Meteor.subscribe('habits')
    }
  };
  /*
  habitShowController = RouteController.extend({
    //template: 'habitShow',
    before: function () {
      var _id = this.params._id;
      
      if (App.subs.habit)
        App.subs.habit.stop();
      
      App.subs.habit = Meteor.subscribe('habit', _id);  
    },
    
    waitOn: function () {
      return App.subs.habit;
    },
    
    data: function () {
      return Habits.findOne({_id: this.params._id});
    }
    /*
    , run: function() {
      this.render();
      this.render({
        navbar: {to: 'navbar'},
        footer: {to: 'footer'}
      });
    }
    
  });
  */
}