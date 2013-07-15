// Homepage View
App.Views.home = Backbone.View.extend({
	template: _.template( App.getTemplate("home") ),
	render: function() {
		this.$el.html( this.template() );
		return this;
	}
});

// Talent View
App.Views.talent = Backbone.View.extend({
	template: _.template( App.getTemplate("talent") ),
	render: function() {
		this.$el.html( this.template() );
		return this;
	}
	
});

// Employer View
App.Views.employer = Backbone.View.extend({
	template: _.template( App.getTemplate("employers") ),
	render: function() {
		this.$el.html( this.template() );
		return this;
	}
});

// Register View
App.Views.register = Backbone.View.extend({
	template: _.template( App.getTemplate("register") ),
	render: function() {
		this.$el.html( this.template() );
		return this;
	}
});