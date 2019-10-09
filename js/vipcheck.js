a = '';
b = '';
layui.use('form', function () {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.on('select(vipb_yishu)', function (data) {
        //recttype=data.value;

        a = data.elem[data.elem.selectedIndex].text;
        //console.log(a)
        form.render('select');
    })
    form.on('select(vipb_yishu2)', function (data) {
        //recttype=data.value;

        b = data.elem[data.elem.selectedIndex].text;
        //console.log(b)
        form.render('select');
    })
    //单位类型
    function daweileixing() {
        var data = {
            labelType: 1
        }
        base.commonAjax('clav/recommendUnit/selectByLabelType', data, function (data) {
            if (data.code == 1) {
                //console.log(data);      
                for (var i = 0; i < data.data.length; i++) {
                    $('#vipb_yishu').append(
                        '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
                    );
                }
                form.render();
            }
        });
    }
    //单位名称
    function daweimingcheng() {
        var data = {
            labelType: 2
        }
        base.commonAjax('clav/recommendUnit/selectByLabelType', data, function (data) {
            if (data.code == 1) {
                //console.log(data);      
                for (var i = 0; i < data.data.length; i++) {
                    $('#vipb_yishu2').append(
                        '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
                    );
                }
                form.render();
            }
        });
    }
    daweileixing();
    daweimingcheng();
})
//会员审核
function vipdutyshenh(name, createBy, recommendType) {
    var orgIdentityId = 11;
    var auditStatus = 1;
    var name;
    var createBy;
    var recommendType;
    var data = {
        name: name,
        orgIdentityId: orgIdentityId,
        auditStatus: auditStatus,
        createBy: createBy,
        recommendType: recommendType
    }
    base.commonAjax('clav/member/getClavMemberList', data, function (data) {
        //console.log("理事",data)
        var pagedata = [];
        // 
        pagedata = data.data;
        //调用分页
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;

            laypage.render({
                elem: 'shuju'
                , count: pagedata.length,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                limit: 10,
                jump: function (obj) {
                    //模拟渲染
                    document.getElementById('vipsh').innerHTML = function () {
                        var arr = []
                            , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function (index, item) {
                            // console.log(item)
                            arr.push(auto3(index, item));
                            //console.log(item);                         
                        });
                        return arr.join('');
                    }();
                }
            });
        });
    })
}
vipdutyshenh();
$(document).on('click', '#vipbfind', function () {
    var name;
    var createBy;
    var recommendType;
    if ($('#vipbname').val() != '') {
        name = $('#vipbname').val()
    }
    if (a != '') {
        createBy = a;
    }
    if (b != '') {
        recommendType = b;
    }
    console.log(name);
    vipdutyshenh(name, createBy, recommendType)
    if (($('#vipbname').val() == '') && !Boolean(a) && !Boolean(b)) {
        console.log("sss");
        vipdutyshenh();
    }
})

//理事审核
function lishicheck() {
    var aduitStatus = 1;
    var data = {
        aduitStatus: aduitStatus
    }
    base.commonAjax('clav/lishiReplace/getClavLishiReplaceList', data, function (data) {
        //console.log("理事",data)
        var pagedata = [];
        // 
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
                    document.getElementById('viplish').innerHTML = function () {
                        var arr = []
                            , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function (index, item) {

                            // console.log(item)
                            arr.push(auto2(index, item));
                            //console.log(item);

                        });
                        return arr.join('');
                    }();
                }
            });
        });
    })
}
lishicheck();
$(document).on('click', '.lis_find', function () {
    //console.log($(this).attr('id').replace("find",""));
    $(".cover4").css("display", "inline-block");
    var lis_find = $(this).attr('id').replace("li_find", "");
    var data = {
        id: lis_find
    }
    base.commonAjax('clav/lishiReplace/chakanClavLishiReplace', data, function (data) {
        if (data.code == 1) {
            // console.log(data)
            $(".li_file").empty();
            $('.li_file').append(
                '<a href="' + data.data.remarks1 + '" download="理事申请上传文件">' +
                '<div class="wj sli_downloadfile">理事申请上传文件</div>' +
                '</a>'
            );
        }
    })
})
// $(document).on('click', '.lis_tongg', function () {
//     // console.log(id);
//     var lis_tongg = $(this).attr('id').replace("li_tong", "");
//     $(".cover5").css("display", "inline-block");
//     $("#li_titg").on('click', function () {
//         var noid = lis_tongg;
//         var aduitStatus = 2;
//         var data = {
//             id: noid,
//             aduitStatus: aduitStatus,
//         }
//         // console.log(data)
//         base.commonAjax('clav/lishiReplace/updateClavLishiReplace', data, function (data) {
//             if (data.code == 1) {
//                 $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6").css("display", "none");
//                 lishicheck();
//             }
//         })

