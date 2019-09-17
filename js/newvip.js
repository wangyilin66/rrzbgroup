layui.use('form', function(){
          var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
//政治面貌
var data = {
}
base.commonAjax('clav/politicsStatus/getClavPoliticsStatusList', data, function (data) {
        if (data.code == 1) {
                for (var i = 0; i < data.data.length; i++) {
                        $('#politicsStatusId').append(
                                '<option value="' + data.data[i].id + '">' + data.data[i].politicsStatus + '</option>'
                        );
                }
                form.render();
        }
});
//民族

base.commonAjax('clav/nation/getClavNationList', data, function (data) {
        if (data.code == 1) {
                for (var i = 0; i < data.data.length; i++) {
                        $('#mz3').append(
                                '<option value="' + data.data[i].id + '">' + data.data[i].nation + '</option>'
                        );
                }
                form.render();
        }
});

//籍贯

base.commonAjax('clav/area/getProvinceList', data, function (data) {
        if (data.code == 1) {
                for (var i = 0; i < data.data.length; i++) {
                        $('#jg').append(
                                '<option value="' + data.data[i].id + '">' + data.data[i].areaName + '</option>'
                        );
                }
                form.render();
        }
});


//文化程度

base.commonAjax('clav/educationLevel/getClavEducationLevelList', data, function (data) {
        if (data.code == 1) {
                for (var i = 0; i < data.data.length; i++) {
                        $('#whcd').append(
                                '<option value="' + data.data[i].id + '">' + data.data[i].educationLevel + '</option>'
                        );
                }
                form.render();
        }
});

//艺术门类

base.commonAjax('clav/artType/getClavArtTypeList', data, function (data) {
        if (data.code == 1) {
                let str = '';
                for (var i = 0; i < data.data.length; i++) {
                        // $('#ysml').append(
                        str += '<option value="' + data.data[i].id + '">' + data.data[i].artType + '</option>';
                }
                $('#ysml').append(str);
                form.render();
        }
});

//专业职称
base.commonAjax('clav/professionalTitle/getClavProfessionalTitleList', data, function (data) {
        if (data.code == 1) {
                let str2 = '';
                for (var i = 0; i < data.data.length; i++) {
                        str2 += '<option value="' + data.data[i].id + '">' + data.data[i].professionalTitle + '</option>';
                }
                $('#zyzc').append(str2);
                form.render();
        }
});

          
          //……
          
          //但是，如果你的HTML是动态生成的，自动渲染就会失效
          //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();
     
        });
//身份证信息
function sexfind() {
        var idNumber = $('#sfnumber').val();
        var data = {
                idNumber: idNumber
        }
        base.commonAjax('clav/idNumber/checkIdNumberAndReturnInfo', data, function (data) {
                if (data.code == 1) {
                        $('#sex').val('' + data.gender + '');
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
                        $('#sr').val('' + data.birthDay + '');
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
                                var location = $('#szd').val();//所在地
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
                                var recommendType = $('#tjtype').val();//推荐类型
                                var relationshipGroup = $('#tjcompany').val();//关联组织
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
                                                alert('成功');
                                        }
                                })
                        }
                }
        })
}  