var clubMembersList = function () {
    var isSelectAllPlans = false;
    const isTestRights = parseInt($("#IsTestRights").val()) === 1;
    const isMatchMaker = parseInt($("#IsMatchMaker").val()) === 1;
    const isCheckedDeleted = parseInt($("#IsCheckedDeleted").val()) === 1;
    const isChecked = parseInt($("#IsChecked").val()) === 1;
    const clubName = $("#ClubName").val();
    const weightClassList = $("#WeightClassIdsJson").val();
    const fightClassList = $("#FightClassIdsJson").val();
    var currentRequest = null;

    var init = function () {
        $("#PageNumber").val(1);
        bindFx();
        pagingFunction();
        pagingFunctionForAWAITINGUsers();
    },
        bindFx = function () {
            $(window).load(function () {
                $('body').addClass('membership-table-dropdown');
            });

            $('#statusselectId').selectpicker({
                noneSelectedText: "Subscription Status / All",
                liveSearch: true,
                hideDisabled: true,
                actionsBox: true,
                virtualScroll: false,
                container: 'body',
                title: "Subscription Status / All"
            });

            $('#PlanId').selectpicker({
                noneSelectedText: "Select Plan",
                liveSearch: true,
                hideDisabled: true,
                actionsBox: true,
                virtualScroll: false,
                container: 'body',
                title: "Select Plan"
            });

            $(".form-group").on("shown.bs.dropdown", function (e) {
                app.applyNiceScroll($('body').find(".dropdown-menu > .inner"));
            });

            $("#filterdetailsid").hide();

            $("#CancelId").click(function () {
                app.showLoader();
                $("#filterdetailsid").hide();
                var cancelfilter = true;
                var clubId = $('#hdnClubId').val();
                var fdata = new FormData();
                fdata.append("ClubId", clubId);
                fdata.append("Cancelfilter", cancelfilter);
                fdata.append("IsTestRights", isTestRights);
                fdata.append("IsMatchMaker", isMatchMaker);
                fdata.append("IsCheckedDeleted", isCheckedDeleted);
                fdata.append("IsChecked", isChecked);
                fdata.append("IsCheckedDeleted", clubName);
                fdata.append("WeightClassJson", weightClassList);
                fdata.append("FightClassJson", fightClassList);

                currentRequest = $.ajax({
                    type: "POST",
                    url: "/clubs/" + clubId + "/memberships/filtermembership",
                    contentType: false,
                    processData: false,
                    data: fdata,
                    success: function (data) {
                        app.hideLoader();
                        $("#filterusers").html(data);

                        $("#statusselectId").selectpicker("deselectAll");
                        $("#PlanId").selectpicker("deselectAll");

                        if ($("#chkallusers").prop("checked")) {
                            $("#mytable-desktop tbody .chkparticularusers").prop("checked", true);
                        }

                        bindTable();
                    },
                    error: function () {
                        app.hideLoader();
                    }
                });
            });

            $("#PlanId").on("changed.bs.select", function (e, clickedIndex, isSelected, previousValue) {
                isSelectAllPlans = false;
                if (clickedIndex == null && isSelected == null) {
                    var selectedItems = ($(this).selectpicker("val") || []).length;
                    var allItems = $(this).find("option:not([disabled])").length;
                    if (selectedItems == allItems) {
                        isSelectAllPlans = true;
                    }
                }
            });

            $("#SearchId").click(function () {
                $("#flag").val(0);
                var mailsearch = $("#mailsearchid").val();
                var selectedstatus = $("#statusselectId").val() != null ? $("#statusselectId").val().toString() : "";
                var clubId = $('#hdnClubId').val();
                var planId = $('#PlanId').val() != null ? $('#PlanId').val().toString() : "";
                var pageSize = $("#PageSize").val();
                var fdata = new FormData();
                fdata.append('StatusType', selectedstatus);
                fdata.append('ClubId', clubId);
                fdata.append('EmailType', mailsearch);
                fdata.append('planId', planId);
                fdata.append('PageSize', pageSize);
                fdata.append('PageNumber', 1);
                fdata.append('IsSelectAllPlans', isSelectAllPlans);
                fdata.append("IsTestRights", isTestRights);
                fdata.append("IsMatchMaker", isMatchMaker);
                fdata.append("IsCheckedDeleted", isCheckedDeleted);
                fdata.append("IsChecked", isChecked);
                fdata.append("IsCheckedDeleted", clubName);
                fdata.append("WeightClassJson", weightClassList);
                fdata.append("FightClassJson", fightClassList);

                app.showLoader();
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/clubs/" + clubId + "/memberships/filtermembership",
                    contentType: false,
                    processData: false,
                    data: fdata,
                    success: function (data) {
                        //Table Binding
                        $("#mytable-desktop tbody").html($(data).find("#mytable-desktop tbody tr"));
                        $(".memberhsip-mobile tbody").html($(data).find(".memberhsip-mobile tbody tr"));

                        if ($("#chkallusers").prop("checked")) {
                            $("#mytable-desktop tbody .chkparticularusers").prop("checked", true);
                        }

                        if ($(data).find(".memberhsip-mobile tbody tr").length > 5) {
                            $(".main-section .right-section .table-section .table-content .table-main-sec .btn-center a").show();
                        }
                        $("#PageNumber").val(2);
                        $.responsiveTables();
                        app.hideLoader();
                        bindTable();
                        if ($(data).find("#hdnLoadMore").val() != 0) {
                            pagingFunction();
                        }
                    },
                    error: function () {
                        app.showLoader();
                    }
                });
            });

            searchText = function (flag) {
                if (currentRequest != null) {
                    currentRequest.abort();
                    currentRequest = null;
                }

                $("#flag").val(1);
                $("#flag-mobile-input").val(flag);
                var clubId = $('#hdnClubId').val();
                if (flag == 0) {
                    var searchText = $(".search-text-box").val() != null ? $(".search-text-box").val() : "";
                }
                else {
                    var searchText = $("#mobile-search-text-box").val() != null ? $("#mobile-search-text-box").val() : "";
                }
                if (searchText == "") {
                    searchText = $("#mobile-search-text").val() != null ? $("#mobile-search-text").val() : "";
                }
                var pageSize = $("#PageSize").val();
                var fdata = new FormData();
                fdata.append('FullName', searchText);
                fdata.append('PageSize', pageSize);
                fdata.append('PageNumber', 1);
                fdata.append("IsTestRights", isTestRights);
                fdata.append("IsMatchMaker", isMatchMaker);
                fdata.append("IsCheckedDeleted", isCheckedDeleted);
                fdata.append("IsChecked", isChecked);
                fdata.append("IsCheckedDeleted", clubName);
                fdata.append("WeightClassJson", weightClassList);
                fdata.append("FightClassJson", fightClassList);

                var loadRow = "<tr style='display: block;' class='load-more-tr'><td><i class='fa fa-refresh loading--inline-block loading--animate' title='Loading'></i></td ></tr >";

                $("#mytable-desktop tbody").html(loadRow);
                $(".memberhsip-mobile tbody tr").remove();
                $("#UnApproved-Load-More").css("display", "block");
                currentRequest = $.ajax({
                    type: "POST",
                    url: "/clubs/" + clubId + "/memberships/filtermembership",
                    contentType: false,
                    processData: false,
                    data: fdata,
                    beforeSend: function () {
                        //if (currentRequest != null) {
                        //    currentRequest.abort();
                        //    currentRequest = null;
                        //}

                        if (currentRequest != null && currentRequest.readyState < 4) {
                            currentRequest.abort();
                            currentRequest = null;
                        }
                    },
                    success: function (data) {
                        $("#UnApproved-Load-More").css("display", "none");

                        if ($("#flag").val() == 1) {
                            $("#mytable-desktop tbody").html($(data).find("#mytable-desktop tbody tr"));
                            $(".memberhsip-mobile tbody").html($(data).find(".memberhsip-mobile tbody tr"));

                            if ($("#chkallusers").prop("checked")) {
                                $("#mytable-desktop tbody .chkparticularusers").prop("checked", true);
                            }

                            if ($(data).find("#hdnLoadMore").val() == 0) {
                                $(".load-more-tr").css("display", "none");
                            }
                            if ($(data).find(".memberhsip-mobile tbody tr").length > 5) {
                                $(".main-section .right-section .table-section .table-content .table-main-sec .btn-center a").show();
                            }
                            $("#PageNumber").val(2);
                            $.responsiveTables();
                            bindTable();
                            if ($(data).find("#hdnLoadMore").val() != 0) {
                                pagingFunctionForTextBox();
                            }
                        }
                    },
                    error: function (e) {
                        if (e.statusText !== "abort") {
                            $(".load-more-tr td").text("Something seems wrong!!");
                        }
                    }
                });
            }

            $(document.body).on('click', '.load-more-btn', function () {
                pagingFunction();
            });

            bindTable();
        },

        pagingFunction = function () {

            var mailsearch = $("#mailsearchid").val();
            var selectedstatus = $("#statusselectId").val() != null ? $("#statusselectId").val().toString() : "";
            var clubId = $('#hdnClubId').val();
            var planId = $('#PlanId').val() != null ? $('#PlanId').val().toString() : "";
            var pageSize = $("#PageSize").val();
            var pageNumber = $("#PageNumber").val();
            var fdata = new FormData();
            fdata.append('StatusType', selectedstatus);
            fdata.append('ClubId', clubId);
            fdata.append('EmailType', mailsearch);
            fdata.append('planId', planId);
            fdata.append('PageSize', pageSize);
            fdata.append('PageNumber', pageNumber);
            fdata.append('IsSelectAllPlans', isSelectAllPlans);
            fdata.append("IsTestRights", isTestRights);
            fdata.append("IsMatchMaker", isMatchMaker);
            fdata.append("IsCheckedDeleted", isCheckedDeleted);
            fdata.append("IsChecked", isChecked);
            fdata.append("IsCheckedDeleted", clubName);
            fdata.append("WeightClassJson", weightClassList);
            fdata.append("FightClassJson", fightClassList);

            currentRequest = $.ajax({
                type: "POST",
                url: "/clubs/" + clubId + "/memberships/filtermembership",
                contentType: false,
                processData: false,
                data: fdata,
                success: function (data) {
                    if ($("#flag").val() != 1) {
                        $(".load-more-tr").remove();
                        //Binding Table
                        $("#mytable-desktop tbody").append($(data).find("#mytable-desktop tbody tr"));
                        $(".memberhsip-mobile tbody").append($(data).find(".memberhsip-mobile tbody tr"));

                        if ($("#chkallusers").prop("checked")) {
                            $("#mytable-desktop tbody .chkparticularusers").prop("checked", true);
                        }

                        $("#PageNumber").val(parseInt(pageNumber) + parseInt(1));
                        if ($(data).find("#hdnLoadMore").val() == 0) {
                            $(".load-more-tr").css("display", "none");
                        }
                        if ($(data).find(".memberhsip-mobile tbody tr").length > 5) {
                            $(".main-section .right-section .table-section .table-content .table-main-sec .btn-center a").show();
                        }

                        $.responsiveTables();
                        bindTable();
                        if ($(data).find("#hdnLoadMore").val() != 0) {
                            pagingFunction();
                        }
                    }

                },
                error: function () {
                    pagingFunction();
                }
            });
        },

        pagingFunctionForAWAITINGUsers = function () {

            var mailsearch = $("#mailsearchid").val();
            var selectedstatus = $("#statusselectId").val() != null ? $("#statusselectId").val().toString() : "";
            var clubId = $('#hdnClubId').val();
            var planId = $('#PlanId').val() != null ? $('#PlanId').val().toString() : "";
            var pageNumber = $("#UnApprove-PageNumber").val();
            var fdata = new FormData();
            fdata.append('StatusType', selectedstatus);
            fdata.append('ClubId', clubId);
            fdata.append('EmailType', mailsearch);
            fdata.append('planId', planId);
            fdata.append('PageNumber', pageNumber);
            console.log(selectedstatus, planId);
            $.ajax({
                type: "POST",
                url: "/clubs/" + clubId + "/memberships/GetUnnApproved",
                contentType: false,
                processData: false,
                data: fdata,
                success: function (data) {
                    //Binding Data
                    if ($(data).find("#unapporved-members") != "undefind") {
                        $(".accept-decline-block").append($(data).find(".box"));
                    }

                    var updateIds = document.querySelectorAll('.unapproved-Link');
                    for (var i = 0; i < updateIds.length; i++) {
                        updateIds[i].id = 'unapproved-Id_' + i;
                    }


                    $("#UnApprove-PageNumber").val(parseInt(pageNumber) + parseInt(1));
                    if (pageNumber == 1) {
                        window.scrollTo(0, 0);
                    }
                    if ($(data).find("#LoadMoreUnapproved").val() == 0) {
                        $("#unapprove-loader").css("display", "none");
                    }
                    else {
                        pagingFunctionForAWAITINGUsers();
                    }
                },
                error: function () {
                    $("#unapprove-loader").css("display", "none");
                    pagingFunctionForAWAITINGUsers();
                }
            });
        },

        pagingFunctionForTextBox = function () {
            var fdata = new FormData();
            if ($("#flag-mobile-input").val() == 0) {
                var searchText = $(".search-text-box").val() != null ? $(".search-text-box").val() : "";
            }
            else {
                var searchText = $("#mobile-search-text-box").val() != null ? $("#mobile-search-text-box").val() : "";
            }
            fdata.append('FullName', searchText);

            var mailsearch = $("#mailsearchid").val();
            var selectedstatus = $("#statusselectId").val() != null ? $("#statusselectId").val().toString() : "";
            var clubId = $('#hdnClubId').val();
            var planId = $('#PlanId').val() != null ? $('#PlanId').val().toString() : "";
            var pageSize = $("#PageSize").val();
            var pageNumber = $("#PageNumber").val();

            fdata.append('StatusType', selectedstatus);
            fdata.append('ClubId', clubId);
            fdata.append('EmailType', mailsearch);
            fdata.append('planId', planId);
            fdata.append('PageSize', pageSize);
            fdata.append('PageNumber', pageNumber);
            fdata.append('IsSelectAllPlans', isSelectAllPlans);
            fdata.append("IsTestRights", isTestRights);
            fdata.append("IsMatchMaker", isMatchMaker);
            fdata.append("IsCheckedDeleted", isCheckedDeleted);
            fdata.append("IsChecked", isChecked);
            fdata.append("IsCheckedDeleted", clubName);
            fdata.append("WeightClassJson", weightClassList);
            fdata.append("FightClassJson", fightClassList);

            currentRequest = $.ajax({
                type: "POST",
                url: "/clubs/" + clubId + "/memberships/filtermembership",
                contentType: false,
                processData: false,
                data: fdata,
                success: function (data) {
                    $(".load-more-tr").remove();
                    $("#PageNumber").val(parseInt(pageNumber) + parseInt(1));

                    //Table Binding
                    $("#mytable-desktop tbody").append($(data).find("#mytable-desktop tbody tr"));
                    $(".memberhsip-mobile tbody").append($(data).find(".memberhsip-mobile tbody tr"));

                    if ($("#chkallusers").prop("checked")) {
                        $("#mytable-desktop tbody .chkparticularusers").prop("checked", true);
                    }

                    if ($(data).find("#hdnLoadMore").val() == 0) {
                        $(".load-more-tr").css("display", "none");
                    }
                    if ($(data).find(".memberhsip-mobile tbody tr").length > 5) {
                        $(".main-section .right-section .table-section .table-content .table-main-sec .btn-center a").show();
                    }

                    $.responsiveTables();
                    bindTable();

                    if ($(data).find("#hdnLoadMore").val() != 0) {
                        pagingFunctionForTextBox();
                    }
                },
                error: function () {
                    $(".load-more-tr").css("display", "none");
                }
            });
        },

        sendmail = $("#sendmail").click(function () {
            $("#sendmail").attr("disabled", true);
            var email = [];
            var clubId = $("#hdnClubId").val();
            if ($(".memberhsip-mobile").is(":visible")) {
                $(".memberhsip-mobile .chkparticularusers:checked").each(function () {
                    email.push("'" + $(this).parent().find(".membersemail").val() + "'");
                });
            } else {
                $("#mytable-desktop .chkparticularusers:checked").each(function () {
                    email.push("'" + $(this).parent().find(".membersemail").val() + "'");
                });
            }

            var subject = $("#subjectId").val();
            var message = $("#messageid").val();
            var fileUpload = $("#attachmentid").get(0);
            var files = fileUpload.files;
            var fdata = new FormData();
            for (var i = 0; i < files.length; i++) {
                fdata.append(files[i].name, files[i]);
            }
            fdata.append("Subject", subject);
            fdata.append("Message", message);
            fdata.append("Email", email.join(','));
            $("#modalbodypopupId").addClass("loader");
            $("#closeicon").attr("disabled", "disabled");
            if (subject !== "" && message !== "") {
                app.showLoader();
                $.ajax({
                    type: "POST",
                    url: "/clubs/" + clubId + "/memberships/sendemail",
                    contentType: false,
                    processData: false,
                    data: fdata,
                    success: function (result) {
                        if (result === "success") {
                            $("#sendmail").removeAttr("disabled");
                            $("#modalbodypopupId").removeClass("loader");
                            $("#myModalsuccess").modal("hide");
                            $("#subjectId").val("");
                            $("#messageid").val("");
                            $("#attachmentid").val("");
                            $("#closeicon").removeAttr("disabled");
                            $("#chkallusers").prop("checked", false);
                            $(".chkparticularusers").prop("checked", false);
                            alert("Your mail sent successfully.");
                        } else {
                            alert(result);
                        }
                        app.hideLoader();
                    },
                    error: function (result) {
                        $("#sendmail").removeAttr("disabled");
                        $("#modalbodypopupId").removeClass("loader");
                        $("#myModalsuccess").modal("hide");
                        $("#subjectId").val("");
                        $("#messageid").val("");
                        $("#attachmentid").val("");
                        $("#closeicon").removeAttr("disabled");
                        alert(result);
                        app.hideLoader();
                    }
                });
            }
            else {
                $('#modalbodypopupId').removeClass('loader');
                $('#closeicon').removeAttr("disabled");
                alert("Please fill fields subject and message.");
                $("#sendmail").removeAttr("disabled");
            }
        });

    $("#sendselectedbuttonId").click(function () {
        if ($(".memberstable .chkparticularusers:checkbox:checked").length > 0) {
            $("#myModalsuccess").modal('show');
        }
        else {
            alert("Please select atleast one member.");
        }
    });

    bindTable = function () {
        if ($(document).width() < 2101) {
            $('.table-main-sec').scroll(function () {
                $('.table-main-sec table').width($('.table-main-sec').width() + $('.table-main-sec').scrollLeft());
            });
        }
        if ($(document).width() >= 2100.95) {
            $('.table-main-sec tbody').niceScroll({
                cursorwidth: "4px",
                cursorcolor: "#44464a",
                cursorborder: "1px solid #44464a",
                autohidemode: true,
                horizrailenabled: false,
                verticalenabled: true
            });
        }

        $(".memberstable tbody tr td").unbind().click(function () {
            if ($(document).width() < 768 && $(this).index() === 1) {
                var cloestTr = $(this).closest("tr");
                if ($(this).hasClass("content-hide")) {
                    cloestTr.find("td").not(":eq(1)").not(":eq(3)").addClass("hide-in-mobile");
                    $(this).removeClass("content-hide");
                }
                else {
                    cloestTr.find("td").removeClass("hide-in-mobile");
                    $(this).addClass("content-hide");
                }
            }
        });
        $(window).resize(function () {
            if ($(document).width() > 767) {
                $(".hidden").removeClass("hide");
            }
            else {
                $(".hidden").addClass("hide");
            }
        });
        if ($(document).width() > 767) {
            $(".hidden").removeClass("hide");
        }
        else {
            $(".hidden").addClass("hide");
        }
        $(".btn-show-more").unbind().click(function () {
            $('.memberhsip-mobile tbody tr.hidden:lt(5)').removeClass("hidden").removeClass("hide");

            if (!$('.memberhsip-mobile tbody tr').hasClass("hidden")) {
                $(this).hide();
                $(".main-section .right-section .table-section .table-content .table-main-sec .btn-center a").hide();
            }
        });


        $("#myModalsuccess").modal('hide');
        $("#MovePlanPopupId").modal('hide');
        $(".cancelscheduled").hide();
        $("#confirmcancelscheduled").modal('hide');
        $("#mysubscriptionmodal").modal('hide');
        $(".scheduleddate").hide();
        $(".scheduled_text").hide();
        var clubId = $('#hdnClubId').val();
        var memberlist = $('#hdnmemberlist').val();
        $("#chkallusers").unbind().click(function () {
            $('.chkparticularusers').prop('checked', this.checked);
        });
        $("#chkallusersm").unbind().click(function () {
            $('.chkparticularusers').prop('checked', this.checked);
        });

        $("#closeicon").unbind().click(function () {
            $("#myModalsuccess").modal('hide');
            $("#subjectId").val('');
            $("#messageid").val('');
            $("#attachmentid").val('');
        });


        $(".changepasswordclass").unbind().click(function () {
            var userId = $(this).next().val();
            window.location.href = "/clubs/" + clubId + "/memberships/" + userId + "/changePassword";
        });

        //cancel subscription

        $(".subscriptioncancelpop").unbind().click(function () {
            $(".cancelscheduled").hide();
            $(".scheduled_text").hide();
            $(".scheduleddate").hide();
            var userid = $(this).siblings().val();
            var clubId = $("#hdnClubId").val();
            $("#canceluserid").val(userid);
            var fdata = new FormData();
            fdata.append("UserId", userid);
            fdata.append("ClubId", clubId);
            $.ajax({
                type: "POST",
                url: "/clubs/" + clubId + "/memberships/" + userid + "/scheduledcanceled",
                contentType: false,
                processData: false,
                data: fdata,
                success: function (data) {
                    var newDate = new Date();

                    $(".lastMonth").datetimepicker({
                        minDate: newDate,
                        useCurrent: false,
                        format: "L",
                        showTodayButton: true,
                        icons: {
                            next: "fa fa-chevron-right",
                            previous: "fa fa-chevron-left",
                            today: 'todayText'
                        }
                    });

                    $('.scheduleddate').html('');
                    $("#mysubscriptionmodal").modal('show');
                    $(".lastMonth").val(data.setScheduledCanceledDate);
                    console.log(data);
                    if (data.isCanCanceledscheduled == true) {
                        $(".cancelscheduled").show();
                    }
                    if (data.scheduledDate != null && data.isScheduledCanceled == false) {
                        $(".scheduled_text").show();
                        $('.scheduleddate').html('<strong>Subscription is set to be canceled at ' + data.scheduledDate + '</strong>');
                        $('.scheduleddate').show();
                    }
                },
                error: function () {
                    $("#mysubscriptionmodal").modal('show');
                    $(".cancelscheduled").hide();
                }
            });

        });

        $("#closeiconsub").unbind().click(function () {
            $("#mysubscriptionmodal").modal('hide');
            var date = new Date();
            var newDate = new Date(date.getFullYear(), date.getMonth() + 4, date.getDate());
            $('.hiddenLastMonthone').val(newDate.getMonth() + "/" + newDate.getDate() + "/" + newDate.getFullYear());
            $('#rightnow').prop('checked', false); // Unchecks it
            $("#canceldate").show();
            $("#cancellableid").show();
        });

        $('#rightnow').change(function () {
            var checkvalue = $(this).is(':checked');
            if (checkvalue) {
                $("#canceldate").hide();
                $("#cancellableid").hide();
            }
            else {
                $("#canceldate").show();
                $("#cancellableid").show();
            }
        });
        $("#cancelsubscriptionId").unbind().click(function () {
            const $thisClubId = $("#hdnClubId").val();
            const userId = $("#canceluserid").val();
            const loginUserId = $("#hdnUserId").val();
            const ipAddress = $("#ipaddress").val();
            var cancelDate = $("#canceldate").val();
            var rightNow = $("#rightnow").is(":checked");
            const fData = new FormData();
            fData.append("ClubId", $thisClubId);
            fData.append("UserId", userId);
            fData.append("CanceledBy", loginUserId);
            fData.append("IpAddress", ipAddress);
            fData.append("ScheduledDate", cancelDate);
            fData.append("IsCanceledNow", rightNow);
            app.showLoader();
            $.ajax({
                type: "POST",
                url: `/clubs/${$thisClubId}/memberships/schedulecanceled`,
                contentType: false,
                processData: false,
                data: fData,
                success: function (data) {
                    app.hideLoader();
                    if (data === 0) {
                        $("#mysubscriptionmodal").modal("hide");
                        var successMessage = "Your subscription cancellation was successful. The subscription will be cancelled from {0}.";
                        if (rightNow) {
                            cancelDate = new Date().toLocaleDateString();
                        }

                        successMessage = successMessage.replace("{0}", cancelDate);
                        alert(successMessage);
                    }
                    const date = new Date();
                    const newDate = new Date(date.getFullYear(), date.getMonth() + 4, date.getDate());
                    $(".hiddenLastMonthone").val(newDate.getMonth() + "/" + newDate.getDate() + "/" + newDate.getFullYear());
                    location.reload();
                },
                error: function () {
                    app.hideLoader();
                }
            });
        });

        $(".cancelscheduled").unbind().click(function () {
            $("#confirmcancelscheduled").modal("show");
            $("#mysubscriptionmodal").modal("hide");
        });

        $(".cancelapprove").unbind().click(function () {
            $("#confirmcancelscheduled").modal('hide');
            $("#mysubscriptionmodal").modal('hide');
        });

        $("#approvesubmission").unbind().click(function () {
            var userId = $("#canceluserid").val();
            var clubId = $('#hdnClubId').val();
            var fdata = new FormData();
            fdata.append('ClubId', clubId);
            fdata.append('UserId', userId);
            $.ajax({
                type: "POST",
                url: "/clubs/" + clubId + "/memberships/" + userId + "/scheduledcanceledFinal",
                contentType: false,
                processData: false,
                data: fdata,
                success: function (data) {
                    if (data == true) {
                        alert("Scheduled Cancel Date removed now !!");
                        $("#confirmcancelscheduled").modal('hide');
                        $("#mysubscriptionmodal").modal('hide');
                        location.reload();
                    }
                },
                error: function () {
                }
            });
        });

        //filter by status and mail
        $("#AddfilterId").unbind().click(function () {
            $("#filterdetailsid").show();
        });

        //$('#PlanId').change(function () {
        //    var planId = $(this).val();
        //    console.log(planId);
        //    var setplanId = $("#planmoveid").val(planId);
        //});

        $(document.body).unbind().on('click', '#PlanMoveCancelId', function () {
            $("#filterplansid").hide();
            var cancelfilter = true;
            var clubId = $('#hdnClubId').val();
            var fdata = new FormData();
            fdata.append('ClubId', clubId);
            app.showLoader();
            fdata.append('Cancelfilter', cancelfilter);
            $.ajax({
                type: "POST",
                url: "/clubs/" + clubId + "/memberships/filterplanmembership",
                contentType: false,
                processData: false,
                data: fdata,
                success: function (data) {
                    $("#filterusers").html(data);
                    app.hideLoader();
                },
                error: function () {

                }
            });
        });

        $('.one-time-popup').unbind().click(function () {
            var userid = $(this).siblings().val();
            console.log(userid);
            var onetimeuserid = $("#onetimeuserid").val(userid);
            $("#MovePlanPopupId").modal('show');
        });

        $(document.body).unbind().on('click', '#ChargeId', function () {
            var userids = $("#onetimeuserid").val();
            var clubId = $('#hdnClubId').val();
            var planId = $("#PlanId option:selected").val();
            var amount = $('#amountId').val();
            var description = $('#descriptionemailId').val();
            console.log(userids);
            if (amount.indexOf(".") == -1) {
                if (amount != null && amount != '' && amount != undefined && description != null && description != '' && description != undefined) {
                    var fdata = new FormData();
                    fdata.append('UserId', userids);
                    fdata.append('PlanId', planId);
                    fdata.append('clubId', clubId);
                    fdata.append('Amount', amount);
                    fdata.append('description', description);
                    app.showLoader();
                    $.ajax({
                        type: "POST",
                        url: "/clubs/" + clubId + "/memberships/movefighters",
                        contentType: false,
                        processData: false,
                        data: fdata,
                        success: function (data) {
                            console.log(data);
                            if (data == 'success') {
                                alert("One time invoice generated Successfully !!");
                                app.hideLoader();
                                $("#MovePlanPopupId").modal('hide');
                                $('#amountId').val('');
                                $('#descriptionemailId').val('');
                                location.reload();
                            }
                            else {
                                alert(data);
                                app.hideLoader();
                            }
                        },
                        error: function () {

                        }
                    });
                }
                else {
                    alert("please fill both details");
                }
            }
            else {
                alert("Decimal values are not allow !!");

            }
        });

        $('#cancelmoveId').unbind().click(function () {
            $('#amountId').val('');
            $('#descriptionemailId').val('');
            $("#MovePlanPopupId").modal('hide');
        });

        $("#infinite-injured").unbind().click(function () {
            if ($(this).prop('checked')) {
                $("#TempDateUser").val('');
                $("#TempDateUser").attr('disabled', 'disabled');
            }
            else {
                $("#TempDateUser").removeAttr('disabled');
            }
        });

        $("#TempDatebtn").unbind().click(function () {
            app.showLoader();
            var tempDate = $("#TempDateUser").val();
            var userId = $("#hdnMemUserId").val();
            var clubId = $('#hdnClubId').val();
            var tempraryDateCreateBy = $('#hdnUserId').val();
            let InfiniteInjury = tempDate == null || tempDate == "" ? $("#infinite-injured").prop("checked") : false;
            var obj = {
                UserId: userId,
                ClubId: clubId,
                TempDate: tempDate,
                TempraryDateCreateBy: tempraryDateCreateBy,
                InfiniteInjury: InfiniteInjury
            };
            $.ajax({
                url: "/clubs/" + clubId + "/memberships/TempDateSubmit/",
                method: "Post",
                data: obj,
                success: function () {
                    location.reload();
                    //$("#ActiveInactiveDateModel").modal('hide');
                    //app.hideLoader();
                },
                Error: function (err) {
                    alert(err);
                    app.hideLoader();
                }
            });
        });

        $(".weight-class-box").selectpicker({
            noneSelectedText: "Select Weight Class",
            liveSearch: true,
            hideDisabled: true,
            actionsBox: true,
            virtualScroll: false,
            container: 'body',
            title: "Select Weight Class"
        });

        $(".fight-class-box").selectpicker({
            noneSelectedText: "Select Fight Class",
            liveSearch: true,
            hideDisabled: true,
            actionsBox: true,
            virtualScroll: false,
            container: 'body',
            title: "Select Fight Class"
        });

        $("#mytable-desktop tr").each(function () {
            const fightClassBox = $(this).find(".hdnFightClassIdsDB");
            if (fightClassBox.length > 0) {
                showHideWeightClassForPage(fightClassBox.attr("id"));
            }
        });

        searchFx();
    },
        searchFx = function () {
            $(".search-box input").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                if ($(document).width() > 767) {
                    $(".memberstable tbody tr").filter(function () {
                        $(this).toggle($(this).find("td:eq(1) a").text().toLowerCase().indexOf(value) > -1)
                    });
                }
                else {
                    $(".memberstable tbody tr").each(function () {
                        if ($(this).find("td:eq(1) a").text().toLowerCase().indexOf(value) > -1) {
                            $(this).css("display", "block");
                        }
                        else {
                            $(this).hide();
                        }
                    });

                    if (value.trim().length > 0) {
                        $(".btn-show-more").hide();
                    }
                    else {
                        $(".btn-show-more").show();
                    }
                }

                if (value.trim().length == 0) {
                    $(".memberstable tbody tr.hide").removeAttr('style');
                }
            });
        };
    return {
        init: init
    };
}();


