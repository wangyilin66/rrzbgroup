		//推荐单位
		let treedata2 = [];
		let treelocaldata = [];
		var data = {
		}
		base.commonAjax('clav/recommendUnit/getAllUnitList', data, function (data) {
			if (data.code == 1) {
				//console.log("z", data);
				treelocaldata = data.data;
//				wtf3(data.data);
				// console.log(treedata)
				layui.use('tree', function () {
					var tree = layui.tree;
					//渲染
					var inst1 = tree.render({
						elem: '#test2'  //绑定元素
						, click: function (obj) {
							// console.log(obj);
							// console.log(obj.data); //得到当前点击的节点数据
							// console.log(obj.elem); //得到当前节点元素 
							// console.log($('.layui-tree-set').attr("data-id"));
							//  console.log(obj.data.id); //得到当前点击的节点数据
							let str = obj.data.id;
							console.log(String(str).indexOf('-'));
							// console.log(str.indexOf('-')>-1);

							if (String(str).indexOf('-') != -1) {

								let arr = str.split('-');
								if (arr.length == 2) {
									console.log(treelocaldata[Number(arr[0])].childList[Number(arr[1])]);
									recommendType14 = treelocaldata[Number(arr[0])].childList[Number(arr[1])].id;

									//console.log("推荐",ind1);
									//console.log(treedata2[arr[0]].title);
									// console.log(treedata[arr[0]].title);
									// console.log(obj.data.title);
									var tjplace2 = obj.data.title;
									//+treedata2[arr[0]].title;
									//console.log("地区",place);
									$('#dscode').val(tjplace2);
									$('#test2').css("visibility", "hidden");
								}
								if (arr.length == 3) {
									//console.log(treelocaldata[Number(arr[0])].childList[Number(arr[1])].childList[Number(arr[2])].name);
									//ind1 = treelocaldata[Number(arr[0])].childList[Number(arr[1])].id;

									//console.log("推荐",arr);
									//console.log(treedata2[arr[0]].title);
									// console.log(treedata[arr[0]].title);
									// console.log(obj.data.title);
									var tjplace3 = treelocaldata[Number(arr[0])].childList[Number(arr[1])].childList[Number(arr[2])].name;
									recommendType14=treelocaldata[Number(arr[0])].childList[Number(arr[1])].childList[Number(arr[2])].id;
									//+treedata2[arr[0]].title;
									//console.log("地区",place);
									$('#dscode').val(tjplace3);
									$('#test2').css("visibility", "hidden");
								}			
							} else {
								let arr = str;
								console.log(arr);
								console.log(treelocaldata[arr]);
								recommendType14 = treelocaldata[arr].id;

								//console.log("推荐",arr);
								//console.log(treedata2[arr[0]].title);
								// console.log(treedata[arr[0]].title);
								// console.log(obj.data.title);
								var tjplace2 = obj.data.title;
								//+treedata2[arr[0]].title;
								//console.log("地区",place);
								$('#dscode').val(tjplace2);
								$('#test2').css("visibility", "hidden");

							}
						}
						, data: treedata2
					});

				});
			}
		});
				function wtf3(data) {
			data.map(function(v, i){
				let obj = {};
				obj.title = v.name;
				obj.id = i;
				obj.children = [];
				v.childList.map(function(val, ind){
					//console.log(val);
					let objc = {};
					objc.title = val.name;
					objc.id = i + '-' + ind;
					objc.children = [];
					val.childList.map(function(al, nd){
						let objcc = {};
						objcc.title = al.name;
						objcc.id = i + '-' + ind+ '-' + nd;
						objcc.children = [];
						objc.children.push(objcc);
					})
					obj.children.push(objc);
				});
				treedata2.push(obj);
			});
		}
//=====================
		
		
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
//					labelType=3;
//					var data2={
//						labelType:labelType
//					}
//					base.commonAjax('clav/recommendUnit/selectByLabelType', data2, function (data) {
//						if (data.code == 1) {
//							for (var i = 0; i < data.data.length; i++) {
//								$('#dscode').append(
//										'<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
//								);
//						}
//						form.render();
//						}
//					})
	})
