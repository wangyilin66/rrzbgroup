
layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,layedit = layui.layedit
    //,laydate = layui.laydate;
    
    // //日期
    // laydate.render({
    //   elem: '#date'
    // });
    // laydate.render({
    //   elem: '#date1'
    // });
    // function useLayDateMultiple(cls) {
    //   layui.use('laydate', function() {
    //   var laydate = layui.laydate;
    //   lay('#' + cls).each(function() {
    //   laydate.render({
    //   elem : this,
    //   trigger : 'click'
    //   //,done: function(value, date, endDate){
    //     //var timechecked=endDate;
    //     //console.log(timechecked);
    //     //console.log(value); //得到日期生成的值，如：2017-08-18
    //     //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    //     //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
    //   //}
    //   });
    //   });
    //   });
    //   }
    //   useLayDateMultiple('time1'); useLayDateMultiple('time2');
    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');
   
    //自定义验证规则
    form.verify({
      title: function(value){
        if(value.length < 5){
          return '标题至少得5个字符啊';
        }
      }
      ,pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ]
      ,content: function(value){
        layedit.sync(editIndex);
      }
    });
    
    //监听指定开关
    form.on('switch(switchTest)', function(data){
      layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
        offset: '6px'
      });
      layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });
    
    //监听提交
    form.on('submit(demo1)', function(data){
      layer.alert(JSON.stringify(data.field), {
        title: '最终的提交信息'
      })
      return false;
    });
   
    //表单赋值
    layui.$('#LAY-component-form-setval').on('click', function(){
      form.val('example', {
        "username": "贤心" // "name": "value"
        ,"password": "123456"
        ,"interest": 1
        ,"like[write]": true //复选框选中状态
        ,"close": true //开关状态
        ,"sex": "女"
        ,"desc": "我爱 layui"
      });
    });
    
    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function(){
      var data = form.val('example');
      alert(JSON.stringify(data));
    });
    
  });
  