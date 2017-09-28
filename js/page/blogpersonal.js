/**
 *blogpersonal
 * @author: qking
 **/
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'module/blogitem','module/personalLoadingData','util/funcTpl','util/request'], function($, blogitem,personalLoadingData,funcTpl,request) {
	
	var blogpersonal = {
		init: function() {

            /*将页面比较大的逻辑提出来，写在js/module,在此处调用*/
			blogitem();
			personalLoadingData();
			
			request.ajax(
				'GET',
				'/api/index'
				).then(function(res){
					console.log(res)
			
				},function(err){
					console.log(err)
				})			

	
			//函数调用
			
						
		},


		transfer:function(){
			
		},






	};

	blogpersonal.init();
	blogpersonal.transfer();

});


