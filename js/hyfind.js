$(function () {	
		
    //艺术门类
function lingyu(){
var type="genre";
var data={
type:type
}
comm.commonAuth('junmin/dict/getDicts', data, function (data) {  
     if (data.code == 1) {
             //console.log(data);
             for (var i = 0; i < data.data.length; i++) {
             $('.list8').append(
                     '<li  data="'+data.data[i].value+'">'+data.data[i].label+'</li>'				         
             );
             }
     }	
});
}
})