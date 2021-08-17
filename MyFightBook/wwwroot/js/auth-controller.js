var authInit = function () {
    var isChanged = 0;
    var isLessFee = 0;
    var lowFeeMessage = "";
    var baseurl = $("#basurlid").val();
    var setProperty = function () {
        $("#ddlPlanTxt").attr("readonly", true);
        $("#ddlPlanTxt").click(function () {
            const hdnSet = $("#hdnSet").val();
            if (parseInt(hdnSet) === 1) {
                $(".mobile-dropdown ul.dropdown").css("display", "block");
                $("#hdnSet").val(0);
            } else {
                $(".mobile-dropdown ul.dropdown").css("display", "none");
                $("#hdnSet").val(1);
            }
        });
    },
        setMobPlanId = function (planId) {
            const dataType = $(`li[data-id=${planId}]`).attr("data-type");
            const paymentType = dataType === "plan";

            $("#IsPlan").val(paymentType);
            $("#ddlPlanTxt").attr("readonly", false);
            const planTitle = $(`li[data-id=${planId}]`).text();
            if (planId === 0 || planId === "0" || planId === "" || planId === undefined) {
                $("#PlanId").val("0");
                $("#ddlPlanTxt").val("");
            }
            else {
                if (dataType === "seasonPlan") {
                    $(".loader-1").show();
                    $.ajax({
                        method: "GET",
                        contentType: "application/json",
                        url: "/Auth/GetSeason",
                        data: { seasonPlanId: planId },
                        success: function (data) {
                            $(".loader-1").hide();
                            if (data.seasons !== null && data.seasons.length > 0) {
                                const seasonId = data.seasons[0].season.seasonId;
                                $("#PlanId").val(seasonId);
                            } else {
                                console.log("Seasons not found !!");
                            }
                        },
                        error: function () {
                            console.log("Seasons not found !!");
                        }
                    });
                } else {
                    $("#PlanId").val(planId);
                }

                $("#ddlPlanTxt").val(planTitle);
            }
            $(".mobile-dropdown ul.dropdown").css("display", "none");
            $("#hdnSet").val(1);
        },
        callClubAjax = function () {
            $(".loader-1").show();
            var selectedValue = $("#clubId").val();
            if (isChanged++ > 0) {
                $("#RegistrationFee").val("");
                $("#RegistrationFeeValue").val("");
                $("#cardnumberId").val("");
                $("#expiremonth").val("");
                $("#expireyear").val("");
                $("#cvcId").val("");
            }
            if (selectedValue.toString().trim() !== "") {
                $("#registrationId").removeAttr("disabled");
                $.ajax({
                    method: "GET",
                    contentType: "application/json",
                    url: "/Auth/GetPlans",
                    data: { clubId: selectedValue },
                    success: function (data) {
                        if (data.resultMessage === "success") {
                            var mobilePlanContainer = $("#MovPlanId");
                            $("#PlanId").val("");

                            if (data.avalibaleplans.length > 0 || data.registrationFee !== "0" && data.registrationFee !== 0 || (data.seasonPlans !== null && data.seasonPlans.length > 0)) {
                                $("#cardnumberId").attr("required", "required");
                                $("#expiremonth").attr("required", "required");
                                $("#expireyear").attr("required", "required");
                                $("#cvcId").attr("required", "required");

                                $("#cardnumberId").rules("add",
                                    {
                                        required: true,
                                        messages: {
                                            required: "Card Number is required."
                                        }
                                    });
                                $("#expiremonth").rules("add",
                                    {
                                        required: true,
                                        messages: {
                                            required: "Expire Month is required."
                                        }
                                    });
                                $("#expireyear").rules("add",
                                    {
                                        required: true,
                                        messages: {
                                            required: "Expire year is required."
                                        }
                                    });
                                $("#cvcId").rules("add",
                                    {
                                        required: true,
                                        messages: {
                                            required: "CVC is required."
                                        }
                                    });

                                $("#subscriptiondetails").show();
                            } else {
                                //For Mobile Plane Id
                                $("#ddlPlanTxt").removeAttr("required");
                                $("#RegistrationFee").removeAttr("required");
                                $("#cardnumberId").removeAttr("required");
                                $("#expiremonth").removeAttr("required");
                                $("#expireyear").removeAttr("required");
                                $("#cvcId").removeAttr("required");
                                $("#subscriptiondetails").hide();
                            }

                            if (data.avalibaleplans.length > 0 || (data.seasonPlans !== null && data.seasonPlans.length > 0)) {
                                var optionsHtml1 =
                                    "<input type='hidden' id='hdnSet' value='1'/><input class='form-control whitelist' placeholder='Select plan / season plan' id='ddlPlanTxt' style='background-color: white !important;text-overflow: ellipsis; padding-right:30px;' required='required' autocomplete='off'>";
                                optionsHtml1 += "<ul class='dropdown' style='display:none;'>";
                                optionsHtml1 += "<li data-id='0'><a> Select Plan / Season Plan </a></li>";
                                _.each(data.avalibaleplans,
                                    function (c) {
                                        if (c.available) {
                                            optionsHtml1 += "<li data-id='" +
                                                c.plan.id +
                                                "' data-type='plan'> <a>" +
                                                c.plan.planName +
                                                "</a></li>";
                                        } else {
                                            optionsHtml1 += "<li data-id='" +
                                                c.plan.id +
                                                "' data-type='plan'> <a>" +
                                                c.plan.planName +
                                                "</a></li>";
                                        }
                                    });

                                _.each(data.seasonPlans,
                                    function (c) {
                                        optionsHtml1 += "<li data-id='" +
                                            c.seasonPlan.seasonPlanId +
                                            "' data-type='seasonPlan'> <a>" +
                                            c.seasonPlan.name  + " (Season Plan)" +
                                            "</a></li>";
                                    });

                                optionsHtml1 += "</ul>";

                                mobilePlanContainer.html(optionsHtml1);
                                setProperty();
                                $(".mobile-dropdown ul.dropdown li").click(function () {
                                    setMobPlanId(parseInt($(this).attr("data-id")));
                                });

                                var planId = $("#PlanId").val();
                                if (planId !== "") {
                                    setMobPlanId(planId);
                                }

                                setMobPlanId();
                                $("#ddlPlanTxt").prop("required", true);
                                $("#ddlPlanTxt").rules("add",
                                    {
                                        required: true,
                                        messages: {
                                            required: "Plan is required."
                                        }
                                    });

                                if (data.registrationFee === "0" || data.registrationFee === 0) {
                                    $("#RegistrationFeeValue").hide();
                                    $("#RegistrationFee").removeAttr("required");
                                }
                            }
                            if (data.registrationFee !== "0" && data.registrationFee !== 0) {
                                $("#RegistrationFee").prop("required", true);
                                $("#RegistrationFee").rules("add",
                                    {
                                        required: true,
                                        messages: {
                                            required: "Registration fee is required."
                                        }
                                    });
                                var registrationFee = "Registration fee - " +
                                    data.registrationFee +
                                    " " +
                                    data.registrationFeeCurrency;
                                $("#RegistrationFeeValue").val(registrationFee);
                                $("#RegistrationFee").val(data.registrationFee);
                                $("#RegistrationFeeValue").show();
                                if (data.avalibaleplans.length === 0 && (data.seasonPlans === null || data.seasonPlans.length === 0)) {
                                    $("#MovPlanId").hide();

                                    //For Mobile Plane Id
                                    $("#ddlPlanTxt").removeAttr("required");
                                }
                            }

                            if ($("#planselectionid").val() !== "") {
                                setMobPlanId($("#planselectionid").val());
                            }
                        }
                        else {
                            $("#RegistrationFee").val("");
                            $("#RegistrationFeeValue").val("");
                            $("#cardnumberId").val("");
                            $("#expiremonth").val("");
                            $("#expireyear").val("");
                            $("#cvcId").val("");
                            $("#subscriptiondetails").hide();
                            $("#clubId").prop("selectedIndex", 0);
                            $("#clubId").select2();
                            alert(data.resultMessage);
                        }

                        $(".loader-1").hide();
                    },
                    error: function () {
                        $(".loader-1").hide();
                        console.error(`Could not fetch plans for club: ${selectedValue}`);
                    }
                });
            }
            else {
                //For Mobile Plane Id
                $("#ddlPlanTxt").removeAttr("required");
                $("#cardnumberId").removeAttr("required");
                $("#expiremonth").removeAttr("required");
                $("#expireyear").removeAttr("required");
                $("#cvcId").removeAttr("required");
                $("#registrationId").prop("disabled", "disabled");
                $("#subscriptiondetails").hide();
                $("#ddlPlanTxt").prop("required", false);
                $("#cardnumberId").prop("required", false);
                $("#expiremonth").prop("required", false);
                $("#expireyear").prop("required", false);
                $("#cvcId").prop("required", false);

                $(".loader-1").hide();
            }
        },
        checkRole = function () {
            $("#clubId").select2();

            $("#clubId").attr("required", "required");
            var clubid = $("#selectedclubid").val();

            if (clubid !== 0 && clubid !== undefined) {
                $("#clubId").val(clubid);
                $.ajax({
                    method: "GET",
                    contentType: "application/json",
                    url: "/Auth/GetCookiePolicy",
                    data: { clubId: clubid },
                    success: function (data) {
                        console.log(data);
                        if (data.existCookieClub) {
                            $("a.cookiesurlclass").attr("href",
                                baseurl + "/auth/cookies?AdminTypeId=" + clubid + "&Term=Cookies&AdminType=clubadmin");
                        } else {
                            $("a.cookiesurlclass").attr("href", baseurl + "/auth/cookies?Term=Cookies&AdminType=admin");
                        }
                        if (data.existPolicyClub) {
                            $("p a.policiesurlclass").text("Club's PRIVACY POLICY");
                            $("a.policiesurlclass").attr("href",
                                baseurl +
                                "/auth/policies?AdminTypeId=" +
                                clubid +
                                "&Term=Policies&AdminType=clubadmin");
                        } else {
                            $("p a.policiesurlclass").text("PRIVACY POLICY");
                            $("a.policiesurlclass").attr("href",
                                baseurl + "/auth/policies?Term=Policies&AdminType=admin");
                        }
                    },
                    error: function () {
                        console.error(`Could not fetch cookie and policies for clubId: ${clubid}`);
                    }
                });
            }


            var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
            const clubLabel = hashes[0].split("=")[0];
            var hash = hashes[0].split("=")[1];
            if (clubLabel !== undefined && clubLabel == "clubid" && hash !== undefined && hash !== "true") {
                $("#clubId option[value='" + hash + "']").prop("selected", true);
                $("#clubId").attr("disabled", "disabled");
            }

            $("#clubId").css("display", "block");
            $("#clubId").parent().css("display", "block");
            $("#clubId").rules("add",
                {
                    required: true,
                    messages: {
                        required: "Club Id is required."
                    }
                });
            if ($("#clubId").val() !== "") {
                callClubAjax();
            } else {
                $(".loader-1").hide();
            }
        };
    const init = function () {
        $("#chkedcookiesandpolicyID").change(function () {
            if ($(this).prop("checked")) {
                $("#registrationId").removeAttr("disabled");
            }
            else {
                $("#registrationId").prop("disabled", "disabled");
            }
        });

        $(".passwordtoggleconfirm").click(function () {
            const y = document.getElementById("confirmpassword");
            if (y.type === "password") {
                y.type = "text";
                $(this).find(".passwordon").css({ 'display': 'block' });
                $(this).find(".passwordoff").css({ 'display': 'none' });
            } else {
                y.type = "password";
                $(this).find(".passwordon").css({ 'display': 'none' });
                $(this).find(".passwordoff").css({ 'display': 'block' });
            }
        });

        $("form").removeAttr("novalidate");
        $(".whitelist").attr("data-hj-whitelist", "");

        $("#validationMsg").addClass("slideInLeft");
        setTimeout(function () {
            $("#validationMsg").addClass("slideInLeft");
        }, 5000);
        setTimeout(function () {
            $("#validationMsg").addClass("slideOut");
        }, 4000);

        $("#username").keypress(function (e) {
            if (e.which === 32) {
                return false;
            }

            return true;
        });

        $(".accept-only-num").keypress(function (e) {
            if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }

            return true;
        });

        $(".close-password-rule-btn").click(function () {
            $(".password_details").hide();
        });

        $("#password").click(function () {
            $(".password_details").removeAttr("style");
        });

        $(".passwordon").css({ "display": "none" });
        $(".passwordtoggle").click(function () {
            const x = document.getElementById("password");
            if (x.type === "password") {
                x.type = "text";
                $(this).find(".passwordon").css({ "display": "block" });
                $(this).find(".passwordoff").css({ "display": "none" });
            } else {
                x.type = "password";
                $(this).find(".passwordon").css({ "display": "none" });
                $(this).find(".passwordoff").css({ "display": "block" });
            }
        });

        checkRole();
        $("#registrationId").click(function () {
            const cookieandpolicy = $("#chkedcookiesandpolicyID").prop("checked");
            if (cookieandpolicy === false) {
                alert("Please Select Cookie and Private Policy.");
                return false;
            }
            else if (isLessFee === 1) {
                alert(lowFeeMessage);
                return false;
            }
            else {
                const cardnumber = $("#cardnumberId").val();
                const cvc = $("#cvcId").val();
                const username = $("#username").val();
                const password = $("#password").val();
                const confirmpassword = $("#confirmpassword").val();
                const firstname = $("#firstname").val();
                const lastname = $("#lastname").val();
                const email = $("#email").val();
                const expiremonth = $("#expiremonth").val();
                const expireyear = $("#expireyear").val();
                const dateOfBirth = $("#Birthday").val();
                const clubId = $("#clubId").val();

                if (dateOfBirth !== "" && dateOfBirth != null && cardnumber !== "" && cvc !== "" && username !== "" && password !== "" && confirmpassword !== "" && firstname !== "" && lastname !== "" && email !== "" && expiremonth !== "" && expireyear !== "" && clubId !== "") {
                    $(this).attr("disabled", true);
                    $("form").submit();
                    return true;
                }
            }
            return true;
        });

        $("#clubId").on("change", function () {
            var clubid = $(this).val();
            $.ajax({
                method: "GET",
                contentType: "application/json",
                url: "/Auth/GetCookiePolicyNew",
                data: { clubId: clubid },
                success: function (data) {
                    if (data.existCookieClub) {
                        $("a.cookiesurlclass").attr("href", baseurl + "/auth/cookies?AdminTypeId=" + clubid + "&Term=Cookies&AdminType=clubadmin");
                    }

                    else {
                        $("a.cookiesurlclass").attr("href", baseurl + "/auth/cookies?Term=Cookies&AdminType=admin");
                    }
                    if (data.existPolicyClub) {
                        $("p a.policiesurlclass").text("Club's PRIVACY POLICY");
                        $("a.policiesurlclass").attr("href", baseurl + "/auth/policies?AdminTypeId=" + clubid + "&Term=Policies&AdminType=clubadmin");
                    }

                    else {
                        $("p a.policiesurlclass").text("PRIVACY POLICY");
                        $("a.policiesurlclass").attr("href", baseurl + "/auth/policies?Term=Policies&AdminType=admin");
                    }
                },
                error: function () {
                    console.error(`Could not fetch cookie and policies for clubId: ${clubid}`);
                }
            });

            callClubAjax();
        });
    };
    return {
        init: init
    }
}();