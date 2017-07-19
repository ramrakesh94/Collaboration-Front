'use strict';

app.controller('BlogController', ['$scope','BlogService','BlogCommentService','$location','$rootScope','$cookieStore','$http',
		function($scope, BlogService,BlogCommentService, $location, $rootScope, $cookieStore,  // i have deleted blogcomment service in line 3 and 4
				$http) {
			console.log("BlogController...")
			console.log("BlogCommentControlloerrrrrrr.............")
			var self = this;
			self.blog = {blogId : '',blogtitle : '',status : '',blogDescription : '',postedOn : '',name:'',userId:''};
			// self.blog = {id:'',title : '',status: '',description:''};
			self.blogcomment = {id:'',blogId:'',userId:'',bcomments:'',username:'',mail:''};
			self.blogs = [];		// json array
			self.blogcomments= [];

			self.createBlogComment = createBlogComment;
			self.submit = submit;
		    self.update = update;
		    self.get = get;
		    self.adminGet = adminGet;
		    self.AcceptedBlogs = AcceptedBlogs;
		    self.notAcceptedBlogs = notAcceptedBlogs;
			self.accept = accept;
			self.rejectBlog = rejectBlog;
		    
			fetchAllBlogs();
			AcceptedBlogs();
			//notAcceptedBlogs();
			reset();
			
			function fetchAllBlogs() {
				BlogService.fetchAllBlogs().then(function(d) {
					self.blogs = d;
					console.log(self.blogs)
				}, function(errResponse) {
					console.error('Error while fetching Blogs');
				});
			}

			// this.fatchAllBlogs();
			function AcceptedBlogs() {
				console.log("AcceptedBlogs...")
				BlogService.AcceptedBlogs().then(function(d) {
									//alert("Thank you for creating message")
					console.log(d)
									self.blogsAccept = d;
								},
								function(errResponse) {
									console.error('Error while creating AcceptedBlogs.');
								});
			};
			function notAcceptedBlogs() {
				console.log("notAcceptedBlogs...")
				BlogService.notAcceptedBlogs().then(function(d) {
									//alert("Thank you for creating message")
					console.log(d)
									self.blogsNotAccepted = d;
									console.log(self.blogsNotAccepted)
								},
								function(errResponse) {
									console.error('Error while creating notAcceptedBlogs.');
								});
			};
			
			
			function createBlogComment(blogcomment){
				console.log("createBlogComment...")
				
					
				$scope.recentBlog =$rootScope.viewBlog;
				console.log($scope.recentBlog);
					BlogCommentService.createBlogComment(blogcomment).then(function(d) {
						self.bcomment = d;
						
					alert("Thank you for creating message")
					get($scope.recentBlog);
					reset();
					//$location.path("/viewBlog")
				}, function(errResponse) {
					console.error('Error while creating Comment.');
				});
			};
			
			
			function createBlog(blog){
				console.log("createBlog...")
				BlogService.createBlog(blog).then(function(d) {
					alert("Thank you for creating message")
					$location.path("/ViewB")
				}, function(errResponse) {
					console.error('Error while creating Blog.');
				});
			};

			function reject(id){
				console.log("reject...")
				var reason = prompt("Please enter the reason");
				BlogService.reject(id, reason).then(function(d) {
					self.blog = d;
					self.fetchAllBlogs
					$location.path("/manage_Blogs")
					alert(self.Blog.errorMessage)

				}, null);
			};
			
			function rejectBlog(viewBlogs){
		    	BlogService.deleteBlogRequest(viewBlogs.id).then(function(d) {
					self.deleteBlogRequestId = d;		    			
					console.log(self.deleteBlogRequestId);
		    			$location.path("/admin")
		    	}, function(errResponse){
		                console.error('Error while deleting BlogRequest');
		            });
		    };

			function updateBlog(currentBlog){
				console.log("updateBlog...")
				BlogService.updateBlog(currentBlog).then(self.fetchAllBlogs,
						null);
			};

			function update() {
				{
					console.log('Update the Blog details',
							$rootScope.currentBlog);
					updateBlog($rootScope.currentBlog);
				}
				reset();
			};
			function accept(viewBlogs) {
				{
					console.log('accept the Blog details')
						
					BlogService.accept(viewBlogs);
					console.log(viewBlogs)
					$location.path("/admin")
				}
				
			};

			// this.fetchAllBlogs(); //calling the method

			// better to call fetchAllBlogs -> after login ???

			function get(blog){
				BlogCommentService.fetchAllBlogComments(blog.blogId) .then(function(d) {
					self.blogComments = d;
					$rootScope.bcomment = d;
					console.log($rootScope.bcomment);
					console.log(self.blogComments);
				
				
				$scope.bv=blog;
				$scope.bcmt=d;
				console.log($scope.bv);
				console.log($scope.bcmt);
				console.log("fetchingAllBlogComments...")
				$rootScope.viewBlog=$scope.bv;
				$rootScope.bct=$scope.bcmt;
				$location.path("/BlogD");
				}, function(errResponse) {
					console.error('Error while fetching BlogComments');
				});
				
			};
			
			function adminGet(blogs){
				$scope.bvv=blogs;
				console.log($scope.bvv);
				$rootScope.viewBlogs=$scope.bvv;
				$location.path("/adminBlogd");
			}
			
			 function submit() {
				
					console.log('Saving New Blog', self.blog);
					createBlog(self.blog);
				
				reset();
			};

			function reset() {
				self.blog = {id : null,title : '',status : '',description : '',addDate : '',userId:'',username:''};
				self.blogcomment = {id:null,blogId:'',userId:'',bcomments:'',userName:'',timeStamp:'',userMail:''};
				//reset Form
			};

			} ]);