function activeModel(date, UserId, infiniteInjuty) {
    $("#ActiveInactiveDateModel").modal('show');
    $("#TempDateUser").val(date);
    $("#TempDateUser").datetimepicker({
        minDate: new Date().setHours(0, 0, 0, 0),
        useCurrent: false,
        format: "L",
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText'
        }
    }), this._allow_update = 1;

    $("#hdnMemUserId").val(UserId);

    $("#infinite-injured").prop("checked", infiniteInjuty == 1 ? true : false);
    if (infiniteInjuty == 1) {
        $("#TempDateUser").val('');
        $("#TempDateUser").attr('disabled', 'disabled');
    }
    else {
        $("#TempDateUser").removeAttr('disabled');
    }
}

//#region WeightClass Submit Function on Dropdown
function WeightClassSubmit(userId, weightClassId, ind) {
    const weightClass = $("#ddl_" + ind).val();
    $("#hdnWeightClassIdsDB_" + ind).val(weightClass);

    app.showLoader();
    var clubId = $('#hdnClubId').val();
    var obj = {
        UserId: userId,
        WeightClassId: (weightClassId != null) ? weightClassId.join(",") : null
    };
    $.ajax({
        url: "/clubs/" + clubId + "/memberships/WeightClassSubmit/",
        method: "Post",
        data: obj,
        success: function () {
            $("#ActiveInactiveDateModel").modal('hide');
            app.hideLoader();
        },
        error: function (err) {
            alert(err);
            app.hideLoader();
        }
    });
}
//#endreion

