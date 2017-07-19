var app = angular.module('myApp', [ 'ngRoute', 'ngCookies' ]); // why ngCookies

app.config(function($routeProvider) {
	
	$routeProvider
	         
         
	.when('/', {
		templateUrl : 'index.html'  //Home/Home.html
	})

	.when('/home', {
		templateUrl : 'user/User.html' //Home/Home.html

	})

	
	.when('/login', {
		templateUrl : 'user/signin.html', //User/Login.html
			controller : 'UserController',
			controllerAs : 'uc'

	})
	.when('/viewblog', {
		templateUrl : 'blog/viewblog.html',
		controller : 'BlogController',
		controllerAs : 'bc'

	})
.when('/viewjob', {
		templateUrl : 'job/viewjob.html',
		controller : 'JobController',
		controllerAs : 'jc'

	})
	.when('/admin', {
		templateUrl : 'admin/Admin.html'

	})
	.when('/user', {
		templateUrl : 'User.html'

	})

	.when('/adminBlogd', {
		templateUrl : 'admin/BlogDetails.html',
		controller : 'BlogController',
		controllerAs : 'bcc'
	})

	.when('/register', {
		templateUrl : 'user/signup.html',
		controller : 'UserController',
		controllerAs : 'uc'
		
	})

	.when('/blog', {
		templateUrl : 'blog/blogform.html',
			controller : 'BlogController',
			controllerAs : 'bc'

	})
	
	.when('/BlogD', {
		templateUrl : 'blog/SingleBlog.html',
			controller : 'BlogController',
			controllerAs : 'bc'

	})


	

	.when('/job', {
		templateUrl : 'job/jobform.html',
		controller : 'JobController',
		controllerAs : 'jc'

	})

	.otherwise({
		redirectTo : '/'
	});
});