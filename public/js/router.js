App.Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'talent': 'talent',
		'employers': 'employer',
		'register': 'register'
	},
	
	home: function() {
		var homeView = new App.Views.home({el: '#content'});
		homeView.render();
	},
	
	talent: function() {
		var talentView = new App.Views.talent({el: '#content'});
		talentView.render();
	},
	
	employer: function() {
		var employerView = new App.Views.employer({el: '#content'});
		employerView.render();
	},
	
	register: function() {
		var registerView = new App.Views.register({el: '#content'});
		registerView.render();
	}
	
});
