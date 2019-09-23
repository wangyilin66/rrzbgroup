//理事审核
function lishicheck(){
    var aduitStatus=1;
    var data = {
        // aduitStatus:aduitStatus
   }
    base.commonAjax('clav/lishiReplace/getClavLishiReplaceList', data, function (data) {
        console.log("理事",data)
        var pagedata = [];
        // 
         pagedata = data.data;
         //调用分页
         layui.use(['laypage', 'layer'], function () {
             var laypage = layui.laypage
                 , layer = layui.layer;
     
             laypage.render({
                 elem: 'shuju2'
                 , count: pagedata.length,
                 layout: ['count', 'prev', 'page', 'next', 'limit','skip'],
                 limit: 10,
                 jump: function (obj) {
                     //模拟渲染
                     document.getElementById('viplish').innerHTML = function () {
                         var arr = []
                             , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                         layui.each(thisData, function (index, item) {
                           
                             // console.log(item)
                             arr.push(auto2(index,item));
                             //console.log(item);
                             
                         });
                         return arr.join('');
                     }();
                 }
             });
         });
    })
}
lishicheck();
$(document).on('click','.lis_find', function () {
    //console.log($(this).attr('id').replace("find",""));
    $(".cover4").css("display", "inline-block");
     var lis_find=$(this).attr('id').replace("li_find","");
    var data={
        id:lis_find
    }
    base.commonAjax('clav/lishiReplace/chakanClavLishiReplace', data, function (data) {
        if (data.code == 1) {
            console.log(data)
            $(".li_file").empty();
            $('.li_file').append(
                '<a href="'+data.data.remarks1+'" download="">'+
                '<div class="wj sli_downloadfile">理事申请书</div>'+
                '</a>'
            );
        }
    })
})
//会员单位审核
function huiyuancheck(){
var status=0;
var data = {
     status:status
}
base.commonAjax('clav/memberUnit/getClavMemberUnitList', data, function (data) {
    //console.log(data)
    var pagedata = [];
   // 
    pagedata = data.data;
    //调用分页
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;

        laypage.render({
            elem: 'shuju3'
            , count: pagedata.length,
            layout: ['count', 'prev', 'page', 'next', 'limit','skip'],
            limit: 10,
            jump: function (obj) {
                //模拟渲染
                document.getElementById('vipdutysh').innerHTML = function () {
                    var arr = []
                        , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                    layui.each(thisData, function (index, item) {
                      
                        // console.log(item)
                        arr.push(auto(index,item));
                        //console.log(item);
                        
                    });
                    return arr.join('');
                }();
            }
        });
    });
})
}
huiyuancheck();
function auto(index,obj){
     return  '<tr>' +
            '<td style="width: 50px">' +
            '<input type="checkbox" name="" title="" lay-skin="primary">' +
            '</td>' +
            '<td>' + (index+1)+ '</td>' +
            '<td>' + (obj.createTime).split(/\s+/)[0] + '</td>' +
            '<td>' + obj.unitName + '</td>' +
            '<td>' +
            
            '<button id="' + 'find' + obj.id + '"  type="button" class="layui-btn find">查看</button>' +
            
            '<a>'+
            '<button id="' + 'but' + obj.id + '" type="button" class="layui-btn layui-btn-normal but">通过</button>' +
            '</a>'+
            '<a>'+
            '<button id="' + 'no' + obj.id + '" type="button" class="layui-btn layui-btn-danger no">不通过</button>' +
            '</a>'+
            '<a href="http://39.98.186.243/clav/memberUnit/downloadRAR?id='+obj.id+'" download="">'+
            '<button id="' + 'download' + obj.id + '" type="button" class="layui-btn layui-btn-warm">下载</button>' +
            '</a>'+
            '</td>' +
            '</tr>'
}
function auto2(index,obj){
    return   '<tr>'+                  
                '<td>'+(index+1)+'</td>'+
                '<td>' + (obj.createTime).split(/\s+/)[0] + '</td>'+
                '<td>' + obj.unit + '</td>'+
                '<td>' + obj.oname + '</td>'+
                '<td>' + obj.oduty + '</td>'+
                '<td>' + obj.nname + '</td>'+
                '<td>' + obj.nduty + '</td>'+
                '<td>'+
                    '<button id="' + 'li_find' + obj.id + '"class="layui-btn lis_find">查看</button>'+
                    '<button id="' + 'li_tong' + obj.id + '"class="layui-btn layui-btn-normal lis_tongg">通过</button>'+
                    '<button id="' + 'li_no' + obj.id + '"class="layui-btn layui-btn-danger lis_notongg">不通过</button>'+
                '</td>'+
            '</tr>'
}
$(document).on('click','.find', function () {
    //console.log($(this).attr('id').replace("find",""));
    $(".cover3").css("display", "inline-block");
    var findid=$(this).attr('id').replace("find","");
    var data={
        id:findid
    }
    base.commonAjax('clav/memberUnit/checkClavMemberUnit', data, function (data) {
        if (data.code == 1) {
            console.log(data)
            $(".findfile").empty();
            $('.findfile').append(
                '<a href="'+data.data.applicationBook+'" download="申请表">'+
                '<div class="wj">申请书</div>'+
                '</a>'+
                '<a href="'+data.data.associationRule+'" download="协会章程">'+
                '<div class="wj">协会章程</div>'+
                '</a>'+
                '<a href="'+data.data.unitSituation+'" download="单位情况介绍">'+
                '<div class="wj" >单位情况介绍</div>'+
                '</a>'+
                '<a href="'+data.data.aptitudeProve+'" download="资质证明">'+
                '<div class="wj">资质证明</div>'+
                '</a>'
            );                   
        }
    })
})
$(document).on('click','.but', function () {
    var butid=$(this).attr('id').replace("but","");
    //console.log (butid)
    $(".cover1").css("display", "inline-block");
    $("#titg").on('click', function () {
        var file = $("#upLoad")[0].files[0];
        var formData = new FormData();
        formData.append("file", file);
        $.ajax({
            type: "post",
            url: base.baseurl + 'clav/upload/uploadFile',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data, textStatus, jqXHR) {
                if (data.code == 1) {
                    //console.log(data);
                    var yesid = butid;
                    var status = 1;
                    var reply = data.data[0].url;
                    var data = {
                        id: yesid,
                        status: status,
                        reply: reply
                    }
                    // console.log(data)
                    base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
                        if (data.code == 1) {
                            $(".cover1,.cover2").css("display", "none");
                        }
                    })
                }
            }
        })
    })
})
$(document).on('click','.no', function () {
         // console.log(id);
         var no2id=$(this).attr('id').replace("no","");
         $(".cover2").css("display", "inline-block");
         $("#tibtg").on('click', function () {
             var noid = no2id;
             var status = 2;
             var reply = $("#reply").val();
             var data = {
                 id: noid,
                 status: status,
                 reply: reply
             }
             console.log(data)
             base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
                 if (data.code == 1) {
                     $(".cover1,.cover2").css("display", "none");
                 }
             })
     
         })
})


