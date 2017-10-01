
define(['lib/jquery', 'util/funcTpl'], function($,funcTpl) {
     
    var personalLoadingData = {
        init:function(){
        //加载blog列表
         personalLoadingData._load();
        },

        //加载所有blog列表
        _load(){

            //判断用户的访问权限
            var userName=localStorage.getItem("userName");
            var masterName=localStorage.getItem("masterName");
            var url;
            var stat;
            $.ajax({
                dataType:"json",
                url:"http://rapapi.org/mockjsdata/26117/pms/role/selectRoleByConbinationKey.do",
                type:"post",
                data:{
                    "masterId":masterName,
                    "userId":userName
                },
                success:function(json){
                    stat=json.status;
                }
            })
            if(stat==1){meUrl="http://rapapi.org/mockjsdata/26117/pms/blog/selectOwnAll.do"}
            else{meUrl="http://rapapi.org/mockjsdata/26117/pms/blog/selectOtherAll.do"};


            //加载被访问者的blog列表
            var i=0;
            var all=3;
            var ajax=function(){
            $.ajax({
                dataType:"json",
                url:meUrl,
                type:"post",
                data:{
                    "userName":userName
                },
                success:function(json){
                    if (json.title) {
                    for(i;i<all;i+=1){
                        console.log(i);
                        var list_group=document.createElement('div');
                            list_group.className='list-group';
                            list_group.innerHTML=
                                '<a class="list-group-item list-group-item-action list-group-item-success bloglist" style="cursor:pointer;margin-bottom:5px;">1</a>';
                                $("#index").eq(0).append(list_group);  
                                $(".bloglist").eq(i).html(json.title);
                                $(".bloglist").eq(i).index=i;
                                $(".bloglist").eq(i).click(function(){
                                    localStorage.setItem("id",json.id);
                                    console.log(json.id);
                                    window.location.href="blogpaper.html";                                    
                                })
                    }                         
                }else{
                    $(".nodata").show().html("别滚动了，已经到底了。。。");
                }
  
                                
                },
                error:function(json){
                    console.log("error");
                }
            }) 
            }
            //调用ajax
            ajax();

            //下拉加载blog
            var  lala=function(){
                   var winH = $(window).height(); //页面可视区域高度 
                   $(window).scroll(function() {
                        var pageH = $(document.body).height();
                        var scrollT = $(window).scrollTop(); //滚动条top 
                        var aa = (pageH - winH - scrollT) / winH;
                        if (aa < 0.001) {
                            setTimeout(function(){
                            all=all+3;
                            //console.log(i);
                             //console.log(all);
                            // setTimeout(function(){
                            //     load();
                            // },(2000));
                            ajax();                                    
                            },(1000))

                        }
                    })
               } 
            lala();                 
        },


    }
    return personalLoadingData.init;
});


