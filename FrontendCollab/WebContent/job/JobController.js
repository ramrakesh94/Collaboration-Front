'use strict';

app.controller('JobController',['$scope','JobService','$location','ApplyJobService','$rootScope','$cookieStore','$http',
					function($scope, JobService,$location,ApplyJobService ,$rootScope,$cookieStore, $http) {
							console.log("JobController...")
							var self = this;
							self.job = {id:'',jobtitle : '',companyName: '',skills:'',email:'',qualification:'',status:''};
							//this.job =  {id:'',title : '',description: '',addDate:'',qualification:'',status:''};
							this.jobs = []; 
							self.appjob = {ajId:'',jobsid : '',jobname: '',userId:'',userName:'',dateofapply:'',timeofapply:''};
							this.appjobs=[];
							// this refers to obj and here refers to obj of type controller
							// a reference variable cannot refer to more than one obj 

							/*$scope.orderByMe = function(x) {  
								$scope.myOrderBy = x;
							}*/  


							self.submit = submit;
						    self.update = update;
						    self.get = get;
						    self.applyJobs=applyJobs;
						    self.BringAllAppJobs=BringAllAppJobs;
						    self.BringAllMyJobs=BringAllMyJobs;
							fetchAllJobs(); // why no self for the two functions
							reset();
						
							
							function fetchAllJobs() {
								console.log("fetchAllJobs...")
								JobService.fetchAllJobs().then(function(d) {
													self.jobs = d;
													console.log(self.jobs)
												},function(errResponse) {  
													console.error('Error while fetching Jobs');
												});
							};
							
							function BringAllAppJobs() {
								console.log("Applied Jobs List...")
								ApplyJobService.BringAllAppJobs().then(function(d) {
													self.appjobs = d;
													console.log(self.jobs)
												},function(errResponse) {  
													console.error('Error while fetching  applied Jobs');
												});
							};
							
							
							function BringAllMyJobs() {
								console.log("Applied Jobs List...")
								ApplyJobService.BringAllMyJobs($rootScope.currentUser.cusId).then(function(d) {
													self.appjobs = d;
													console.log(self.jobs)
												},function(errResponse) {  
													console.error('Error while fetching  applied Jobs');
												});
							};
							
							

							// this.fatchAllJobs();

							function createJob(job){
								console.log("createJob...")
								JobService.createJob(job).then(function(d) {
													alert("Thank you for creating message")
													$location.path("/index")
												},
												function(errResponse) {
													console.error('Error while creating Job.');
												});
							};
							
							function applyJobs(job) {
								console.log("AllapplyJobs...")
								
								
								self.appjob.jobsid=job.id;
								console.log(self.appjob.jobsid)
								self.appjob.jobname=job.jobtitle;
								self.appjob.userId=$rootScope.currentUser.cusId;
								self.appjob.userName=$rootScope.currentUser.name;
								
								
								ApplyJobService.applyjobs(self.appjob).then(function(d) {
													/*self.jobs = d;*/
													console.log("working")
												},function(errResponse) {  
													console.error('Error while applying Jobs');
												});
							};
							
							

							

							

							function reject(id){
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								JobService.reject(id, reason).then(function(d) {
											self.job = d;
											self.fetchAllJobs
											$location.path("/manage_Jobs")
											alert(self.Job.errorMessage)

										}, null);
							};

							function updateJob(currentJob){
								console.log("updateJob...")  
								JobService.updateJob(currentJob).then(
										self.fetchAllJobs, null);
							};

							function update() {
								{
									console.log('Update the Job details',
											$rootScope.currentJob);
									updateJob($rootScope.currentJob);
								}
					 			reset();
							};

							
							

							// this.fetchAllJobs(); //calling the method    

							// better to call fetchAllJobs -> after login ???
							function get(job){                      // it will display all jobs
								$scope.jv=job;
								console.log($scope.jv);         // how do i use this for applied jobs
								$rootScope.viewJob=$scope.jv;
								console.log('viewJob')
								$location.path("/viewjob");
								
								
							};
							
  
							 function submit() {
								{
									console.log('Saving New Job', self.job);
									createJob(self.job);
								}
								reset();  
							};

							function reset() {
								self.job = {id:null,title : '',companyName: '',technicalKnowledge:'',email:'',addDate:'',qualification:'',status:''};
								//$scope.myForm.$setPristine(); // reset Form
								self.appjob = {ajId:null,jobsid : '',jobname: '',userId:'',userName:'',dateofapply:'',timeofapply:''};
							};

						} ]);