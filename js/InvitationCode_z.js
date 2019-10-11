		//日期
		layui.use('laydate', function () {
			var laydate = layui.laydate;
			//日期
			laydate.render({
				elem: '#date'
			});
			laydate.render({
				elem: '#date1'
			});
			function useLayDateMultiple(cls) {
				layui.use('laydate', function () {
					var laydate = layui.laydate;

					lay('#' + cls).each(function () {
						laydate.render({
							elem: this
							, trigger: 'click'
							, format: 'yyyy/MM/dd HH:mm:ss'
							, done: function (value, datetime, endDate) {
								timechecked4 = value;
								bjtime4 = timechecked4.split(/\s+/)[0].replace(/\//g, "");
								console.log(bjtime4);
							}
						});
					});
				});
			}

			function useLayDateMultiple2(cls) {
				layui.use('laydate', function () {
					var laydate = layui.laydate;
					lay('#' + cls).each(function () {
						laydate.render({
							elem: this,
							trigger: 'click'
							, format: 'yyyy/MM/dd HH:mm:ss'
							, done: function (value, datetime, endDate) {
								timechecked3 = value;
								bjtime3 = timechecked3.split(/\s+/)[0].replace(/\//g, "");
								console.log(bjtime3);
							}
						});
					});
				});
			}
			useLayDateMultiple('time1'); useLayDateMultiple2('time2');
		});

		layui.use('form', function(){
			  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
			
			//年份
					var data = {
					}
					base.commonAjax('clav/allotInfo/getYearList', data, function (data) {
						//console.log(data.data[0])
							if (data.code == 1) {
									//console.log(data);      
									for (var i = 0; i < data.data.length; i++) {
											$('#nianfen').append(
													'<option value="' + data.data[i] + '">' + data.data[i] + '</option>'
											);
											$('#nianfen2').append(
												'<option value="' + data.data[i] + '">' + data.data[i] + '</option>'
										);
									}
									form.render();
							}
					});
					labelType=3;
					var data2={
						labelType:labelType
					}
					base.commonAjax('clav/recommendUnit/selectByLabelType', data2, function (data) {
						if (data.code == 1) {
							for (var i = 0; i < data.data.length; i++) {
								$('#dscode').append(
										'<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
								);
						}
						form.render();
						}
					})
	})
//分配列表
function codelist_z() {
	var data = {

	}
	base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		var pagedata = [];
		//console.log("sd",data.totalCount);
		pagedata = data.data;
		console.log(data)
		$('#table_count').empty();
		$('#table_count').append(
			'发展名额数(共计'+data.totalCount+'个)'
		)
		//调用分页
		layui.use(['laypage', 'layer'], function () {
			var laypage = layui.laypage
				, layer = layui.layer;

			laypage.render({
				elem: 'shuju1'
				, count: pagedata.length,
				layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
				limit: 10,
				jump: function (obj) {
					//模拟渲染
					document.getElementById('codefenpei_z').innerHTML = function () {
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
	});
}
codelist_z();
function auto(index, obj) {
	return '<tr>'+
			'<td>' + (index + 1) + '</td>'+
			'<td>' + obj.tjType + '</td>'+
			'<td>' + obj.dwType + '</td>'+
			'<td>' + obj.dwName + '</td>'+
			'<td>' + obj.placeCount + '</td>'+
			'<td>' + (obj.fenpeiTime).split(/\s+/)[0] + '</td>'+
			'<td>'+
				'<button id="update'+ obj.id+'"class="layui-btn update_z" onclick=update_z('+obj.id+')>修改</button>'+
				'<button style="margin-left: 7px;" id="remove'+ obj.id+'"class="layui-btn layui-btn-danger update_mv" onclick=remove_z('+obj.id+')>删除</button>'+
			'</td>'+
		'</tr>'
}
//分配列表的修改
function update_z(nid){
   //console.log($(this).attr('id').replace("find",""));
   $(".cover5").css("display", "inline-block");
    fpid=nid;
   var data={
	   id:fpid
   }
   base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		   console.log(data.data[0].placeCount)
		   $('#fzmes_z').val(data.data[0].placeCount)
   })
}
function fzmesqd_z(){
	var newfid=$('#fzmes_z').val()
	var data={
		id:fpid,
		placeCount:newfid
	}
	base.commonAjax('clav/allotInfo/updateAllotInfo', data, function (data) {
			alert('修改成功')
			$(".cover5").css( "display", "none");
			codelist_z();
	})
}
//分配列表的删除
function remove_z(nid){
	var reid=nid;
	var data={
        id:reid
    }
    base.commonAjax('clav/allotInfo/deleteAllotInfo', data, function (data) {
			alert('删除成功')
			codelist_z();
    })
}
////////////////////////////////////////////////////////////////////////
//邀请码生产
function codemake_z(fenpeiTime) {
	var fenpeiTime;
	var data = {
		fenpeiTime:fenpeiTime
	}
	base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		console.log('sc',data.isResetShow)
		$('#newsc').empty();
		$('#newsc2').empty();
		if ((data.isResetShow)==0) {
			$('#newsc').append(
				'<button type="button" class="layui-btn layui-btn-normal"id="yjsc_z" onclick="newyjsc()">一键生成</button>'+
                '<div class="clear"></div>'
			)
		} else{
			$('#newsc2').append(
				'<button type="button" class="layui-btn layui-btn-normal">完成并下载</button>'+
                '<button type="button" class="layui-btn layui-btn-danger"id="yjsc_z2">全部邀请码重新生成</button>'
			)
		}
		var pagedata = [];
		//console.log("sd",data.totalCount);
		pagedata = data.data;
		//调用分页
		layui.use(['laypage', 'layer'], function () {
			var laypage = layui.laypage
				, layer = layui.layer;

			laypage.render({
				elem: 'shuju2'
				, count: pagedata.length,
				layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
				limit: 10,
				jump: function (obj) {
					//模拟渲染
					document.getElementById('sccode_z').innerHTML = function () {
						var arr = []
							, thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
						layui.each(thisData, function (index, item) {
							arr.push(auto2(index, item));
							//console.log(item);
						});
						return arr.join('');
					}();
				}
			});
		});
	});
}
codemake_z();
function auto2(index, obj) {
	return '<tr>'+
			'<td style="width: 50px">'+
				'<input type="checkbox" name="" title="" lay-skin="primary">'+
			'</td>'+
			'<td>' + (index + 1) + '</td>'+
			'<td>' + obj.tjType + '</td>'+
			'<td>' + obj.dwType + '</td>'+
			'<td>' + obj.dwName + '</td>'+
			'<td style="color: skyblue;cursor: pointer;"><div onclick="lookinfo(' + obj.unitId + ')">查看详情</div></td>'+
			// '<td>'+  
			// 	'<button onclick="lookinfo(' + obj.id + ')">查看详情</button>'+
			// '</td>'+
		'</tr>'
}
function yijiansc(){
	base.commonAjax('clav/allotInfo/createInviteCode', data, function (data) {
		if (data.code==1) {
			alert('操作成功')
			$('.cover4').css( "display", "none");
		} else {
			alert(data.code)
		}
	})
}
function lookinfo(infoid){
 var ifid=infoid;
 var data = {
	 id:ifid
}
console.log(data)
base.commonAjax('clav/allotInfo/chakanInviteCode', data, function (data) {
		//console.log("查看详情",data)	
		$('.cover6').css( "display", "block");
		$('.codeinfo_z').empty();
		for(var i=0;i<data.data.length;i++){
			$('.codeinfo_z').append(
				'<div style="display: inline-block;font-size: 16px;padding-top: 10px;width: 45%">'+data.data[i].inviteCode+'</div>'
			)
		}
})
}

function newyjsc(){
	var data={
		
	}
	base.commonAjax('clav/allotInfo/createInviteCode2', data, function (data) {
		if (data.code==1) {
			alert('操作成功')
			$('#newsc').empty();
			$('#newsc2').empty();
			$('#newsc2').append(
				'<button type="button" class="layui-btn layui-btn-normal">完成并下载</button>'+
                '<button type="button" class="layui-btn layui-btn-danger"id="yjsc_z2">全部邀请码重新生成</button>'
			)
		} else{
			alert(data.message)
		}
	})
}
////////////////////////////////////////////////////////////////////////
//组织邀请码申请
function zzcode_z(remarks1,unitId) {
	var remarks1;
	var unitId;
	var data = {
		remarks1:remarks1,
		unitId:unitId
	}
	base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		var pagedata = [];
		console.log("sd",data);
		pagedata = data.data;
		//调用分页
		layui.use(['laypage', 'layer'], function () {
			var laypage = layui.laypage
				, layer = layui.layer;

			laypage.render({
				elem: 'shuju3'
				, count: pagedata.length,
				layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
				limit: 10,
				jump: function (obj) {
					//模拟渲染
					document.getElementById('zzyqmsq_z').innerHTML = function () {
						var arr = []
							, thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
						layui.each(thisData, function (index, item) {
							arr.push(auto3(index, item));
							//console.log(item);
						});
						return arr.join('');
					}();
				}
			});
		});
	});
}
zzcode_z();
function auto3(index, obj) {
	var msg;
			if (obj.status == 1) {
				msg = '已申领'
			} else {
				msg = '未申领'
			}
	return '<tr>'+
			'<td>' + (index + 1) + '</td>'+
			'<td>' + (obj.remarks1)+ '</td>'+
			'<td>' + obj.dwName + '</td>'+
			'<td>' + obj.placeCount + '</td>'+
			'<td style="color: skyblue">'+msg+'</td>'+
			'<td>'+
				'<button type="button" class="layui-btn layui-btn-normal" onclick="zzcode_zz(' + obj.id + ')">查看</button>'+
				'<button style="margin-left: 7px;" type="button" class="layui-btn layui-btn-warm">导出</button>'+
			'</td>'+
		'</tr>'
}
function zzcode_zz(zzid){
	var zfid=zzid;
	var data={
		zfid:zfid
	}
	base.commonAjax('clav/allotInfo/chakanInviteCode', data, function (data) {
			$('.cover7').css( "display", "block");
			$('.codeinfo_z2').empty();
			for(var i=0;i<data.data.length;i++){
				$('.codeinfo_z2').append(
					'<div style="display: inline-block;font-size: 16px;padding-top: 10px;width: 45%">'+data.data[i].inviteCode+'</div>'
				)
			}
	})
}
//查询
function zuzycf(){
	if(($('#nianfen2').val())!=''){
		var remarks1=category_z;
	}
	if(($('#dscode').val())!=''){
		var unitId=dscode;
	}
	zzcode_z(remarks1,unitId);
}


