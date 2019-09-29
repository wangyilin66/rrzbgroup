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
function codemake_z() {
	var data = {

	}
	base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
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
			'<td style="color: skyblue" onclick="lookinfo()">查看详情</td>'+
		'</tr>'
}
////////////////////////////////////////////////////////////////////////
//邀请码生产
function zzcode_z() {
	var data = {

	}
	base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		var pagedata = [];
		//console.log("sd",data.totalCount);
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
	return '<tr>'+
			'<td>' + (index + 1) + '</td>'+
			'<td>' + obj.fenpeiTime + '</td>'+
			'<td>' + obj.dwName + '</td>'+
			'<td>' + obj.placeCount + '</td>'+
			'<td style="color: skyblue">以申领</td>'+
			'<td>'+
				'<button type="button" class="layui-btn layui-btn-normal">查看</button>'+
				'<button style="margin-left: 7px;" type="button" class="layui-btn layui-btn-warm">导出</button>'+
			'</td>'+
		'</tr>'
}