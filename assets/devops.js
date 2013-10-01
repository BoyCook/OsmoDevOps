
function DevOps() {
	this.accounts = ['tiddlyweb', 'TiddlySpace', 'TiddlyWiki'];
	this.repos = {};
	this.urls = {
		github: 'https://api.github.com',
		travis: 'https://api.travis-ci.org'
	}
	this.templates = {};
	this.loadTemplates();
	// $.getJSON('https://api.travis-ci.org/repos?owner_name=BoyCook')
	// $.getJSON('https://api.github.com/users/BoyCook/repos?per_page=100')	
}

DevOps.prototype.loadRepos = function() {
	for (var i=0,len=this.accounts.length; i<len; i++) {
		this.getRepos(this.accounts[i]);
	}
};

DevOps.prototype.getRepos = function(name) {
	var context = this;
	var url = this.urls.github + '/users/' + name +  '/repos?per_page=100';
	var callBack = function(data) {
		context.repos[name] = data;
		$('.content').append(context.templates.list({ name: name, repos: data}));
	};
	$.getJSON(url, callBack);
};

DevOps.prototype.loadTemplates = function() {
	this.templates = {
		list: Handlebars.compile($("#project-list-template").html())
	};	
};

var app = undefined;

$(document).ready(function(){
	app = new DevOps();
	app.loadRepos();
});

if (!(typeof exports === "undefined")) {
    exports.DevOps = DevOps;
}
