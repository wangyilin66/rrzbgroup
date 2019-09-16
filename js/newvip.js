$(function () {
        //地区
    //     function diqu() {
    //         var data = {
    //         }

    // }
    // diqu();
    //所在地——市
//var id = $('#provinceid option:selected').val();
    //文化程度
    function wenhuacd() {
            var data = {
            }
            base.commonAjax('clav/educationLevel/getClavEducationLevelList', data, function (data) {
                    if (data.code == 1) {                                
                            for (var i = 0; i < data.data.length; i++) {
                                    $('#whcd').append(
                                            '<option value="' + data.data[i].id + '">' + data.data[i].educationLevel + '</option>'
                                    );
                            }
                    }
            });
    }
    wenhuacd();
    //专业职称
    function zyzc() {
        var data = {
        }
        base.commonAjax('clav/professionalTitle/getClavProfessionalTitleList', data, function (data) {
                if (data.code == 1) {                                
                        for (var i = 0; i < data.data.length; i++) {
                                $('#zyzc').append(
                                        '<option value="' + data.data[i].id + '">' + data.data[i].professionalTitle + '</option>'
                                );
                        }
                }
        });
}
zyzc();
 //艺术门类
 function ysml() {
    var data = {
    }
    base.commonAjax('clav/artType/getClavArtTypeList', data, function (data) {
            if (data.code == 1) {                                
                    for (var i = 0; i < data.data.length; i++) {
                            $('#ysml').append(
                                    '<option value="' + data.data[i].id + '">' + data.data[i].artType + '</option>'
                            );
                    }
            }
    });
}
ysml();
 //籍贯
 function jg() {
    var data = {
    }
    base.commonAjax('clav/area/getProvinceList', data, function (data) {
            if (data.code == 1) {                                
                    for (var i = 0; i < data.data.length; i++) {
                            $('#jg').append(
                                    '<option value="' + data.data[i].id + '">' + data.data[i].areaName + '</option>'
                            );
                    }
            }
    });
}
jg();
})
//身份证信息
function sexfind() {
    var idNumber = $('#sfnumber').val();
    var data = {
        idNumber: idNumber
    }
    base.commonAjax('clav/idNumber/checkIdNumberAndReturnInfo', data, function (data) {
        if (data.code == 1) {
            $('#sex').val(''+data.gender+'');
        }
    });
}
function birthfind() {
    var idNumber = $('#sfnumber').val();
    var data = {
        idNumber: idNumber
    }
    base.commonAjax('clav/idNumber/checkIdNumberAndReturnInfo', data, function (data) {
        if (data.code == 1) {
            $('#sr').val(''+data.birthDay+'');
        }
    });
}
//提交
function tijiao() {
    var file = $("#file")[0].files[0];
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
                //	console.log("上传图片成功")
                //var img =data.file;
                var name = $('#username').val();//姓名
                var nation = $('#sfnumber').val();//民族
                var gender = $('#sex').val();//性别
                var birthday = $('#sr').val();//出生日期
                var idNumber = $('#sfnumber').val();//身份证号
                var nativePlace = $('#jg option:selected').val();//籍贯
                var politicsStatusId = $('#politicsStatusId option:selected').val();//政治面貌
                var isNewGroup = $('input[name="sex"]:checked').attr("data");//是否新文艺群体
                var phone = $('#tec').val();//手机号
                var avatar = data.file;//头像
                var penName = $('#username2').val();//笔名
                var location = $('#').val();//所在地
                var postalAddress = $('#place').val();//通讯地址
                var postcode = $('#placenum').val();//邮编
                var officePhone = $('#bgtec').val();//办公电话
                var email = $('#email').val();//邮箱
                var wechatNumber = $('#weixinnum').val();//微信号
                var educationLevelId = $('#whcd option:selected').val();//文化程度
                var professionalTitleId = $('#zyzc option:selected').val();//专业职称
                var unitAndDuty = $('#work').val();//工作单位
                var workExperience = $('#experience').val();//工作经历
                var graduateSchool = $('#school').val();//毕业院校
                var associationDuty = $('#qgwork').val();//全国职务
                var socialDuty = $('#qtwork').val();//其他职务
                var artTypeId = $('#ysml option:selected').val();//艺术门类
                var specificAreas = $('#genre').val();//具体领域
                var activityExperience = $('#experience2').val();//文艺或公益经历
                var recommendType = $('#').val();//推荐类型
                var relationshipGroup = $('#').val();//关联组织
                var linkman = $('#lxpeople').val();//联系人
                var linkmanPhone = $('#sjh').val();//联系人电话
                var data = {
                    name: name,
                    nation: nation,
                    gender: gender,
                    birthday: birthday,
                    idNumber: idNumber,
                    nativePlace: nativePlace,
                    politicsStatusId: politicsStatusId,
                    isNewGroup: isNewGroup,
                    phone: phone,
                    avatar: avatar,
                    penName: penName,
                    location: location,
                    postalAddress: postalAddress,
                    postcode: postcode,
                    officePhone: officePhone,
                    email: email,
                    wechatNumber: wechatNumber,
                    educationLevelId: educationLevelId,
                    professionalTitleId: professionalTitleId,
                    unitAndDuty: unitAndDuty,
                    workExperience: workExperience,
                    graduateSchool: graduateSchool,
                    associationDuty: associationDuty,
                    socialDuty: socialDuty,
                    artTypeId: artTypeId,
                    specificAreas: specificAreas,
                    activityExperience: activityExperience,
                    recommendType: recommendType,
                    relationshipGroup: relationshipGroup,
                    linkman: linkman,
                    linkmanPhone: linkmanPhone
                }
                console.log(data);
                base.commonAjax('clav/member/addClavMember', data, function (data) {
                    if (data.code == 1) {
                        console.log('成功');
                    }
                })
            }
        }
    })
}  

//所在地——市
function areafind() {
    var id = $('#cityid option:selected').val();
    var data={
        id: id
    }
    base.commonAjax('clav/area/getAreaList', data, function (data) {
        if(data.code==1){
            for (var i = 0; i < data.data.length; i++) {
                $('#areaid').append(
                        '<option value="' + data.data[i].id + '">' + data.data[i].areaName + '</option>'
                );
            }    
        }  
    })
}