//     })
// })
//理事审核通过
function li_tong(litid){
    var lis_tongg = litid;
    $(".cover5").css("display", "inline-block");
    $("#li_titg").on('click', function () {
        var noid = lis_tongg;
        var aduitStatus = 2;
        var data = {
            id: noid,
            aduitStatus: aduitStatus,
        }
        // console.log(data)
        base.commonAjax('clav/lishiReplace/updateClavLishiReplace', data, function (data) {
            if (data.code == 1) {
                $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6").css("display", "none");
                lishicheck();
                alert('操作成功')
            }
            else{
                alert(data.message)
            }
        })

    })
}
//理事审核不通过
function li_no(linid){
    var lis_notongg = linid;
    $(".cover6").css("display", "inline-block");
    $("#li_tinotg").on('click', function () {
        var noid = lis_notongg;
        var aduitStatus = 3;
        var data = {
            id: noid,
            aduitStatus: aduitStatus,
        }
        //console.log(data)
        base.commonAjax('clav/lishiReplace/updateClavLishiReplace', data, function (data) {
            if (data.code == 1) {
                $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6").css("display", "none");
                lishicheck();
                alert('操作成功')
            }else{
                alert(data.message)
            }
        })

    })
}
// $(document).on('click', '.lis_notongg', function () {
//     // console.log(id);
//     var lis_notongg = $(this).attr('id').replace("li_no", "");
//     $(".cover6").css("display", "inline-block");
//     $("#li_tinotg").on('click', function () {
//         var noid = lis_notongg;
//         var aduitStatus = 3;
//         var data = {
//             id: noid,
//             aduitStatus: aduitStatus,
//         }
//         //console.log(data)
//         base.commonAjax('clav/lishiReplace/updateClavLishiReplace', data, function (data) {
//             if (data.code == 1) {
//                 $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6").css("display", "none");
//                 lishicheck();
//             }
//         })

