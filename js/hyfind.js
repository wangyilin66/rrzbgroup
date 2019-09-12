
$(function () {

        //艺术门类
        function yishu() {
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
                        }
                });
        }
        yishu();
})