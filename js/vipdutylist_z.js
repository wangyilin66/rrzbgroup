$('.headerpage').html(commHeader.header);
$(".tatou").css({ "background-color": "#059afe", "color": "white" });
function close1() {
    $(".cover4,.cover5").css( "display", "none");		
}
$(document).on('click','#chosedyn', function () { 
    $(".cover4").css( "display", "inline-block");	
})

layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
$(document).on('click','.cusedit', function () {
//console.log($(this).attr('id').replace("find",""));
$(".cover5").css("display", "inline-block");
var cusedit=$(this).attr('id').replace("cus","");
var cusedit2=$(this).attr('zzc').replace("zzc","");
var data={
id:cusedit
}
//console.log(data)
base.commonAjax('clav/orgIdentity/getClavOrgIdentityList', data, function (data) {	
//console.log("dddddd",data)
var d=data.data[0].id;
$('#jjyn').val(d);
form.render();
    //确定按钮
    $(document).on('click','#csyqd', function () {
        if(mz3===undefined){
            alert('已经是了')
            return false;
        } 
        console.log('xc',cusedit2)
        console.log('ss',mz3)
        var zhangq=cusedit2;
        var dujuyu=mz3;
        var data={
            id:zhangq,
            orgIdentityId:dujuyu
        }
        base.commonAjax('clav/member/updateClavMember', data, function (data) {
            alert("成功修改")
            $(".cover5").css( "display", "none");
            var orgIdentityId=dyn;
            var name;
            cndbz2(name,orgIdentityId)	
        })
    })
})
})
})

//////////////////////////////////////////////////////////
layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功

//获取组织单位
function getzzhi(){
var data={

}
base.commonAjax('clav/orgIdentity/getClavOrgIdentList', data, function (data) {		
if(data.code==1){
    for(var i=0;i<data.data.length;i++){
        $("#jjyn").append(
            '<option value="'+data.data[i].id+'">'+data.data[i].orgIdentity+'</option>'
        )
    }
    form.render();
}
})
}
getzzhi();
})



//获取URL数据  
function getQueryString() {
var url = location.search; //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
}
return theRequest;
}
idinfo=getQueryString("id").id;
//console.log(idinfo)
dyn=idinfo;

//$('#yinc').text(idinfo)

//console.log()
//
layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
form.on('select(jjjId)',function(data){
    dyn=data.value;
   //mz3=data.elem[data.elem.selectedIndex].text;
   console.log(dyn)
   form.render('select');
})
//$("#jjjId option[value='"+idinfo+"']").attr("selected","selected");
})
function cndbz(name){
if(dyn==idinfo){
    $('#chosedyn').css("display","inline-block")
}
if(dyn==9){
    $('#chosedyn').css("display","none")
}
    var zhiweid=idinfo;
    var name;
var data={
name:name,
    orgIdentityId:zhiweid
}
console.log("下一数据",data)
base.commonAjax('clav/member/getClavMemberList', data, function (data) {
//console.log(data)
var pagedata = [];
        //console.log(data);
        pagedata = data.data;
        //console.log(pagedata)

        //调用分页
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;

            laypage.render({
                elem: 'layui'
                , count: pagedata.length,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                limit: 10,
                jump: function (obj) {
                    //模拟渲染
                    document.getElementById('tbcc').innerHTML = function () {
                        var arr = []
                            , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function (index, item) {
                            arr.push(auto(index, item));
                            //console.log(item);
                        });
                        return arr.join('');
                    }();
                }
            });
        });

})

}
function cndbz2(name,orgIdentityId){
if(dyn==idinfo){
    $('#chosedyn').css("display","inline-block")
}
if(dyn==9){
    $('#chosedyn').css("display","none")
}
    var zhiweid=orgIdentityId;
    var name;
var data={
name:name,
    orgIdentityId:zhiweid
}
console.log("下一数据",data)
base.commonAjax('clav/member/getClavMemberList', data, function (data) {
//console.log(data)
var pagedata = [];
        //console.log(data);
        pagedata = data.data;
        //console.log(pagedata)

        //调用分页
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;

            laypage.render({
                elem: 'layui'
                , count: pagedata.length,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                limit: 10,
                jump: function (obj) {
                    //模拟渲染
                    document.getElementById('tbcc').innerHTML = function () {
                        var arr = []
                            , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function (index, item) {
                            arr.push(auto(index, item));
                            //console.log(item);
                        });
                        return arr.join('');
                    }();
                }
            });
        });

})

}
cndbz();
function auto(index, obj) {
    return  '<tr>'+
                    '<td>'+
                        '<input type="checkbox" name="" title="" lay-skin="primary">'+
                    '</td>'+
                    '<td>123123123123</td>'+
                    '<td>'+obj.memberNo+'</td>'+
                    '<td>'+obj.name+'</td>'+
                    '<td>'+(obj.createDate).split(/\s+/)[0] +'</td>'+
                    '<td>'+obj.unitAndDuty+'</td>'+
                    '<td>'+obj.orgIdentityStr+

                        
                        '<i class="layui-icon layui-icon-edit cusedit" id="' + 'cus' + obj.orgIdentityId + '" zzc="' + 'zzc' + obj.id + '"></i>'+
                   '</td>'+
                    '<td>'+obj.artStr+'</td>'+
                    '<td>'+obj.location+'</td>'+
                    '<td>'+
                        '<button id="' + 'sm_up' + obj.id + '" type="button" class="layui-btn layui-btn-normal sm_up">上移</button>'+
                        '<button id="' + 'sm_down' + obj.id + '" type="button" class="layui-btn layui-btn-normal sm_down">下移</button>'+
                    '</td>'+
                '</tr>'
}
//上移
$(document).on('click','.sm_up', function () { 
var sm_up=$(this).attr('id').replace("sm_up","");
var status=1
var oid=dyn;
var data={
id:sm_up,
status:status,
oid:oid
}
console.log("xxx",data)
base.commonAjax('clav/member/memberUpOrDown', data, function (data) {
console.log('成功')
var orgIdentityId=oid;
var name;
cndbz2(name,orgIdentityId)
//location.reload();
})
})
//下移
$(document).on('click','.sm_down', function () { 
     var sm_down=$(this).attr('id').replace("sm_down","");
var status=2
var oid=dyn;
var data={
id:sm_down,
status:status,
oid:oid
}
base.commonAjax('clav/member/memberUpOrDown', data, function (data) {
//cndbz();
console.log('成功')
var orgIdentityId=oid;
var name;
cndbz2(name,orgIdentityId)
//location.reload();
})
})
$(document).on('click','#ben_find', function () { 
var name;
if((dyn==idinfo)&&($("#vipnumber43").val()!='')){
name=$("#vipnumber43").val();
cndbz(name);
}
if((dyn==idinfo)&&($("#vipnumber43").val()=='')){		
cndbz();
}
//cndbz(name);
if(dyn!=idinfo){
//document.getElementById('tbcc').empty();
if(dyn==9){
    $('#chosedyn').css("display","none")
}
if(dyn!=9){
    $('#chosedyn').css("display","inline-block")
}
if($("#vipnumber43").val()!=''){
name=$("#vipnumber43").val();
}

    var ddyn=dyn;
    var name;
var data={
    orgIdentityId:ddyn,
    name:name
}
    //console.log("ddd",data)
    document.getElementById('tbcc').innerHTML='';
base.commonAjax('clav/member/getClavMemberList', data, function (data) {

var pagedata = [];
    
        pagedata = data.data;
    

        //调用分页
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;

            laypage.render({
                elem: 'layui'
                , count: pagedata.length,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                limit: 10,
                jump: function (obj) {
                    //模拟渲染
                    document.getElementById('tbcc').innerHTML = function () {
                        var arr = []
                            , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function (index, item) {
                            arr.push(auto(index, item));
                            //console.log(item);
                        });
                        return arr.join('');
                    }();
                }
            });
        });

})
}


})


layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
        var data = {
        }
        base.commonAjax('clav/orgIdentity/getClavOrgIdentList', data, function (data) {
                if (data.code == 1) {
                        //console.log(data);      
                        for (var i = 0; i < data.data.length; i++) {
                                $('#jjjId').append(
                                        '<option value="' + data.data[i].id + '">' + data.data[i].orgIdentity + '</option>'
                                );
                        }
                        form.render();
                }
        });

})



function chosevip(){
var id=dyn;
var orgIdentityId=dyn;
var data={
id:id
}
//console.log("jiu",data)
base.commonAjax('clav/orgIdentity/getNotThisIdentityMember', data, function (data) {
//console.log("左边",data)
$("#unselect-ul").empty();
if(data.code==1){
    for(var i=0;i<data.data.length;i++){
    $("#unselect-ul").append(
        '<li>'+
            '<input type="checkbox" class="checkboxs zzc_right"  id="tyue-checkbox-blue1" value="'+data.data[i].id+'"/>'+
            '<label for="tyue-checkbox-blue1"></label>'+
            '<span>'+data.data[i].name+'</span>'+
        '</li>'
    )
}
$("#list1").empty();
$("#list1").append(
            '<span>'+data.data.length+'项</span>'
    )
}

})
var data2={
orgIdentityId:orgIdentityId
}
base.commonAjax('clav/member/getClavMemberList', data2, function (data) {
//console.log("右边",data)
$("#selected-ul").empty();

for(var i=0;i<data.data.length;i++){
    $("#selected-ul").append(
        '<li>'+
            '<input type="checkbox" class="checkboxs zzc_right"  id="tyue-checkbox-blue1" value="'+data.data[i].id+'"/>'+
            '<label for="tyue-checkbox-blue1"></label>'+
            '<span>'+data.data[i].name+'</span>'+
        '</li>'
    )
}
$("#list2").empty();
$("#list2").append(
    '<span>'+data.data.length+'项</span>'
    )

})
}


$(document).on('click','#jiujiqd', function () {

var arr=[]
var aq=document.getElementById("selected-ul")
var oobb=aq.getElementsByClassName("zzc_right");
for(var i=0;i<oobb.length;i++){
arr[i]=oobb[i].value;
}
var ids;
if(arr.length<=0){
ids=-1;
}if((arr.length>0)){
ids=arr.join();
}
console.log('传',ids)
var data={
ids:ids,
id:dyn
}
console.log("操作后",data)
base.commonAjax('clav/orgIdentity/chooseMember', data, function (data) {
if(data.code==1){
$(".cover4").css( "display", "none");
alert("操作成功");
var name;
var orgIdentityId=dyn;
//cndbz();
cndbz2(name,orgIdentityId)
}

})
})