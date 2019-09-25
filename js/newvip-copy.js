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
                let str2 = '';
                for (var i = 0; i < data.data.length; i++) {
                        // $('#ysml').append(
                        str += '<option value="' + data.data[i].id + '">' + data.data[i].artType + '</option>';
                        str2 += '<option value="' + data.data[i].id + '">' + data.data[i].artType + '</option>';
                }
                $('#ysml').append(str);
                $('#ysml2').append(str2);
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
        console.log(tjcompany);
   
        if( $('#file').val()==''){
                $('.w_tx').text('请上传头像')          
        }
        if( $('#username').val()==''){
                $('.w_xm').text('请填写姓名')              
        }
        if( $('#sfnumber').val()==''){
                $('.w_sf').text('请填写身份证号')          
        }
        if( $('#sex').val()==''){
                $('.w_xb').text('请获取性别')              
        }
        if( $('#tec').val()==''){
                $('.w_sj').text('请填写手机号码')          
        }
        if( $('#politicsStatusId').val()==''){
                $('.w_zz').text('请选择政治面貌')              
        }
        if( $('#mz3').val()==''){
                $('.w_mz').text('请选择民族')              
        }
        if( $('#sr').val()==''){
                $('.w_sr').text('请获取出生日期')          
        }
        if( $('#jg').val()==''){
                $('.w_jg').text('请选择籍贯')              
        }
        if( $('#szd').val()==''){
                $('.w_sz').text('请填写现所在地')          
        }
        if( $('#place').val()==''){
                $('.w_tx2').text('请填写通讯地址')              
        }
        if( $('#placenum').val()==''){
                $('.w_yb').text('请填写通讯邮编')          
        }
        if( $('#whcd').val()==''){
                $('.w_wh').text('请选择文化程度')              
        }
        if( $('#zyzc').val()==''){
                $('.w_zc').text('请选择专业职称')              
        }
        if( $('#work').val()==''){
                $('.w_gzdw').text('请填写工作单位及职务')          
        }
        if( $('#experience').val()==''){
                $('.w_jl').text('请填写工作经历（艺术简历）')              
        }
        if( $('#ysml').val()==''){
                $('.w_yis').text('请选择主要从事的艺术门类')          
        }
        if( $('#experience2').val()==''){
                $('.w_gyhd').text('请填写文艺志愿服务或公益活动经历')              
        }
        if( $('#tjtype').val()==''){
                $('.w_lx').text('请选择推荐类型')          
        }
        if( $('#tjcompany').val()==''){
                $('.w_tjdw').text('请选择推荐单位/人')              
        }
        if( $('#lxpeople').val()==''){
                $('.w_lxr').text('请填写联系人')          
        }
        if( $('#sjh').val()==''){
                $('.w_sjh').text('请填写手机号')          
        }else{
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
                                //console.log(data.data[0].url)
                                var name = $('#username').val();//姓名
                                var nation = mz3;//民族
                                if($('#sex').val()=='男'){
                                        var gender = 1
                                };//性别
                                if($('#sex').val()=='女'){
                                        var gender = 2
                                };//性别
                                var birthday = $('#sr').val();//出生日期
                                var idNumber = $('#sfnumber').val();//身份证号
                                var nativePlace = jg;//籍贯
                                var politicsStatusId = politicsStatusIdd;//政治面貌
                                var isNewGroup = $('input[name="sex"]:checked').attr("data");//是否新文艺群体
                                var phone = $('#tec').val();//手机号
                                var avatar = data.data[0].url;//头像
                                var penName = $('#username2').val();//笔名
                                var location = $('#szd').val();//所在地
                                var postalAddress = $('#place').val();//通讯地址
                                var postcode = $('#placenum').val();//邮编
                                var officePhone = $('#bgtec').val();//办公电话
                                var email = $('#email').val();//邮箱
                                var wechatNumber = $('#weixinnum').val();//微信号
                                var educationLevelId = whcd;//文化程度
                                var professionalTitleId = zyzc;//专业职称
                                var unitAndDuty = $('#work').val();//工作单位
                                var workExperience = $('#experience').val();//工作经历
                                var graduateSchool = $('#school').val();//毕业院校
                                var associationDuty = $('#qgwork').val();//全国职务
                                var socialDuty = $('#qtwork').val();//其他职务
                                var artTypeId21 = ysml;//艺术门类
                                var artTypeId22 = ysml2;//艺术门类
                                var specificAreas21 = $('#genre').val();//具体领域
                                var specificAreas22 = $('#genre2').val();//具体领域2
                                var activityExperience = $('#experience2').val();//文艺或公益经历
                                var recommendType = $('#tjtype').val();//推荐类型
                                var relationshipGroup = tjcompany;//关联组织
                                var linkman = $('#lxpeople').val();//联系人
                                var linkmanPhone = $('#sjh').val();//联系人电话
                                var orgIdentityId=9
                                //var artTypeId=artTypeId+'-'+specificAreas;
                                //var specific_areas;
                                if($('#ysml2').val()!=''){
                                        artTypeId=artTypeId21+','+artTypeId22+',';
                                        specificAreas=artTypeId21+'-'+specificAreas21+','+artTypeId22+'-'+specificAreas22;
                                }if($('#ysml2').val()==''){
                                        artTypeId=artTypeId21+',';
                                        specificAreas=artTypeId21+'-'+specificAreas21;
                                }                             
                                var data = {
                                        orgIdentityId:orgIdentityId,
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
                                        // art_type_id:art_type_id,
                                        // specific_areas:specific_areas,
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
                                                alert('注册成功。');
                                                history.go(0);
                                                //window.location.href='./vipfind_z.html'
                                        }
                                        else{
                                                alert(data.message)
                                        }
                                })
                        }
                }
        })
}
}  