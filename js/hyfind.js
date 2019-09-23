layui.use('form', function(){
          var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功

        //艺术门类
                var data = {
                }
                base.commonAjax('clav/artType/getClavArtTypeList', data, function (data) {
                        if (data.code == 1) {
                                //console.log(data);      
                                for (var i = 0; i < data.data.length; i++) {
                                        $('#yishu').append(
                                                '<option value="' + data.data[i].id + '">' + data.data[i].artType + '</option>'
                                        );
                                }
                                form.render();
                        }
                });
                base.commonAjax('clav/artType/getClavArtTypeList', data, function (data) {
                        if (data.code == 1) {
                                //console.log(data);      
                                for (var i = 0; i < data.data.length; i++) {
                                        $('#zzsf').append(
                                                '<option value="' + data.data[i].id + '">' + data.data[i].artType + '</option>'
                                        );
                                }
                                form.render();
                        }
                });

})
