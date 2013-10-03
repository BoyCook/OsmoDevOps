
function DevOps() {
	this.config = {
		accounts: {
			tiddlyweb: '*', 
			TiddlySpace: '*', 
			TiddlyWiki: '*',
			BoyCook: ['SpaceUI', 'OsmoDevOps']
		}		
	};
	this.accounts = {};
	this.urls = {
		github: 'https://api.github.com',
		travis: 'https://api.travis-ci.org'
	}
	this.templates = {};
	this.loadTemplates();
	this.setupCache();
	// 'https://api.travis-ci.org/repos?owner_name=BoyCook'
	// 'https://api.github.com/users/BoyCook/repos?per_page=100'
	// 'https://api.github.com/users/BoyCook/repos?name=1,2,3' - ? will that work
}

DevOps.prototype.loadRepos = function() {
	for (var account in this.config.accounts) { 
		var repos = this.config.accounts[account];
		if (repos instanceof Array) {
			// Get each repo
			$('.content').append(this.templates.list({ name: account, repos: []}));
			for (var i=0,len=repos.length; i<len; i++) {
				this.getRepo(account, repos[i]);
			}
		} else if (repos === '*') {
			// Get account repos
			this.getAccountRepos(account);
		} 
	}
};

DevOps.prototype.getAccountRepos = function(account) {
	var context = this;
	var url = this.urls.github + '/users/' + account +  '/repos?per_page=100';
	var callBack = function(data) {
		context.accounts[account] = data;
		$('.content').append(context.templates.list({ name: account, repos: data}));
	};
	$.getJSON(url, callBack);
};

DevOps.prototype.getRepo = function(account, name) {
	var context = this;
	var url = this.urls.github + '/repos/' + account +  '/' + name;
	var callBack = function(data) {
		context.accounts[account].push(data);
		var html = context.templates.item(data);
		$("section[data-project='" + account + "'] table tbody").append(html)
	};
	$.getJSON(url, callBack);
};

DevOps.prototype.loadTemplates = function() {
	this.templates = {
		list: Handlebars.compile($("#project-list-template").html()),
		item: Handlebars.compile($("#project-item-template").html())
	};	
};

DevOps.prototype.setupCache = function() {
	for (var key in this.config.accounts) { 
		this.accounts[key] = [];
	}
};

var app = undefined;

$(document).ready(function(){
	app = new DevOps();
	app.loadRepos();
});

if (!(typeof exports === "undefined")) {
    exports.DevOps = DevOps;
}
