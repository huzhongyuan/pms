
define(['lib/jquery', 'util/funcTpl'], function($,funcTpl) {
     
    var loadingData = {
        init:function(){
            //加载所有blog
            loadingData._load();    
        },
        _load(){
            var i=0;
            var all=3;
            var load=function(){
                var ajaxRead=function(){
                    $.ajax({
                        dataType:"json",
                        url:"http://rapapi.org/mockjsdata/26117/pms/blog/selectAll.do",
                        type:"GET",
                        success:function(json){
                            if (json.title!==undefined) {
                                for(i;i<all;i++){
                                    var card=document.createElement('div');
                                        card.className='card';
                                        card.innerHTML=
                                            '<div class="card-body card-content">'+
                                            '<h4 class="card-title text-center"><a class="title"></a></h4>'+
                                            '<p class="card-text text-left"></p>'+
                                            '<p class="information text-left">Posted by <a class="author"></a> <span class="time">On Tuly 26,2017 </span></p>'+
                                            '<hr>'+
                                            '</div>',
                                            $(".content")[0].before(card);
                                            $(".title").eq(i).html(json.title);
                                            $(".card-text").eq(i).html(json.context);
                                            $(".author").eq(i).html(json.createBy); 
                                            $(".time").eq(i).html(json.createTime);
                                            $(".title")[i].index=i; 
                                            $(".title")[i].onclick=function(){
                                                localStorage.setItem("id",json.id);
                                                localStorage.setItem("userName",json.createBy);
                                                console.log(json.id);
                                                window.location.href="blogpaper.html";
                                            }
                                            $(".author")[i].index=i;  
                                            $(".author")[i].onclick=function(){
                                                localStorage.setItem("userName",json.createBy);
                                                console.log(json.createBy);
                                                window.location.href="blogpersonal.html";
                                            }   
                                }
                                i++;                            
                            }
                                else{i++};
                        },
                        error:function(json){
                            console.log("error");
                        }
                    }) 
                } 
                ajaxRead();
            }  
        load(); 
        //下拉加载blog
            // $(window).bind('scroll',function(){show()});
            // function show(){
            //     if($(window).scrollTop()+$(window).height()>=$(document).height()){
            //         all+=3;
            //         load();
            //     }
            // }               
        },
    }
    return loadingData.init;
});


