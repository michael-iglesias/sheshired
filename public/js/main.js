(function() {
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {},
		getTemplate: function(url) {
		    var data = "<h1> failed to load url : " + url + "</h1>";
		    url = "/" + url;
		    $.ajax({
		        async: false,
		        url: url,
		        success: function(response) {
		            data = response;
		        }
		    });
		    return data;
		} // ***END templateURL
	};
	
	window.vent = _.extend({}, Backbone.Events);
	
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	}
	
})();