//#region FightClass Submit Function on Dropdown
function FightClassSubmit(userId, fightClassId, id) {
    app.showLoader();
    var clubId = $('#hdnClubId').val();
    var obj = {
        UserId: userId,
        FightClassId: (fightClassId != null) ? fightClassId.join(",") : null
    };
    $.ajax({
        url: "/clubs/" + clubId + "/memberships/FightClassSubmit/",
        method: "Post",
        data: obj,
        success: function () {
            $("#ActiveInactiveDateModel").modal('hide');
            $(`#${id}`).val(fightClassId);
            showHideWeightClassForPage(id);
            app.hideLoader();
        },
        error: function (err) {
            alert(err);
            app.hideLoader();
        }
    });
}
//#endreion

//Show Weight Class based on Fight Class
const jsonWeightClass = $("#WeightClassIdsJson").val();
var jsonWeightClassList;
if (jsonWeightClass !== null && jsonWeightClass.length > 0) {
    jsonWeightClassList = JSON.parse(jsonWeightClass);
}
var showHideWeightClassForPage = function (id) {
    const tr = $(`#${id}`).closest("tr");
    const fightClassIds = $(`#${id}`).val().split(",");
    const matchedWeightClasses = jsonWeightClassList !== undefined && jsonWeightClassList !== ""
        ? jsonWeightClassList.filter(i => fightClassIds.indexOf(i.FightClassId + "") >= 0)
        : null;
    var itemsWeightClass = "";
    var weightClassContainer = tr.find("select.weight-class-box");
    const selectedWeightClassIds = tr.find(".hdnWeightClassIdsDB").val();
    if (matchedWeightClasses !== null) {
        $.each(matchedWeightClasses,
            function (i, classes) {
                itemsWeightClass += `<option value='${classes.WeightClassId}' data-subtext='(${classes.FightClassName
                    }) (${classes.Gender})'>${classes.WeightClassName}</option>`;
            });

        weightClassContainer.html(itemsWeightClass);
    }

    if (selectedWeightClassIds !== "") {
        $.each(selectedWeightClassIds.split(","),
            function (i, e) {
                weightClassContainer.find(`option[value='${e + ""}']`).prop("selected", true);
            });
    }

    if (matchedWeightClasses !== null) {
        weightClassContainer.removeAttr("disabled");
    } else {
        weightClassContainer.attr("disabled", "disabled");
    }

    weightClassContainer.selectpicker("refresh");
};