//     })
// })
//会员单位审核
function huiyuancheck() {
    var status = 0;
    var data = {
        status: status
    }
    base.commonAjax('clav/memberUnit/getClavMemberUnitList', data, function (data) {
        //console.log(data)
        var pagedata = [];
        // 
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
                    document.getElementById('vipdutysh').innerHTML = function () {
                        var arr = []
                            , thisData = pagedata.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function (index, item) {

                            // console.log(item)
                            arr.push(auto(index, item));
                            //console.log(item);

                        });
                        return arr.join('');
                    }();
                }
            });
        });
    })
}
huiyuancheck();
function auto(index, obj) {
    return '<tr>' +
        '<td style="width: 50px">' +
        '<input type="checkbox" name="" title="" lay-skin="primary">' +
        '</td>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + (obj.createTime).split(/\s+/)[0] + '</td>' +
        '<td>' + obj.unitName + '</td>' +
        '<td>' +

        '<button id="' + 'find' + obj.id + '"  type="button" class="layui-btn find">查看</button>' +

        '<a>' +
        '<button id="' + 'but' + obj.id + '" type="button" class="layui-btn layui-btn-normal but" onclick="but_z('+obj.id+')">通过</button>' +
        '</a>' +
        '<a>' +
        '<button id="' + 'no' + obj.id + '" type="button" class="layui-btn layui-btn-danger no" onclick="no_z('+obj.id+')">不通过</button>' +
        '</a>' +
        '<a href="http://39.98.186.243/clav/memberUnit/downloadRAR?ids=' + obj.id + '" download="">' +
        '<button id="' + 'download' + obj.id + '" type="button" class="layui-btn layui-btn-warm">下载</button>' +
        '</a>' +
        '</td>' +
        '</tr>'
}
function auto2(index, obj) {
    return '<tr>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + (obj.createTime).split(/\s+/)[0] + '</td>' +
        '<td>' + obj.unit + '</td>' +
        '<td>' + obj.oname + '</td>' +
        '<td>' + obj.oduty + '</td>' +
        '<td>' + obj.nname + '</td>' +
        '<td>' + obj.nduty + '</td>' +
        '<td>' +
        '<button id="' + 'li_find' + obj.id + '"class="layui-btn lis_find">查看</button>' +
        '<a><button id="' + 'li_tong' + obj.id + '"class="layui-btn layui-btn-normal lis_tongg" onclick="li_tong('+obj.id+')">通过</button></a>' +
        '<a><button id="' + 'li_no' + obj.id + '"class="layui-btn layui-btn-danger lis_notongg" onclick="li_no('+obj.id+')">不通过</button></a>' +
        '</td>' +
        '</tr>'
}
function auto3(index, obj) {
    return '<tr>' +
        '<td style="width: 50px">' +
        '<input type="checkbox" name="" title="" lay-skin="primary" class="s" value="'+ obj.id+'">' +
        '</td>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + obj.createBy + '</td>' +
        '<td>' + obj.recommendType + '</td>' +
        '<td>' + obj.name + '</td>' +
        '<td>' + obj.unitAndDuty + '</td>' +
        '<td>' + obj.artStr + '</td>' +
        '<td>' + obj.relationshipGroup + '</td>' +
        '<td>' +
        '<button id="' + 'vipb_find' + obj.id + '" class="layui-btn vipb_find">查看</button>' +
        '<a><button id="' + 'vipb_tg' + obj.id + '"class="layui-btn layui-btn-normal vipb_tg" onclick="vipb_tg('+ obj.id+')">通过</button></a>' +
        '<a><button id="' + 'vipb_remove' + obj.id + '"class="layui-btn layui-btn-warm vipb_remove" onclick="vipb_r('+ obj.id+')">转人才库</button></a>' +
        '</td>' +
        '</tr>'
}
$(document).on('click', '.find', function () {
    //console.log($(this).attr('id').replace("find",""));
    $(".cover3").css("display", "inline-block");
    var findid = $(this).attr('id').replace("find", "");
    var data = {
        id: findid
    }
    base.commonAjax('clav/memberUnit/checkClavMemberUnit', data, function (data) {
        if (data.code == 1) {
            console.log(data)
            $(".findfile").empty();
            $('.findfile').append(
                '<a href="' + data.data.applicationBook + '" download="申请书">' +
                '<div class="wj">申请书</div>' +
                '</a>' +
                '<a href="' + data.data.associationRule + '" download="协会章程">' +
                '<div class="wj">协会章程</div>' +
                '</a>' +
                '<a href="' + data.data.unitSituation + '" download="单位情况介绍">' +
                '<div class="wj" >单位情况介绍</div>' +
                '</a>' +
                '<a href="' + data.data.aptitudeProve + '" download="资质证明">' +
                '<div class="wj">资质证明</div>' +
                '</a>'
            );
        }
    })
})
// $(document).on('click', '.but', function () {
//     var butid = $(this).attr('id').replace("but", "");
//     //console.log (butid)
//     $(".cover1").css("display", "inline-block");
//     $("#titg").on('click', function () {
//         if ($("#upLoad").val() == '') {
//             alert("请选择上传文件")
//             return false;
//         } else {
//             var file = $("#upLoad")[0].files[0];
//             var formData = new FormData();
//             formData.append("file", file);
//             $.ajax({
//                 type: "post",
//                 url: base.baseurl + 'clav/upload/uploadFile',
//                 data: formData,
//                 cache: false,
//                 processData: false,
//                 contentType: false,
//                 success: function (data, textStatus, jqXHR) {
//                     if (data.code == 1) {
//                         //console.log(data);
//                         var yesid = butid;
//                         var status = 1;
//                         var reply = data.data[0].url;
//                         var data = {
//                             id: yesid,
//                             status: status,
//                             reply: reply
//                         }
//                         // console.log(data)
//                         base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
//                             if (data.code == 1) {
//                                 $(".cover1,.cover2").css("display", "none");
//                                 huiyuancheck();
//                                 alert('操作成功');
//                             }
//                         })
//                     }
//                 }
//             })
//         }
//     })
// })
//会员单位通过
function but_z(butzid){
    var butid = butzid;
    //console.log (butid)
    $(".cover1").css("display", "inline-block");
    $("#titg").on('click', function () {
        if ($("#upLoad").val() == '') {
            alert("请选择上传文件")
            return false;
        } 
        
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
                        var yesid = butid;
                        var status = 1;
                        var reply = data.data[0].url;
                        var data = {
                            id: yesid,
                            status: status,
                            reply: reply
                        }
                         console.log(data)
                        base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
                            if (data.code == 1) {
                                $(".cover1,.cover2").css("display", "none");
                                huiyuancheck();
                                alert('操作成功');
                            }else{
                                alert(data.message);
                            }
                        })
                    }
                    else{
                        alert(data.message);
                    }
                }
            })
        
    })
}
//会员单位不通过
function no_z(nooid){
    var no2id = nooid;
    $(".cover2").css("display", "inline-block");
    $("#tibtg").on('click', function () {
        if ($("#reply").val() == '') {
            alert("请输入回复理由")
            return false
        } else {
            var noid = no2id;
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
                    huiyuancheck();
                    alert('操作成功');
                }
                else{
                    alert(data.message);
                }
            })
        }

    })
}
// $(document).on('click', '.no', function () {
//     // console.log(id);
//     var no2id = $(this).attr('id').replace("no", "");
//     $(".cover2").css("display", "inline-block");
//     $("#tibtg").on('click', function () {
//         if ($("#reply").val() == '') {
//             alert("请输入回复理由")
//             return false
//         } else {
//             var noid = no2id;
//             var status = 2;
//             var reply = $("#reply").val();
//             var data = {
//                 id: noid,
//                 status: status,
//                 reply: reply
//             }
//             console.log(data)
//             base.commonAjax('clav/memberUnit/updateClavMemberUnit', data, function (data) {
//                 if (data.code == 1) {
//                     $(".cover1,.cover2").css("display", "none");
//                     huiyuancheck();
//                     alert('操作成功');
//                 }
//             })
//         }

