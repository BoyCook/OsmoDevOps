
function DevOps() {
	this.accounts = ['tiddlyweb', 'TiddlySpace'];
	this.repos = {};
	this.urls = {
		github: 'https://api.github.com',
		travis: 'https://api.travis-ci.org'
	}
	// $.getJSON('https://api.travis-ci.org/repos?owner_name=BoyCook')
	// $.getJSON('https://api.github.com/users/BoyCook/repos?per_page=100')	
}

DevOps.prototype.loadRepos = function() {
	for (var i=0,len=this.accounts.length; i<len; i++) {
		this.getRepos(this.accounts[i]);
	}
}

DevOps.prototype.getRepos = function(name) {
	var context = this;
	var url = this.urls.github + '/users/' + name +  '/repos?per_page=100';
	var callBack = function(data) {
		context.repos[name] = data;
	};
	$.getJSON(url, callBack);
};

var app = new DevOps();

if (!(typeof exports === "undefined")) {
    exports.DevOps = DevOps;
}
