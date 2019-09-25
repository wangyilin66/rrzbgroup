   //推荐类型
   function daweileixing(){
    layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功

    var data = {
        labelType:1
    }
    base.commonAjax('clav/recommendUnit/selectByLabelType', data, function (data) {
            if (data.code == 1) {
                    //console.log(data);      
                    for (var i = 0; i < data.data.length; i++) {
                            $('#rec_ttype').append(
                                    '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
                            );
                    }
                    form.render();
            }
    });
})
}
//单位名称
function daweimingcheng(){
    layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    var data = {
        labelType:2
    }
    base.commonAjax('clav/recommendUnit/selectByLabelType', data, function (data) {
            if (data.code == 1) {
                    //console.log(data);      
                    for (var i = 0; i < data.data.length; i++) {
                            $('#rec_dtype').append(
                                    '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
                            );
                    }
                    form.render();
            }
    });
})
}
daweileixing();
daweimingcheng();
        
        
        //查询
          $(document).on('click', '#cnmfind', function () {				
			if($('#wjcname').val()!=''){
				var name=$('#wjcname').val();
			//console.log(name)
			}
			//	var recommendType=recttype;
			//console.log(name)
            //    var unitType=recdtype;
                console.log($('#rec_dtype').text())
			//tuijiandanwiesh(name,recommendType,unitType);
		
        })
        
        		//会员审核
		function tuijiandanwiesh(name,recommendType,unitType) {
			var orgIdentityId = 11;
			var auditStatus = 1;
			var recommendType;
			var unitType;
			var name;
			var data = {
				name: name,
				orgIdentityId: orgIdentityId,
				auditStatus: auditStatus,
				recommendType:recommendType,
				unitType:unitType
			}
			base.commonAjax('clav/recommendUnit/getRecommendUnitList', data, function (data) {
				//console.log("理事",data)
				var pagedata = [];
				// 
				pagedata = data.data;
				//调用分页
				layui.use(['laypage', 'layer'], function () {
					var laypage = layui.laypage
						, layer = layui.layer;

					laypage.render({
						elem: 'shuju6'
						, count: pagedata.length,
						layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
						limit: 10,
						jump: function (obj) {
							//模拟渲染
							document.getElementById('tuijiandanweiss').innerHTML = function () {
								var arr = []
									, thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
								layui.each(thisData, function (index, item) {
									// console.log(item)
									arr.push(auto4(index, item));
									//console.log(item);                         
								});
								return arr.join('');
							}();
						}
					});
				});
			})
		}
		function auto4(index, obj) {
			// console.log('dx',obj.status)
			var msg;
			if (obj.status == 1) {
				msg = '否'
			} else {
				msg = '是'
			}
			return '<tr>' +
				'<td>' + (index + 1) + '</td>' +
				'<td>' + obj.recommendType + '</td>' +
				'<td>' + obj.unitType + '</td>' +
				'<td>' + obj.name + '</td>' +
				'<td>' + msg + '<td>' +
				'<button id="' + 'cnm_up' + obj.id + '"class="layui-btn cnm_up">上移</button>' +
				'<button id="' + 'cnm_down' + obj.id + '"class="layui-btn cnm_down">下移</button>' +
				'<button id="' + 'cnm_update' + obj.id + '"class="layui-btn layui-btn-normal cnm_update">编辑</button>' +
				'<button id="' + 'cnm_move' + obj.id + '"class="layui-btn layui-btn-danger cnm_move">删除</button>' +
				'</td>' +
				'</tr>'

		}
		tuijiandanwiesh();