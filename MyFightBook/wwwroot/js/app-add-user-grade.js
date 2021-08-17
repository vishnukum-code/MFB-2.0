var addGrade = function () {
    var init = function () {
        var isSuccess = $("#isSuccess").val();
        if (!isSuccess) {
            $("#gradeUserSubmit").removeAttr("disabled");
        }
        bindFn();
        var federationid = $("#FederationId").val();
        filterusergrade();
        submitCall();
    },
        bindFn = function () {
            $('#FederationId').on('change',
                function (e) {
                    var _this = this;
                    var selectedValue = $(_this).val();
                    fetchGradeUsers(selectedValue);
                });
        },
        filterusergrade = function () {
            var federationid = $("#FederationId").val();
            var gradeId = $("#GradeId").val();
            if (federationid != '' && federationid != 0 && gradeId == 0) {
                fetchGradeUsers(federationid);
            }
        },
        fetchGradeUsers = function (federationId) {
            app.showLoader();
            $("#UserId").html('');
            $('#GradeId').html('');
            $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/grades/getGradeUserByFederationId',
                data: { federationId: federationId },
                success: function (data) {
                    var itemsusers = '<option>Select a user</option>';
                    var itemsgrades = '<option>Select a grade</option>';
                    $.each(data.userlist, function (i, user) {
                        itemsusers += "<option value='" + user.id + "'>" + user.name + "</option>";
                    });

                    $('#UserId').html(itemsusers);
                    if (data.userlist.length > 0) {
                        $('#UserId').removeAttr('disabled');
                        $('#gradeUserSubmit').removeAttr('disabled');
                        //$('.messageclass').hide();
                    } else {
                        console.log(data.userlist.length);
                        $('#UserId').attr('disabled', 'disabled');
                        $('#gradeUserSubmit').attr('disabled', 'disabled');
                        //$('.messageclass').show();
                    }

                    $.each(data.gradelist, function (i, grade) {
                        itemsgrades += "<option value='" + grade.id + "'>" + grade.name + "</option>";
                    });
                    $('#GradeId').html(itemsgrades);
                    if (data.gradelist.length > 0) {
                        $('#GradeId').removeAttr('disabled');
                        $('#gradeUserSubmit').removeAttr('disabled');
                        //$('.messageclass').hide();
                    } else {
                        $('#GradeId').attr('disabled', 'disabled');
                        $('#gradeUserSubmit').attr('disabled', 'disabled');
                        //$('.messageclass').show();
                    }
                    if (data.gradelist.length <= 0 || data.userlist.length <= 0) {
                        $('#gradeUserSubmit').attr('disabled', 'disabled');
                        //$('.messageclass').show();
                    }
                    app.hideLoader();
                },
                error: function () {
                    console.error('Could not fetch data: ' + federationId);
                    app.hideLoader();
                }
            });
        },
        submitCall = function () {
            $("#gradeUserSubmit").click(function () {
                var federationid = $("#FederationId").val();
                var gradeId = $("#GradeId").val();
                var userId = $("#UserId").val();
                var assigndate = $("#AssignDate").val();
                //$("#UserId-error").remove();
                //$("#GradeId-error").remove();
                if ($("#FederationId").val() === '' || $("#FederationId").val() === null) {
                    $("#FederationId").parent().find(".select2.select2-container .selection .select2-selection").addClass("input-validation-error");
                    //$("#UserId").parent().append("<span class='field-validation-error' data-valmsg-for='UserId' data-valmsg-replace='true'><span id='UserId-error'>Please select user</span></span>");
                }
                else {
                    //$("#UserId-error").remove();
                    $("#FederationId").parent().find(".select2.select2-container .selection .select2-selection").removeClass("input-validation-error");
                }

                if ($("#UserId").val() === '' || $("#UserId").val() === null || $("#UserId").val() === 'Select a user') {
                    $("#UserId").parent().find(".select2.select2-container .selection .select2-selection").addClass("input-validation-error");
                }
                else {
                    $("#UserId").parent().find(".select2.select2-container .selection .select2-selection").removeClass("input-validation-error");
                }

                if ($("#GradeId").val() === '' || $("#GradeId").val() === null || $("#GradeId").val() === 'Select a grade' ) {
                    $("#GradeId").parent().find(".select2.select2-container .selection .select2-selection").addClass("input-validation-error");
                }
                else {
                    $("#GradeId").parent().find(".select2.select2-container .selection .select2-selection").removeClass("input-validation-error");
                }

                if ($("#AssignDate").val() === '' || $("#AssignDate").val() === null) {
                    $("#AssignDate").addClass("input-validation-error");
                }
                else {
                    $("#AssignDate").removeClass("input-validation-error");
                }
                
                if (federationid != '' && userId != '' && gradeId != '' && userId != 'Select a user' && gradeId != 'Select a grade' && assigndate != '') {
                    $("#gradeUserSubmit").attr('disabled', 'disabled');
                    $("#gradeUserSubmitBtn").click();
                }
            });
        };

    return {
        init: init
    };
}();