//     })
// })
$(document).on('click', '.vipb_find', function () {
    //console.log($(this).attr('id').replace("find",""));
    $(".cover7").css("display", "inline-block");
    var vipb_find = $(this).attr('id').replace("vipb_find", "");
    var data = {
        id: vipb_find
    }
    base.commonAjax('clav/member/chakanClavMember', data, function (data) {
        if (data.code == 1) {
            console.log(data)
            $(".vipb_file").empty();
            $('.vipb_file').append(
                '<a href="' + data.data.uploadFile + '"download="会员上传文件" >' +
                '<div class="wj">会员上传文件</div>' +
                '</a>'
            );
        }
    })
})
// $(document).on('click', '.vipb_tg', function () {
//     //console.log($(this).attr('id').replace("find",""));
//     $(".cover8").css("display", "inline-block");
//     var vipb_tg = $(this).attr('id').replace("vipb_tg", "");
//     var data = {
//         ids: vipb_tg
//     }
//     $(document).on('click', '#vipb_titg', function () {
//         console.log(data)
//         base.commonAjax('clav/member/shenheMember', data, function (data) {
//             if (data.code == 1) {
//                 vipdutyshenh();
//                 $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6,.cover7,.cover8").css("display", "none");
//                 alert('操作成功')
//             }
//         })
//     })
// })
function vipb_tg(tbid){
    $(".cover8").css("display", "inline-block");
    var vipb_tg = tbid;
    var data = {
        ids: vipb_tg
    }
    $(document).on('click', '#vipb_titg', function () {
        console.log(data)
        base.commonAjax('clav/member/shenheMember', data, function (data) {
            if (data.code == 1) {
                vipdutyshenh();
                $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6,.cover7,.cover8").css("display", "none");
                alert('操作成功')
            }
            else{
                alert(data.message)
            }
        })
    })
}
// $(document).on('click', '.vipb_remove', function () {
//     //console.log($(this).attr('id').replace("find",""));
//     $(".cover9").css("display", "inline-block");
//     var vipb_remove = $(this).attr('id').replace("vipb_remove", "");
//     var data = {
//         id: vipb_remove
//     }
//     $(document).on('click', '#vipb_rck', function () {
//         console.log(data)
//         base.commonAjax('clav/member/yichuClavMember', data, function (data) {
//             if (data.code == 1) {
//                 vipdutyshenh();
//                 $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6,.cover7,.cover8,.cover9").css("display", "none");
//                 alert('操作成功')
//             }
//         })
//     })
// })
function vipb_r(rbid){
    $(".cover9").css("display", "inline-block");
    var vipb_remove = rbid;
    var data = {
        id: vipb_remove
    }
    $(document).on('click', '#vipb_rck', function () {
        console.log(data)
        base.commonAjax('clav/member/yichuClavMember', data, function (data) {
            if (data.code == 1) {
                vipdutyshenh();
                $(".cover1,.cover2,.cover3,.cover4,.cover5,.cover6,.cover7,.cover8,.cover9").css("display", "none");
                alert('操作成功')
            }else{
                alert(data.message)
            }
        })
    })
}
