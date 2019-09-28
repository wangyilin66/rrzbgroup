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