//分配列表
function codelist_z() {
	var data = {

	}
	base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		var pagedata = [];
		//console.log("sd",data.totalCount);
		pagedata = data.data;
		//console.log(data)
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
				'<button id="update'+ obj.id+'"class="layui-btn update_z" onclick=update_z('+obj.id+') style="width:50px;height:20px;line-height:20px;margin-top:0px;padding-left:11px;">修改</button>'+
				'<button style="margin-left: 7px;width:50px;height:20px;line-height:20px;margin-top:0px;padding-left:11px;" id="remove'+ obj.id+'"class="layui-btn layui-btn-danger update_mv" onclick=remove_z('+obj.id+')>删除</button>'+
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
   console.log("传id",data)
   base.commonAjax('clav/allotInfo/getAllotInfoList', data, function (data) {
		   console.log(data)
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
			codemake_z();
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
		//console.log('sc',data.isResetShow)
		$('#newsc').empty();
		$('#newsc2').empty();
		if ((data.isResetShow)==0) {
			$('#newsc').append(
				'<button type="button" class="layui-btn layui-btn-normal"id="yjsc_z" onclick="newyjsc()">一键生成</button>'+
                '<div class="clear"></div>'
			)
		} else{
			$('#newsc2').append(
				'<a href="http://39.98.186.243/clav/inviteCodeWord/getWord2" download=""><button type="button" class="layui-btn layui-btn-normal">完成并下载</button></a>'+
                '&nbsp;&nbsp;<button type="button" class="layui-btn layui-btn-danger"id="yjsc_z2" onclick="jiuchux()">全部邀请码重新生成</button>'
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
//			'<td style="width: 50px">'+
//				'<input type="checkbox" name="" class="zzc" title="" lay-skin="primary">'+
//			'</td>'+
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
				'<a href="http://39.98.186.243/clav/inviteCodeWord/getWord2" download=""><button type="button" class="layui-btn layui-btn-normal">完成并下载</button></a>'+
                '&nbsp;&nbsp;<button type="button" class="layui-btn layui-btn-danger"id="yjsc_z2" onclick="jiuchux()">全部邀请码重新生成</button>'
			)
		} else{
			alert(data.message)
		}
	})
}
////////////////////////////////////////////////////////////////////////
//组织邀请码申请
function zzcode_z(remarks1,tjId) {
	var remarks1;
	var tjId;
	var data = {
		remarks1:remarks1,
		tjId:tjId
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
			if (obj.type == 1) {
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
				'<button type="button" style="width:50px;height:20px;line-height:20px;margin-top:0px;padding-left:11px;"class="layui-btn layui-btn-normal" onclick="zzcode_zz(' + obj.unitId + ')">查看</button>'+
				'<button style="margin-left: 7px;width:50px;height:20px;line-height:20px;margin-top:0px;padding-left:11px;" type="button" class="layui-btn layui-btn-warm" onclick="lvyn(' + obj.id + ')">导出</button>'+
			'</td>'+
		'</tr>'
}
function zzcode_zz(zzid){
	var zfid=zzid;
	var data={
		id:zfid
	}
	base.commonAjax('clav/allotInfo/chakanInviteCode', data, function (data) {
			$('.cover7').css( "display", "block");
			$('.codeinfo_z2').empty();
			console.log("aaaaa",data)
			for(var i=0;i<data.data.length;i++){
				if(data.data[i].remarks2 == 1){
					$('.codeinfo_z2').append(
					'<div style="display: inline-block;font-size: 16px;padding-top: 10px;width: 45%">'+data.data[i].inviteCode+'(补领)</div>'
					)
				}else{
					$('.codeinfo_z2').append(
					'<div style="display: inline-block;font-size: 16px;padding-top: 10px;width: 45%">'+data.data[i].inviteCode+'</div>'
					)
				}
				
			}
	})
}
//查询
function zuzycf(){
	if(($('#nianfen2').val())!=''){
		var remarks1=category_z;
	}
	if(($('#dscode').val())!=''){
		var tjId=recommendType14;
	}
	zzcode_z(remarks1,tjId);
}
//完成分配
function successfp(){
	var data={
		
	}
	base.commonAjax('clav/allotInfo/fenpeiFinish', data, function (data) {
		if(data.code==1){
			alert('操作成功');
		}else{
			alert(data.message);
		}
	})
}
//一键申领并传播
function yiicb(){
	var data={
		
	}
	base.commonAjax('clav/allotInfo/isHaveInviteCode', data, function (data) {
	if(data.code==1){
		let url = 'http://39.98.186.243/clav/inviteCodeWord/getWord'
      if (this.isIE()) { // IE
        window.open(url, '_blank')
      } else {
        let a = document.createElement('a') // 创建a标签
        let e = document.createEvent('MouseEvents') // 创建鼠标事件对象
        e.initEvent('click', false, false) // 初始化事件对象
        a.href = url // 设置下载地址
        a.download = '' // 设置下载文件名
        a.dispatchEvent(e)
      }
      setTimeout(function() {
                       zzcode_z();
                     }, 500);
	}else{
		alert(data.message)
	}
	
	})
}
	//组织邀请码单个导出
		function lvyn(ynnid){
			let url = 'http://39.98.186.243/clav/exportExcel/downloadsExcelDown3?ids='+ynnid+''
      if (this.isIE()) { // IE
        window.open(url, '_blank');
      } else {
        let a = document.createElement('a') // 创建a标签
        let e = document.createEvent('MouseEvents') // 创建鼠标事件对象
        e.initEvent('click', false, false) // 初始化事件对象
        a.href = url // 设置下载地址
        a.download = '' // 设置下载文件名
        a.dispatchEvent(e);
        setTimeout(function() {
                       zzcode_z();
                     }, 500);
		
      }
       
		}
	function isIE () {
		      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
		        return true
		      } else {
		        return false
		      }
		    }
		
		