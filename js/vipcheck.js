// var status=0;
var data = {
    // status:status
}
base.commonAjax('clav/memberUnit/getClavMemberUnitList', data, function (data) {
    //console.log(data)
    for (var i = 0; i < data.data.length; i++) {
        let id = data.data[i].id;
        $('.vipdutysh').append(
            '<tr>' +
            '<td style="width: 50px">' +
            '<input type="checkbox" name="" title="" lay-skin="primary">' +
            '</td>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + (data.data[i].createTime).split(/\s+/)[0] + '</td>' +
            '<td>' + data.data[i].unitName + '</td>' +
            '<td>' +
            '<button id="' + 'find' + id + '" type="button" class="layui-btn">查看</button>' +
            '<button id="' + 'but' + id + '" type="button" class="layui-btn layui-btn-normal">通过</button>' +
            '<button id="' + 'no' + id + '" type="button" class="layui-btn layui-btn-danger">不通过</button>' +
            '<button type="button" class="layui-btn layui-btn-warm">下载</button>' +
            '</td>' +
            '</tr>'
        );
        $('#but' + id).on('click', function () {
            // console.log(id);
            $(".cover1").css("display", "inline-block");
            $("#titg").on('click', function () {
                var file = $("#upLoad")[0].files[0];
                var formData = new FormData();
                formData.append("file", file);
                $.ajax({
                    type: "post",
                    url: base.baseurl + 'clav/upload/uploadFile',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function (data, textStatus, jqXHR) {
                        if (data.code == 1) {
                            //console.log(data);
                            var yesid = id;
                            var status = 1;
                            var reply = data.data[0].url;
                            var data = {
                                id: yesid,
                                status: status,
                                reply: reply
                            }
                            // console.log(data)
                            base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
                                if (data.code == 1) {
                                    $(".cover1,.cover2").css("display", "none");
                                }
                            })
                        }
                    }
                })
            })
        });
        $('#no' + id).on('click', function () {
            // console.log(id);
            $(".cover2").css("display", "inline-block");
            $("#tibtg").on('click', function () {
                var noid = id;
                var status = 2;
                var reply = $("#reply").val();
                var data = {
                    id: noid,
                    status: status,
                    reply: reply
                }
                console.log(data)
                base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
                    if (data.code == 1) {
                        $(".cover1,.cover2").css("display", "none");
                    }
                })

            })

        });
        $('#find' + id).on('click', function () {
            // console.log(id);
            $(".cover3").css("display", "inline-block");
            var findid=id;
            var data={
                id:findid
            }
            base.commonAjax('clav/memberUnit/checkClavMemberUnit', data, function (data) {
                if (data.code == 1) {
                    console.log(data)
                    $(".findfile").empty();
                    $('.findfile').append(
                        '<a location.href="'+data.data.applicationBook+'" download="申请表">'+
                        '<div class="wj">申请书</div>'+
                        '</a>'+
                        '<a href="'+data.data.associationRule+'" download="申请表">'+
                        '<div class="wj">协会章程</div>'+
                        '</a>'+
                        '<div class="wj">单位情况介绍</div>'+
                        '<div class="wj">资质证明</div>'
                    );                   
                }
            })
        });
    }
})