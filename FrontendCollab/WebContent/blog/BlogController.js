'use strict';

app.controller('BlogController', ['$scope','BlogService','BlogCommentService','$location','$rootScope','$cookieStore','$http',
		function($scope, BlogService,BlogCommentService, $location, $rootScope, $cookieStore,  
				$http) {
			console.log("BlogController...")
			//console.log(self.blog);
			console.log("BlogCommentControlloerrrrrrr.............")
			var self = this; // this will refer to self to current obj
			self.blog = {blogId : '',blogtitle : '',status : '',blogDescription : '',postedOn : '',name:'',userId:'',timeStamp:''};
			// self.blog = {id:'',title : '',status: '',description:''};
			self.blogcomment = {id:'',blogId:'',userId:'',bcomments:'',username:'',mail:'',timeStamp:''};
			self.blogs = [];		// json array
			self.blogcomments= [];
			var a = 0;
			self.blog = $rootScope.blog;
			self.createBlogComment = createBlogComment;
			self.submit = submit;
		    self.update = update;
		    self.get = get;
		    self.adminGet = adminGet;
		    self.AcceptedBlogs = AcceptedBlogs;
		    self.notAcceptedBlogs = notAcceptedBlogs;
			self.accept = accept;
			self.rejectBlog = rejectBlog;
			self.editandupdateBlog=editandupdateBlog;
		    $scope.count=0;
			fetchAllBlogs();
			AcceptedBlogs();
			//notAcceptedBlogs();
	/*		reset();
		*/	
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
					$location.path("/viewblog")
				}, function(errResponse) {
					console.error('Error while creating Blog.');
				});
			};
			
			
			function editandupdateBlog(blog){
				
						console.log(blog);
						$rootScope.blog=blog; // rootscope name MUST be blog only then it can be mapped with front end
						console.log(self.blog);
						$location.path("/blog");
						
			};

			
			
			
			
			function reject(id){
				console.log("reject...")
				var reason = prompt("Please enter the reason");
				BlogService.reject(id, reason).then(function(d) {
					self.blog = d;
					self.fetchAllBlogs
					$location.path("/blog reject")
					alert(self.Blog.errorMessage)

				}, null);
			};
			
			function rejectBlog(viewBlogs){
		    	BlogService.deleteBlogRequest(viewBlogs.blogId).then(function(d) {
					self.deleteBlogRequestId = d;		    			
					console.log(self.deleteBlogRequestId);
					console.log($rootScope.currentUser);
					console.log($rootScope.currentUser.cusId);
					if($rootScope.currentUser.role=="ADMIN")
						{
		    			$location.path("/admin")
						}
					else
						{
						$location.path("/viewblog")
						}
		    	}, function(errResponse){
		                console.error('Error while deleting BlogRequest');
		            });
		    };

			function updateBlog(currentBlog){ 
				console.log("updateBlog...")
				
				BlogService.updateBlog(currentBlog).then(function(d) {
					self.updatedBlog = d;		    			
					console.log(self.updatedBlog);
					$rootScope.blog = {};
					alert("Thank you for updating message")
					$location.path("/viewblog")
		    	}, function(errResponse){
		                console.error('Error while deleting BlogRequest');
		            });
			};

			function update() {
				{
					console.log('Update the Blog details',
							$rootScope.currentBlog);
					updateBlog($rootScope.currentBlog);
				}
				/*reset();*/
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
				BlogCommentService.fetchAllBlogComments(blog.blogId) .then(function(d) { // prev we passed id to fetch all blog comments
					self.blogComments = d;                      //also note in app context u say autowired true create bean and do same in controller so bean may be created twice 
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
			
			/*function delBlog(blog)
			{
				
				
				
			}*/
			
			
			
			
			function notEmpty(elem, helperMsg) {
				if (elem.value.length == 0) {
					alert(helperMsg);
					elem.focus(); // set the focus to this input
					return false;
				}
				return true;
			}
			function isAlphabet(elem, helperMsg) {
				var alphaExp = /^[a-z A-Z]+$/;
				if (elem.value.match(alphaExp)) {
					return true;
				} else {
					alert(helperMsg);
					elem.focus();
					return false;
				}
			}
			function isAlphanumeric(elem, helperMsg) {
				var alphaExp = /^[0-9a-zA-Z]+$/;
				if (elem.value.match(alphaExp)) {
					return true;
				} else {
					alert(helperMsg);
					elem.focus();
					return false;
				}
			}

			
			
			
			
			
			 function submit() {
				 
				 
				 
				 var blogname = document.getElementById('blogtitle');
					var blogdesc = document.getElementById('blogdesc');
					if (notEmpty(blogname, " Blog Name Should not be empty")) 
					{
						
						if (isAlphabet(blogname, "Please enter only letters for Blog Name "))
							{
							if (notEmpty(blogdesc, "Description Should not be empty")) 
							{
								/*if (isAlphanumeric(blogdesc, "Please enter alpha-numeric characters for Description"))
									{*/
									 console.log(self.blog.blogId);
									 if(self.blog.blogId==undefined){
											console.log('Saving New Blog', self.blog);		
											
											createBlog(self.blog);
									 }else{
											console.log('Updating Blog', self.blog);					
											
											updateBlog(self.blog);
									/* }*/
									}
							}
							}
							}
				
				 
			
				/*reset();*/
			};

			/*function reset() {
				self.blog = {blogId : null,title : '',status : '',description : '',addDate : '',userId:'',username:''};
				self.blogcomment = {id:null,blogId:'',userId:'',bcomments:'',userName:'',timeStamp:'',userMail:''};
				//reset Form
			};*/

			} ]);
