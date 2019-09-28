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
	
			//艺术门类
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
		console.log("sd",data.totalCount);
		pagedata = data.data;
		console.log(data)
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

function auto(index, obj) {
	return '<tr>'+
			'<td>' + (index + 1) + '</td>'+
			'<td>' + obj.tjType + '</td>'+
			'<td>' + obj.dwType + '</td>'+
			'<td>' + obj.dwName + '</td>'+
			'<td>' + obj.placeCount + '</td>'+
			'<td>' + (obj.fenpeiTime).split(/\s+/)[0] + '</td>'+
			'<td>'+
				'<button class="layui-btn">修改</button>'+
				'<button class="layui-btn layui-btn-danger">删除</button>'+
			'</td>'+
		'</tr>'
}
codelist_z();