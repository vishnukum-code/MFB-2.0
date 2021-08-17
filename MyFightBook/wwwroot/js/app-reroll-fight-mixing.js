var createRerollFightMixing = function () {
    var assignedFighterJSON = new Array(), loginUserID = $("#loginUserID").val(), init = function () {
        bindData();
    },
        showHideWeightClass = function () {
            var weightClassList = [];
            $(".fighter-list-model-content #WeightclassDrp option").each(function () {
                const $this = $(this);
                const fightClassId = $this.attr("data-id");
                const weightClassId = $this.val();
                const label = $this.text();
                if (weightClassId !== "") {
                    const weightClassObj = {
                        "FightClassId": fightClassId,
                        "WeightClassId": weightClassId,
                        "Label": label
                    };
                    weightClassList.push(weightClassObj);
                }
            });

            $(".fighter-list-model-content #FightClassId").change(function () {
                const fightClassId = $(this).val();
                const weightclassDrp = $(".fighter-list-model-content #WeightclassDrp");
                var html = "<option value=''>Select Weight Class</option>";
                if (fightClassId !== "" && weightClassList.length > 0) {
                    weightclassDrp.removeAttr("disabled");
                    weightClassList.forEach(function (e) {
                        if (fightClassId === e.FightClassId) {
                            html += `<option data-id="${e.FightClassId}" value="${e.WeightClassId}">${e.Label}</option>`;
                        }
                    });
                } else {
                    weightclassDrp.attr("disabled", "disabled");
                }

                weightclassDrp.html(html);
                weightclassDrp.select2();
            });
        },
        showHideWeightClassForPage = function () {
            var weightClassListForPage = [];
            $("#WeightclassDrp option").each(function () {
                const $this = $(this);
                const fightClassId = $this.attr("data-id");
                const weightClassId = $this.val();
                const label = $this.text();
                if (weightClassId !== "") {
                    const weightClassObjPage = {
                        "FightClassId": fightClassId,
                        "WeightClassId": weightClassId,
                        "Label": label
                    };
                    weightClassListForPage.push(weightClassObjPage);
                }
            });
            $("#ClassesDrp").change(function () {
                app.showLoader();
                getFights(false, false);
                const fightClassId = $(this).val();
                const weightclassDrp = $("#WeightclassDrp");
                var html = "<option value=''>Select Weight Class</option>";
                if (fightClassId !== "" && weightClassListForPage.length > 0) {
                    weightclassDrp.removeAttr("disabled");
                    weightClassListForPage.forEach(function (e) {
                        if (fightClassId === e.FightClassId) {
                            html += `<option data-id="${e.FightClassId}" value="${e.WeightClassId}">${e.Label}</option>`;
                        }
                    });
                } else {
                    weightclassDrp.attr("disabled", "disabled");
                }

                weightclassDrp.html(html);
                weightclassDrp.select2();
            });
        },
        bindData = function () {
            $(window).load(function () {
                $('body').addClass('membership-table-dropdown');
            });

            $("#WeightclassDrp").change(function () {
                $("#OrderBy").val('1');
                app.showLoader();
                getFights(false, false);
            });
            showHideWeightClassForPage();
            //$("#ClassesDrp").change(function () {
            //    app.showLoader();
            //    getFights(false, false);
            //});

            getFights(false, false);
            $("#rerollmixingId").click(function () {
                if ($("#ClassesDrp option:selected").index() > 0) {
                    if ($("#WeightclassDrp option:selected").index() > 0) {
                        let noOfFight = $("#NumberOfFights option:selected").index();
                        if (noOfFight > 1) {
                            app.showLoader();
                            getFights(true, false);
                        }
                        else {
                            alert("Please select number of fights");
                        }
                    }
                    else {
                        alert("Please select weight class !!");
                    }
                }
                else {
                    alert("Please select fight class !!");
                }
            });

            $("#reset-fight").click(function () {
                if ($("#ClassesDrp option:selected").index() > 0) {
                    if ($("#WeightclassDrp option:selected").index() > 0) {
                        app.showLoader();
                        getFights(true, true);
                    }
                    else {
                        alert("Please select weight class !!");
                    }
                }
                else {
                    alert("Please select fight class !!");
                }
            });

            bindMedicalSubmit();
        },
        pagination = function () {
            $(".pagination-btn").click(function () {
                var index = $(this).attr("data-val");
                getFightersList(index);
            });
        },
        addSendMailSection = function () {
            let firstRow = 0;

            //Show Scroll on dropdown Age
            $(".form-group").on("shown.bs.dropdown", function (e) {
                app.applyNiceScroll($('body').find(".dropdown-menu > .inner"));
            });

            $('#selectfighterlist .multi-select').selectpicker({
                noneSelectedText: "Select fighters"
            });

            $(".multi-select ul li").each(function () {
                if (firstRow++ === 0) {
                    $(this).remove();
                }
            });

            $("#select1").change(function () {
                if ($(this).val() === "specificFighters") {
                    $("#selectfighterlist").css("display", "block");
                }
                else {
                    $("#selectfighterlist").css("display", "none");
                }
            });

            $("#SendFighterApprovelEmail").click(function () {

                var isOk = true;

                $(".button-sec .alert-success").hide();

                var eventid = $("#eventId").val();
                var currentselectiontype = $("#select1").val();
                var model = {};
                model.EventId = eventid;
                model.Mailselectiontype = currentselectiontype;
                model.WeightClassId = $("#WeightclassDrp option:selected").val();
                model.FightClassId = $("#ClassesDrp option:selected").val();
                var userids = "";
                var errorMessage = "";
                if (currentselectiontype === "specificFighters") {
                    $.each($("#UserIdsDrp option:selected"), function () {
                        if (userids === "") {
                            userids = parseInt($(this).val());
                        } else {
                            userids = userids + "," + parseInt($(this).val());
                        }
                    });

                    errorMessage = "Please select atleast one fighter.";
                }
                else {
                    $(".middle-sec .fighter-block .f-row .approve-fight-for-medical-record input:checked").each(function () {
                        const fUserId = $(this).closest(".fighter-block").find(".f-row .fighter-id").text();
                        const oUserId = $(this).closest(".fighter-block").find(".o-row .fighter-id").text();
                        if (userids === "") {
                            userids = parseInt(fUserId) + "," + parseInt(oUserId);
                        } else {
                            userids = userids + "," + parseInt(fUserId) + "," + parseInt(oUserId);
                        }
                    });

                    errorMessage = "Please select fighters from the Assigned fight list.";
                }

                model.UserIds = userids;
                if (userids === "") {
                    isOk = false;
                }

                if (!isOk) {
                    alert(errorMessage);
                }
                else {
                    app.showLoader();
                    var url = "/events/eventFightApprovalMails";
                    app.fetchPost(url, model, function (result) {
                        app.hideLoader();
                        alert(result);
                    });
                }
            });

            app.hideLoader();
        },
        filteruser = function () {
            $("#filteruser").click(function () {
                RereshPageIndex();

                var federationid = $("#federationId").val();
                var clubid = $("#ClubId").val(), WeightClasses = "";

                var weightClassIndex = $(".fighter-list-model-content #WeightclassDrp option:selected").index();

                if (weightClassIndex > 0) {
                    WeightClasses = $(".fighter-list-model-content #WeightclassDrp option:selected").val();
                }

                let PageIndex = 0;

                if (clubid === "" && WeightClasses === "") {
                    let pagein = $(".pagination-btn.next").attr("data-val") - 1;
                    PageIndex = pagein;
                }

                // Age Dropdown Get Selected List
                var Age = "";
                $.each($("#Age option:selected"), function () {
                    if (Age === "") {
                        Age = $(this).val();
                    } else {
                        Age = Age + "," + $(this).val();
                    }
                });
                //End
                app.showLoader();
                var model = {};
                model.FederationId = federationid;
                model.ClubId = clubid;
                model.WeightClasses = WeightClasses;
                model.eventid = $("#eventId").val();
                model.PageIndex = PageIndex;
                model.Gender = $("#Gender option:selected").val();
                model.Age = Age;
                model.NoOfFights = $("#filterNoOfFights option:selected").val();
                var url = "/events/getfilteruserlist";
                app.fetchPost(url, model, function (html) {
                    $("#FighterListModel .fighter-list-model-content .middle.fighter-list").html(html);

                    statisticsPopup();
                    RefreshErrorMessageBox();

                    var pi = $("#PageIndex").val();
                    var rr = $("#RemainingRecord").val();
                    if (parseInt(pi) > 1) {
                        $("#previous").css("display", "Block");
                    }
                    else {
                        $("#previous").css("display", "None");
                    }
                    if (parseInt(rr) > 0) {
                        $("#next").css("display", "Block");
                    }
                    else {
                        $("#next").css("display", "None");
                    }

                    enableDisableWeightClassFx();

                    app.hideLoader();
                });
            });
        },
        enableDisableWeightClass = function ($this) {
            const fightClassId = $this.val();
            const rowBlock = $this.closest(".row-block");
            rowBlock.find(".select-radio-block .dropdown .dropdown-menu .custom-control input[type=radio]").parent().show();
            if (fightClassId > 0) {
                rowBlock.find(".select-radio-block .dropdown .dropdown-menu .custom-control input[type=radio]").parent().hide();
                rowBlock.find(".select-radio-block .dropdown .dropdown-menu .custom-control:eq(0) input[type=radio]").parent().show();
                rowBlock.find(`.select-radio-block .dropdown .dropdown-menu input[data-id=${fightClassId}]`).parent().show();
            }
        },
        enableDisableWeightClassFx = function () {
            $(".row-block #ClassessDrp").each(function () {
                enableDisableWeightClass($(this));
            });

            $(".row-block #ClassessDrp").change(function () {
                enableDisableWeightClass($(this));
                const fightClassId = $(this).val();
                const rowBlock = $(this).closest(".row-block");
                const selectedWeightClassId = rowBlock
                    .find(".select-radio-block .dropdown .dropdown-menu .custom-control input[type=radio]:checked")
                    .attr("data-id");
                if (fightClassId !== selectedWeightClassId) {
                    const labelText = rowBlock
                        .find(".select-radio-block .dropdown .dropdown-menu .custom-control:eq(0) label")
                        .text();
                    rowBlock.find("#dropdownMenuButton .custom-control label").text(labelText);
                    rowBlock.find(".select-radio-block .dropdown .dropdown-menu .custom-control:eq(0) input[type=radio]").prop("checked", true);
                }
            });
        },
        getFightersList = function (PageIndex) {
            //app.showLoader();
            var eventid = $("#eventId").val();
            var model = {};
            model.EventId = eventid;
            model.PageIndex = PageIndex;
            var url = "/events/" + eventid + "/getfighters";
            app.fetchPost(url, model, function (html) {
                $(".fighter-list-model-content").html(html);

                //None Selected Text for Age
                $(".Age-class-box").selectpicker({
                    noneSelectedText: "Select Age",
                    liveSearch: true,
                    hideDisabled: true,
                    actionsBox: true,
                    virtualScroll: false,
                    //container: 'body',
                    title: "Select Age"
                });

                $(".add-unassigned-fighters")
                    .attr("data-toggle", "modal")
                    .attr("data-target", "#FighterListModel")
                    .html("<img src='/backend-assets/img/plus-icon.svg' />");
                RefreshErrorMessageBox();
                showHideWeightClass();
                statisticsPopup();
                filteruser();
                pagination();
                $("#FighterListModel .add-fighters").click(function () {
                    let WeightClassIdForFighter = "", existedClubId = "", Fighters = "", isAllSelected = true, isAllSelectedFightClass = true, FightClassIdForFighter = "";
                    let inactiveFighters = "";
                    let inactiveFighterCount = 0;

                    $(".fighter-list-model-content").find(".row-block #ClassessDrp").removeClass('input-validation-error');
                    $(".fighter-list-model-content").find(".row-block .dropdown-toggle").removeClass('input-validation-error');

                    $.each($(".fighter-list-model-content .chk_fighters:checked"), function () {
                        if (existedClubId === "") {
                            existedClubId = $(this).closest(".row-block").find('.clubids').val();
                        }
                        else {
                            existedClubId += "," + $(this).closest(".row-block").find('.clubids').val();
                        }

                        if (Fighters === "") {
                            Fighters = $(this).val();
                        }
                        else {
                            Fighters += "," + $(this).val();
                        }


                        let isFighterActive = $(this).closest(".row-block").find(".isfighteractive").val();

                        if (isFighterActive == 0 || isFighterActive == "0") {
                            inactiveFighterCount++;
                            if (inactiveFighters == "") {
                                inactiveFighters = $(this).closest(".row-block").find(".chk-block .custom-control-label").text();
                            }
                            else {
                                inactiveFighters += ", " + $(this).closest(".row-block").find(".chk-block .custom-control-label").text();
                            }
                        }

                        let wc = $(this).closest(".row-block").find(".dropdown .dropdown-menu input:checked").val();

                        if (wc === '' || wc === null || wc === undefined) {
                            isAllSelected = false;
                            $(this).closest(".row-block").find(".dropdown-toggle").addClass('input-validation-error');
                        }
                        else {
                            if (WeightClassIdForFighter === "") {
                                WeightClassIdForFighter = wc;
                            }
                            else {
                                WeightClassIdForFighter += "," + wc;
                            }
                        }

                        let fightClassIndex = $(this).closest(".row-block").find("#ClassessDrp").val();
                        if (fightClassIndex !== "" && fightClassIndex !== null && fightClassIndex !== undefined) {
                            if (FightClassIdForFighter === "") {
                                FightClassIdForFighter = $(this).closest(".row-block").find("#ClassessDrp option:selected").val();
                            }
                            else {
                                FightClassIdForFighter += "," + $(this).closest(".row-block").find("#ClassessDrp option:selected").val();
                            }
                        }
                        else {
                            isAllSelectedFightClass = false;
                            $(this).closest(".row-block").find("#ClassessDrp").addClass('input-validation-error');
                        }
                    });

                    if (Fighters === "") {
                        alert("Please select fighters!!");
                    }
                    else if (inactiveFighterCount > 0) {
                        if (inactiveFighterCount > 1)
                            alert(inactiveFighters + " these fighters are inactive for this federation.");
                        else
                            alert(inactiveFighters + " this fighter is inactive for this federation.");
                    }
                    else if (!isAllSelectedFightClass) {
                        alert("Please select fight class for selected fighters");
                    }
                    else if (!isAllSelected) {
                        alert("Please select weight class for selected fighters");
                    }
                    else {
                        var isAlreadyExisted = false, alreadyExistedFighters = "", alreadyExistedFightersCount = 0;
                        $.each($(".fighter-list-model-content .chk_fighters:checked"), function () {
                            let fId = $(this).val();
                            let cId = $(this).closest(".row-block").find('.clubids').val();
                            let wcId = $(this).closest(".row-block").find('.select-radio-block .dropdown .custom-radio.add-fighter-from-popup input:checked').val();
                            let fcId = $(this).closest(".row-block").find('.select-radio-block #ClassessDrp option:selected').val();
                            let fName = $(this).siblings().text();
                            console.log(wcId);
                            $(".unassigned-Fighters .fighters-sec .unassigned-block .unassigned-box-sec .unassigned-box.FighterDetail").each(function () {
                                if (fId === $(this).find(".fighter-id").text() && cId === $(this).find(".club-id").text() && wcId === $(this).find(".weight-class-id").text() && fcId === $(this).find(".fight-class-id").text()) {
                                    isAlreadyExisted = true;
                                    alreadyExistedFightersCount++;
                                    if (alreadyExistedFighters === "") {
                                        alreadyExistedFighters += fName;
                                    }
                                    else {
                                        alreadyExistedFighters += "," + fName;
                                    }
                                }
                            });

                            $(".assign-fight-sec .middle-sec tbody tr").each(function () {
                                if ($(this).find(".f-row .fighter-detail .fighter-id").text() === fId && $(this).find(".f-row .fighter-detail .club-id").text() === cId && $(this).find(".f-row .fighter-detail .weight-class-id").text() === wcId && $(this).find(".f-row .fighter-detail .fight-class-id").text() === fcId) {
                                    isAlreadyExisted = true;
                                    alreadyExistedFightersCount++;
                                    if (alreadyExistedFighters === "") {
                                        alreadyExistedFighters += fName;
                                    }
                                    else {
                                        alreadyExistedFighters += ", " + fName;
                                    }
                                }
                                if ($(this).find(".o-row .fighter-detail .fighter-id").text() === fId && $(this).find(".o-row .fighter-detail .club-id").text() === cId && $(this).find(".o-row .fighter-detail .weight-class-id").text() === wcId && $(this).find(".o-row .fighter-detail .fight-class-id").text() === fcId) {
                                    isAlreadyExisted = true;
                                    alreadyExistedFightersCount++;
                                    if (alreadyExistedFighters === "") {
                                        alreadyExistedFighters += fName;
                                    }
                                    else {
                                        alreadyExistedFighters += ", " + fName;
                                    }
                                }
                            });
                        });

                        if (!isAlreadyExisted) {
                            app.showLoader();
                            var eventid = $("#eventId").val();
                            var model = {};
                            model.EventId = eventid;
                            model.ClubIds = existedClubId;
                            model.WeightClassIdForFighter = WeightClassIdForFighter;
                            model.Fighters = Fighters;
                            model.FightClassIdForFighter = FightClassIdForFighter;
                            console.log(model);
                            var url = "/events/" + eventid + "/addfighters";
                            app.fetchPost(url, model, function () {
                                $(".fighter-list-model-content .chk_fighters").prop("checked", false);
                                $(".fighter-list-model-content .row-block .dropdown .dropdown-menu input").prop("checked", false);
                                $("#FighterListModel").modal('hide');

                                getFights(false, false);
                            });
                        }
                        else {
                            if (alreadyExistedFightersCount > 1) {
                                alert(alreadyExistedFighters + " these fighters are already existed in this event !!");
                            }
                            else {
                                alert(alreadyExistedFighters + " already existed in this event !!");
                            }
                        }
                    }
                });

                enableDisableWeightClassFx();
            });
        },

        Pagination = function (btnType) {
            var federationid = $("#federationId").val();
            var clubid = $("#ClubId").val(), WeightClasses = "";
            var weightClassIndex = $(".fighter-list-model-content #WeightclassDrp option:selected").index();
            if (weightClassIndex > 0) {
                WeightClasses = $(".fighter-list-model-content #WeightclassDrp option:selected").val();
            }

            var PageIndex = $("#PageIndex").val();
            if (btnType === "Previous") {
                PageIndex = parseInt(PageIndex) - 1;
            }
            else {
                PageIndex = parseInt(PageIndex) + 1;
            }

            app.showLoader();
            var model = {};
            model.FederationId = federationid;
            model.ClubId = clubid;
            model.WeightClasses = WeightClasses;
            model.eventid = $("#eventId").val();
            model.PageIndex = PageIndex;
            var url = "/events/getfilteruserlist";
            app.fetchPost(url, model, function (html) {
                $("#FighterListModel .fighter-list-model-content .middle.fighter-list").html(html);

                RefreshErrorMessageBox();
                statisticsPopup();

                var pi = $("#PageIndex").val();
                var rr = $("#RemainingRecord").val();
                if (parseInt(pi) > 1) {
                    $("#previous").css("display", "Block");
                }
                else {
                    $("#previous").css("display", "None");
                }
                if (parseInt(rr) > 0) {
                    $("#next").css("display", "Block");
                }
                else {
                    $("#next").css("display", "None");
                }

                enableDisableWeightClassFx();

                app.hideLoader();
            });
        },
        RereshPageIndex = function () {
            $("#FighterListModel .modal #PageIndex").val("0");
            $("#FighterListModel .modal #previous").css("display", "none");
        },
        searchFighters = function () {
            $("input#SearchBox").on("keyup", function () {
                var value = $(this).val();
                if (value == "") {
                    $(".assign-fight-sec.assign-fighter-block tbody td .fighter-sec").removeClass("heighlight-box");
                    $(".fighter-mixing-mobile .fighter-block .fighter-sec .inner-content").removeClass("heighlight-box");
                    return false;
                }
                if ($(document).width() > 1100) {
                    $(".assign-fight-sec.assign-fighter-block tbody td .fighter-sec").each(function () {
                        if ($(this).find(".fighter-name").val().toLowerCase().indexOf(value.toLowerCase()) > -1) {
                            $(this).addClass("heighlight-box");
                        }
                        else {
                            $(this).removeClass("heighlight-box");
                        }
                    });
                }
                else {
                    $(".fighter-mixing-mobile .fighter-block .fighter-sec .inner-content").each(function () {
                        if ($(this).find(".fighter-name").val().toLowerCase().indexOf(value.toLowerCase()) > -1) {
                            $(this).addClass("heighlight-box");
                        }
                        else {
                            $(this).removeClass("heighlight-box");
                        }
                    });
                }
            });
        },
        approveFighterForFight = function () {
            var fightRowIdsList = [];
            $(".fighter-block .approve-fight-for-medical-record input:checked").each(function () {
                var tr = $(this).closest(".fighter-block");
                if (!tr.hasClass("approved-list")) {
                    var orderId = tr.attr("data-id");
                    fightRowIdsList.push(orderId);
                }
                else {
                    $(this).prop("checked", false);
                }
            });

            fightRowIdsList = fightRowIdsList.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });

            if (fightRowIdsList.length > 0) {
                app.showLoader();
                let model = {};
                model.EventId = $("#eventId").val();
                model.FighterApproveOrderIds = fightRowIdsList.join(",");
                model.IsFightApproved = true;
                var url = "/events/updateeventfight";
                app.fetchPost(url, model, function () {
                    getFights(false, false);
                });
            }
            else {
                alert("Please select atleast one unapproved fight.");
                $(".approve-all-btn").prop("selectedIndex", 0);
                $('.select2').select2();
            }
        },
        approveAllFightsForMedicalRecord = function () {
            $("#myModalsuccess").modal('hide');
            let NoOfSelectedFight = 0;
            $(".approve-fight-for-medical-record input[type='checkbox']").each(function () {
                if ($(this).prop("checked")) {
                    NoOfSelectedFight++;
                }
            });

            if (NoOfSelectedFight === 0) {
                alert("Please select atleast one fight.");
                $(".approve-all-btn").prop("selectedIndex", 0);
                $('.select2').select2();
            }
            else {
                $("#myModalsuccess").modal('show');
            }
        },
        bindMedicalSubmit = function () {

            $("#cancelapprove").click(function () {
                $("#myModalsuccess").modal('hide');
            });

            $("#approvesubmission").click(function () {
                let userids = [];
                $(".approve-fight-for-medical-record input[type='checkbox']:checked").each(function () {
                    userids.push($(this).closest(".fighter-block").find('.f-row .fighter-id').text());
                    userids.push($(this).closest(".fighter-block").find('.o-row .fighter-id').text());
                });

                userids = userids.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });

                let useridsData = "";

                if (userids.length > 0) {
                    for (let i = 0; i < userids.length; i++) {
                        if (i === userids.length - 1) {
                            useridsData += userids[i];
                        }
                        else {
                            useridsData += userids[i] + ",";
                        }
                    }
                }

                let message = $("#messageId").val();
                let model = {};
                model.UserIds = useridsData;
                model.Message = message;
                model.FederationId = $("#federationId").val();

                if (message !== "" && userids.length > 0) {
                    $("#myModalsuccess").modal('hide');
                    app.showLoader();
                    var url = "/medical/approveAllFightersForMedicalRecord";
                    app.fetchPost(url, model, function (html) {
                        app.hideLoader();
                        if (html === null || html === "") {
                            alert("Approve all fights successfully.");
                            $("input[name='approve-fight-for-medical-record']").prop("checked", false);
                        }
                        else {
                            alert(html);
                        }
                    });
                }
                else {
                    alert("Please fill fields message and suspendeduntill.");
                }
            });
        },
        getFights = function (isClick, reset) {
            const eventid = $("#eventId").val();
            var url = `/events/GetFighterCountAccordingWeightClass?eventId=${eventid}`;
            app.fetch(url, function (result) {
                if (result != null && result.length > 0) {
                    $.each(result, function (index, value) {
                        if (value.noOfFighters > 0) {
                            const weightValue = $(`#WeightclassDrp option[value=${value.weightClassId}]`);
                            weightValue.text(`${value.name} (${value.noOfFighters})`);
                        }
                    });
                }

                if (isClick) {
                    if ($("#WeightclassDrp option:selected").val() == undefined) {
                        alert("Please select weight class !!");
                        return;
                    }
                }
                //app.showLoader();
                var NumberofFightdifference = $("#NumberofFightdifference").val();
                var NumberOfFights = $("#NumberOfFights").val();
                var model = {};
                model.NumberofFightdifference = NumberofFightdifference;
                model.NumberOfFights = NumberOfFights;
                model.EventId = eventid;
                model.isClick = isClick;
                model.ResetFight = reset;
                model.WeightClassId = $("#WeightclassDrp option:selected").index() > 0 ? $("#WeightclassDrp option:selected").val() : 0;
                model.FightClassId = $("#ClassesDrp option:selected").index() > 0 ? $("#ClassesDrp option:selected").val() : 0;
                model.OrderBy = $("#OrderBy").val();
                url = "/events/eventfightsreroll";
                app.fetchPost(url, model, function (html) {
                    $(".event-sec.fight-mixing-page ").removeClass("fight-max-height");
                    $('.mixingfighterslist').html(html);

                    app.applyNiceScroll($(".mixingfighterslist .scrollbar-dynamic"));
                    app.applyNiceScroll($("tbody").not(".NotScrollable"));

                    getFightersList(1);
                    RefreshErrorMessageBox();

                    let NoOfFights = $("#NoOfFights").val();
                    let NoOfFightdifference = $("#NoOfFightdifference").val();

                    $("#NumberofFightdifference option[value='" + NoOfFightdifference + "']").prop("selected", true);
                    $("#NumberOfFights option[value='" + NoOfFights + "']").prop("selected", true);

                    $("#FilterUnassignedFighter option[value='" + $("#OrderBy").val() + "']").prop("selected", true);
                    $('.select2').select2();
                    searchFighters();
                    checkboxSelect();
                    setCheckBoxId();
                    addSendMailSection();
                    selectAllCheckBox();

                    $(".approve-all-btn").change(function () {
                        if ($(this).val() === "medical") {
                            approveAllFightsForMedicalRecord();
                        }
                        else if ($(this).val() === "fight") {
                            approveFighterForFight();
                        }
                    });

                    $(".mixingfighterslist .box-drag").sortable({
                        placeholder: "ui-sortable-placeholder",
                        //items: "tr:not(.not-shortable)",
                        update: function (event, ui) {
                            var i = 1;
                            $(this).sortable();
                            $(this).find("tr td .swap-btn span").each(function () {
                                $(this).text(i++ + ".");
                            });
                        }
                    });

                    $(".mixingfighterslist .box-drag").disableSelection();

                    window.startPos = window.endPos = {};

                    makeDroppable();

                    makeDraggable();

                    FilterUnAssignedFighter();

                    deleteFightRow();
                    lockedFightRow();

                    $(".mixingfighterslist .add-btn").click(function () {
                        var isEmptyRowExisted = false;
                        $(".assign-fight-sec tbody tr").each(function () {
                            if ($(this).find(".f-row .fighter-id").text() === "" || $(this).find(".o-row .fighter-id").text() === "") {
                                isEmptyRowExisted = true;
                            }
                        });

                        if (!isEmptyRowExisted) {
                            var totalRow = parseInt($(".mixingfighterslist .assign-fight-sec tbody tr").length) + 1;
                            var RowHtml = "";
                            RowHtml += `<tr data-app='` + $("#WeightclassDrp option:selected").val() + `' data-order='0' class='fighter-block'>
	                                    <td>
		                                    <div class='menu-img swap-btn'>
			                                    <img src='/backend-assets/img/menu.svg'>
			                                    <span>`+ totalRow + `.</span>
		                                    </div>
	                                    </td>
	                                    <td data-label='fighter' class='f-row'>
		                                    <div class='drophere ui-droppable'>
			                                    <div class='draghere-item draghere ui-draggable ui-draggable-handle'>
				                                    <div class='fighter-sec frcs fapproved'>
					                                    <div class='fighter-detail'>
						                                    <div class='status'>
							                                    <p><span></span></p>
						                                    </div>
						                                    <span class='fighter-id' style='display:none'></span>
						                                    <span class='club-id' style='display:none'></span>
						                                    <span class='fight-class-id' style='display:none'></span>
						                                    <a href='javascript:void(0);'><h5></h5></a>
					                                    </div>
				                                    </div>
			                                    </div>
		                                    </div>
	                                    </td>
	                                    <td><h4>VS</h4></td>
	                                    <td data-label='opp-fighter' class='o-row'>
		                                    <div class='drophere ui-droppable'>
			                                    <div class='draghere-item draghere ui-draggable ui-draggable-handle'>
				                                    <div class='fighter-sec frcs fapproved'>
					                                    <div class='fighter-detail'>
						                                    <div class='status'>
							                                    <p><span></span></p>
						                                    </div>
						                                    <span class='fighter-id' style='display:none'></span>
						                                    <span class='club-id' style='display:none'></span>
						                                    <span class='fight-class-id' style='display:none'></span>
						                                    <a href='javascript:void(0);'><h5></h5></a>
					                                    </div>
				                                    </div>
			                                    </div>
		                                    </div>
	                                    </td>
	                                    <td></td>
	                                    <td>
	                                    </td>
                                    </tr>`;

                            $(".mixingfighterslist tbody").append(RowHtml);

                            app.hideLoader();

                            makeDroppable();

                            makeDraggable();
                            checkboxSelect();
                            setCheckBoxId();
                            deleteRowCurrent($(".mixingfighterslist tbody tr:last"));
                        }
                        else {
                            alert("Empty row already added !!");
                        }
                    });

                    $(".box-resize-btn button").click(function () {
                        let height = $(".inner-block.unassigned-Fighters").outerHeight();
                        if ($(this).text().toLowerCase() === "maximise") {
                            $(this).text("minimise");
                            TweenMax.to(".inner-block.unassigned-Fighters", 1, {
                                height: height + 200
                            });
                            $("#unassignedBlockH").addClass("max-size");
                            $(".fight-mixing-page").addClass("fight-max-height");
                        }
                        else {
                            $(this).text("maximise");
                            TweenMax.to(".inner-block.unassigned-Fighters", 1, {
                                height: height - 200
                            });
                            $("#unassignedBlockH").removeClass("max-size");
                            $(".fight-mixing-page").removeClass("fight-max-height");
                            setTimeout(function () {
                                $(".inner-block.unassigned-Fighters").removeClass("max-size");
                            }, 1000);
                        }
                        $(".fight-mixing-sec").getNiceScroll().resize();
                    });

                    deleteUnassignedFighter();
                    $(".save-data-btn").click(function () {
                        let btnId = $(this).attr('id');
                        saveData(btnId);
                    });

                    $(".win-action-sec select").change(function () {
                        let approvedList = $(this).closest(".approved-list");
                        let trIndex = approvedList.attr('data-id');
                        let winnerId = 0, result = 0, isOk = false,
                            fightClassId = approvedList.find(".o-row .fight-class-id").text(),
                            weightClassId = approvedList.find(".f-row .weight-class-id").text();
                        if ($(this).find("option:selected").index()) {
                            if (approvedList.find(".f-row .fighter-winner-sec input:checked").val() !== undefined) {
                                winnerId = approvedList.find(".f-row .fighter-id").text();
                            }
                            if (approvedList.find(".o-row .fighter-winner-sec input:checked").val() !== undefined) {
                                winnerId = approvedList.find(".o-row .fighter-id").text();
                            }

                            if (winnerId !== 0) {
                                result = $(this).find("option:selected").val();
                                isOk = true;
                            }
                            else {
                                alert("Please select winner fighter");
                                $(this).find("option:eq(0)").prop('selected', true);
                                $(this).select2();
                                isOk = false;
                            }

                            if (isOk) {
                                if (approvedList.find(".round-number-sec select option:selected").val() == "") {
                                    alert("Please select round number.");
                                    $(this).find("option:eq(0)").prop('selected', true);
                                    $(this).select2();
                                    isOk = false;
                                }
                            }
                        }
                        else {
                            approvedList.find(".f-row .fighter-winner-sec input").prop("checked", false);
                            approvedList.find(".o-row .fighter-winner-sec input").prop("checked", false);
                            isOk = true;
                        }

                        if (isOk) {
                            app.showLoader();
                            let model = {};

                            var SetResult = {
                                "Fighter1Id": approvedList.find(".f-row .fighter-id").text(),
                                "Fighter2Id": approvedList.find(".o-row .fighter-id").text(),
                                "OrderNumber": trIndex,
                                "WinnerId": winnerId,
                                "Fights1ClubId": approvedList.find(".f-row .club-id").text(),
                                "Fights2ClubId": approvedList.find(".o-row .club-id").text(),
                                "EndingId": result,
                                "WeightClassId": weightClassId,
                                "FightClassId": fightClassId,
                                "RoundNumber": approvedList.find(".round-number-sec select option:selected").val()
                            };

                            model.EventId = $("#eventId").val();
                            model.SetResult = SetResult;
                            model.IsSetResult = true;

                            var url = "/events/updateeventfight";
                            app.fetchPost(url, model, function () {
                                getFights();
                            });
                        }
                    });

                    statisticsPopup();
                });
            });
        },
        statisticsPopup = function () {
            $(".statisticsBtn").click(function () {
                var bodyContent = $(this).parent().find(".statistics-block").html();
                $("#FighterStatistics .fighter-statistics-list").html(bodyContent);
                $("#FighterStatistics").modal('show');
            });
            $("#FighterStatistics").modal('hide');
        },
        saveData = function (btnId) {
            var wcId = $("#WeightclassDrp option:selected").val();
            var eventid = $("#eventId").val();
            var weightClassId = wcId;
            var SaveData = [];

            var fightClassId = $("#ClassesDrp").val();

            let isEmpty = false, ErrorMessage = "", AllWeightClassId = [];
            $(".mixingfighterslist .assign-fight-sec tbody tr").each(function () {
                var AssignWeightClassId = $(this).attr('data-app');
                AssignWeightClassId = AssignWeightClassId == 0 ? $(this).find(".f-row").find(".weight-class-id").text() : AssignWeightClassId;
                weightClassId = weightClassId == 0 ? AssignWeightClassId : weightClassId;
                var isExistedElement = false;
                if (AllWeightClassId.length > 0) {
                    for (var l = 0; l < AllWeightClassId.length; l++) {
                        if (AllWeightClassId[l] === AssignWeightClassId) {
                            isExistedElement = true;
                        }
                    }
                }

                if (!isExistedElement) {
                    AllWeightClassId.push(AssignWeightClassId);
                    assignedFighterJSON = [];
                    i = 1;
                    $(".mixingfighterslist tbody tr").each(function () {

                        var wClassId = $(this).attr('data-app');
                        wClassId = wClassId == 0 ? $(this).find(".f-row").find(".weight-class-id").text() : wClassId;
                        if (AssignWeightClassId === wClassId) {
                            let Fighter1Id = $(this).find(".f-row").find(".fighter-id").text();
                            let Fighter2Id = $(this).find(".o-row").find(".fighter-id").text();
                            let Fighter1ClubId = $(this).find(".f-row").find(".club-id").text();
                            let Fighter2ClubId = $(this).find(".o-row").find(".club-id").text();
                            let Fighter1ApprovedClass = $(this).find(".f-row").find(".status");
                            let Fighter2ApprovedClass = $(this).find(".o-row").find(".status");
                            let Fighter1Approved = false, Fighter2Approved = false;

                            if (Fighter1ApprovedClass.hasClass("approved")) {
                                Fighter1Approved = true;
                            }
                            if (Fighter2ApprovedClass.hasClass("approved")) {
                                Fighter2Approved = true;
                            }

                            let winnerFighter = $(this).find(".fighter-winner-sec input:checked").length;
                            let WinnerId = 0;
                            if (winnerFighter === 1) {
                                WinnerId = $(this).find(".fighter-winner-sec input:checked").val();
                            }

                            let IsFightLocked = $(this).hasClass("locked-fight") ? true : false;

                            let EndingId = $(this).find(".win-action-sec select option:selected").index();

                            if (EndingId > 0) {
                                EndingId = $(this).find(".win-action-sec select option:selected").val();
                            }
                            else {
                                EndingId = null;
                            }

                            if (WinnerId !== 0) {
                                if (EndingId === null) {
                                    isEmpty = true;
                                    ErrorMessage = "Please select result for winner fighter and result !!";
                                    $(this).addClass("error");
                                }
                                else {
                                    $(this).removeClass("error");
                                }
                            }
                            var FighterJSON = {
                                "Fighter1Id": Fighter1Id,
                                "Fighter2Id": Fighter2Id,
                                "OrderNumber": wcId === "" ? ($(this).index() + 1) : $(this).attr("data-order"),
                                "ApprovedBy": loginUserID,
                                "Fighter1Approve": Fighter1Approved,
                                "Fighter2Approve": Fighter2Approved,
                                "EventId": eventid,
                                "WinnerId": WinnerId,
                                "IsFightLocked": IsFightLocked,
                                "Fights1ClubId": Fighter1ClubId,
                                "Fights2ClubId": Fighter2ClubId,
                                "EndingId": EndingId,
                                "Fighter1FightClassId": $(this).find(".f-row").find(".fight-class-id").text(),
                                "Fighter2FightClassId": $(this).find(".o-row").find(".fight-class-id").text(),
                                "Id": $(this).attr("data-id"),
                                "RoundNumber": $(this).attr("data-round")
                            };

                            if (Fighter1Id === "" && Fighter2Id === "") {
                                //assignedFighterJSON.push(FighterJSON);
                            }
                            else {
                                assignedFighterJSON.push(FighterJSON);
                            }

                            if ((Fighter1Id === "" && Fighter2Id !== "") || (Fighter1Id !== "" && Fighter2Id == "")) {
                                isEmpty = true;
                                ErrorMessage = "Please fill empty box in assigned fighters!!";
                            }
                        }
                    });
                    var AssignFighterJSONData = {
                        "WeightClassId": AssignWeightClassId,
                        "FightClassId": fightClassId,
                        "Data": assignedFighterJSON
                    };
                    SaveData.push(AssignFighterJSONData);
                }
            });

            if (!isEmpty) {
                app.showLoader();

                var model = {};
                model.EventId = eventid;
                if (btnId === "SaveChanges") {
                    model.EventPublished = false;
                }
                if (btnId === "SaveAndPublished") {
                    model.EventPublished = true;
                }
                if (fightClassId === "") {
                    model.IsUpdateReorder = true;
                }
                model.SaveData = SaveData;
                model.WeightClassId = weightClassId;
                var url = "/events/updateeventfight";
                app.fetchPost(url, model, function () {
                    if (btnId === "SaveChanges") {
                        alert("You have successfully saved this event.");
                    }
                    else if (btnId === "SaveAndPublished") {
                        alert("You have successfully saved and published this event.");
                    }
                    getFights(false, false);
                });
            }
            else {
                if (btnId === "SaveChanges" || btnId === "SaveAndPublished") {
                    alert.text(ErrorMessage);
                }

                app.hideLoader();
            }
        },
        deleteUnassignedFighter = function () {
            $(".unassigned-box-sec .unassigned-box .delete-fighter").click(function () {
                const removeableRow = $(this).closest(".unassigned-box");
                let model = {};
                model.EventId = $("#eventId").val();
                model.FighterId = removeableRow.find(".fighter-id").text();
                model.ClubId = removeableRow.find(".club-id").text();
                model.WeightClassId = removeableRow.find(".weight-class-id").text();
                model.FightClassId = removeableRow.find(".fight-class-id").text();
                app.showLoader();
                var url = "/events/deletefighters";
                app.fetchPost(url, model, function () {
                    getFights();
                });
            });
        },
        selectAllCheckBox = function () {
            $(".approve-fight-for-medical-record-col input[type='checkbox']").click(function () {
                if ($(this).prop("checked")) {
                    $(".approve-fight-for-medical-record input[type='checkbox']").prop("checked", true);
                }
                else {
                    $(".approve-fight-for-medical-record input[type='checkbox']").prop("checked", false);
                }
            });

            $(".approve-fight-for-medical-record input[type='checkbox']").click(function () {
                var allSelected = true;
                $(".approve-fight-for-medical-record input[type='checkbox']").each(function () {
                    if (!$(this).prop("checked")) {
                        allSelected = false;
                    }
                });

                $(".approve-fight-for-medical-record-col input[type='checkbox']").prop("checked", allSelected);
            });
        },
        setCheckBoxId = function () {
            let idCounter = 1;
            $(".fighter-winner-sec input[type='checkbox']").each(function () {
                let id = $(this).attr('id') + "-" + (idCounter++);
                $(this).attr('id', id);
                $(this).parent().find('label').attr('for', id);
            });

            idCounter = 1;
            $(".approve-fight-for-medical-record input[type='checkbox']").each(function () {
                let id = $(this).attr('id') + "-" + (idCounter++);
                $(this).attr('id', id);
                $(this).parent().find('label').attr('for', id);
            });
        },
        checkboxSelect = function () {
            $(".fighter-winner-sec input[type='checkbox']").click(function () {
                let c = $(this).closest('td').hasClass('f-row') ? ".o-row .fighter-winner-sec input" : ".f-row .fighter-winner-sec input";
                let o = $(this).closest('tr').find(c);
                if (o.prop("checked") === true) {
                    o.prop("checked", false);
                    $(this).prop("checked", true);
                }
                else {
                    if ($(this).prop("checked") === false) {
                        $(this).prop("checked", false);
                    }
                    else {
                        $(this).prop("checked", true);
                    }
                }
            });
        },
        deleteFightRow = function () {
            $(".mixingfighterslist .assign-fight-sec tr .dlt-fight-row-btn").click(function () {
                deleteRow($(this));
            });
        },
        lockedFightRow = function () {
            $(".mixingfighterslist .assign-fight-sec tr .locked-fight-row-btn").click(function () {
                lockedRow($(this));
            });
        },
        lockedRow = function (id) {
            app.showLoader();
            var eventid = $("#eventId").val();
            var fighterExistedId1, fighterExistedClubId1;
            var fighterExistedId2, fighterExistedClubId2;
            $(id).closest("tr").find("td").each(function () {
                if ($(this).hasClass("f-row")) {
                    fighterExistedId1 = $(this).find(".fighter-id").text();
                    fighterExistedClubId1 = $(this).find(".club-id").text();
                }
                if ($(this).hasClass("o-row")) {
                    fighterExistedId2 = $(this).find(".fighter-id").text();
                    fighterExistedClubId2 = $(this).find(".club-id").text();
                }
            });
            var model = {};
            model.EventId = eventid;
            model.Fighter1Id = fighterExistedId1;
            model.Fighter2Id = fighterExistedId2;
            model.Fighter1clubId = fighterExistedClubId1;
            model.Fighter2clubId = fighterExistedClubId2;
            model.IsLockedFight = !$(id).closest('tr').hasClass("not-shortable");
            model.WeightClassId = $("#WeightclassDrp option:selected").val();
            model.OrderNumber = $(id).closest("tr").attr("data-id");
            var url = "/events/eventfightslocked";
            app.fetchPost(url, model, function () {
                getFights(false, false);
            });
        },
        deleteRow = function (id) {
            if ($(id).closest("tr").find(".f-row .fighter-id").text() !== "" && $(id).closest("tr").find(".o-row .fighter-id").text() !== "") {
                let trIndex = $(id).closest("tr").attr("data-id");
                let model = {};
                model.EventId = $("#eventId").val();
                model.OrderNumber = trIndex;
                model.WeightClassId = $(id).closest("tr").find(".f-row .weight-class-id").text();
                model.IsDeleteFight = true;
                console.log(model);
                app.showLoader();
                var url = "/events/updateeventfight";
                app.fetchPost(url, model, function () {
                    getFights();
                });
            }
            else {
                getFights();
            }
        },
        deleteRowCurrent = function (id) {
            $(id).find(".dlt-fight-row-btn").click(function () {
                deleteRow(this);
            });
        },
        FilterUnAssignedFighter = function () {
            $("#FilterUnassignedFighter").change(function () {
                var assignedFighterId = 0;
                $(".middle-sec .inner-block tbody tr").each(function () {
                    const fTd = $(this).find(".f-row");
                    const oTd = $(this).find(".o-row");
                    const fFighterId = fTd.find(".fighter-id").text();
                    const oFighterId = oTd.find(".fighter-id").text();

                    if (!(fFighterId === "" && oFighterId === "")) {
                        if (fFighterId === "" || oFighterId === "") {
                            assignedFighterId = fFighterId !== "" ? parseInt(fFighterId) : parseInt(oFighterId);
                        }
                    }
                });

                $("#OrderBy").val($(this).val());
                app.showLoader();
                var model = {};
                var eventId = $("#eventId").val();
                model.EventId = eventId;
                model.WeightClassId = $("#WeightclassDrp").val();
                model.OrderBy = $(this).val();
                model.IsAnyWinner = $("#IsAnyWinner").val() == 1 ? true : false;
                model.Status = $("#Status").val();
                model.FightClassId = $("#ClassesDrp").val();
                model.AssignFighterId = assignedFighterId;

                var url = "/events/filterunassignedfighter";
                app.fetchPost(url, model, function (html) {
                    $(".Unassigned-Fighter-Sec .fighters-sec").html(html);
                    app.applyNiceScroll($(".Unassigned-Fighter-Sec .scrollbar-dynamic"));

                    var i = 0;
                    $(".Unassigned-Fighter-Sec .scrollbar-dynamic").mouseover(function () {
                        if (i++ === 0) {
                            $(".Unassigned-Fighter-Sec .scrollbar-dynamic").getNiceScroll().resize();
                        }
                    });

                    deleteUnassignedFighter();
                    statisticsPopup();
                    makeDraggable();
                    makeDroppable();
                    app.hideLoader();
                    statisticsPopup();
                });
            });
        },
        makeDroppable = function () {
            $('.mixingfighterslist .drophere').droppable({
                cursor: "move",
                hoverClass: "drag-hover-class",
                zIndex: 99999,
                drop: function (event, ui) {
                    var $from = $(ui.draggable),
                        $fromParent = $from.parent(),
                        $to = $(this).children(),
                        $toParent = $(this);

                    window.endPos = $to.offset();

                    swap($from, $from.offset(), window.endPos, 0);
                    swap($to, window.endPos, window.startPos, 0, function () {
                        $toParent.html($from.css({ position: 'relative', left: '', top: '', 'z-index': '' }));
                        $fromParent.html($to.css({ position: 'relative', left: '', top: '', 'z-index': '' }));
                        makeDraggable();
                    });

                    $(".mixingfighterslist .draghere").draggable("option", "revert", "invalid");

                    statisticsPopup();
                }
            });
        },
        makeDraggable = function () {
            $('.mixingfighterslist .draghere').draggable({
                scroll: false,
                zIndex: 99999,
                revert: 'invalid',
                appendTo: 'body',
                containment: 'body',
                helper: 'clone',
                start: function (event, ui) {
                    window.startPos = $(this).offset();
                    ui.helper.css("background", "#fff");
                },
                stop: function (event, ui) {
                    ui.helper.css({ "background": "none", "z-index": "0" });

                    setTimeout(function () {
                        saveData();
                    }, 500);
                }
            });
        },
        addApprovelClass = function () {
            $(".mixingfighterslist tbody tr").each(function () {
                var Fighter1Approved = $(this).find(".f-row").find(".fapproved");
                var Fighter2Approved = $(this).find(".o-row").find(".fapproved");

                if (Fighter1Approved.hasClass("approved") && Fighter2Approved.hasClass("approved")) {
                    $(this).addClass("approved-list");
                    $(this).find(".fighter-winner-sec").show();
                    $(this).find(".win-action-sec").show();
                }
                else {
                    $(this).removeClass("approved-list");
                    $(this).find(".fighter-winner-sec").hide();
                    $(this).find(".win-action-sec").hide();
                }
            });
        },
        RefreshErrorMessageBox = function () {
            $('.select-radio-block .dropdown .dropdown-menu input').click(function () {
                $(this).closest('.select-radio-block').find("#dropdownMenuButton .custom-radio label").text($(this).siblings().text());
                if ($(this).parent().attr('data-id') != "" && $(this).parent().attr('data-id') != null)
                    $(this).closest(".dropdown").find(".dropdown-toggle").removeClass('input-validation-error');
            });

            $('select#ClassessDrp').change(function () {
                if ($(this).val() != "") {
                    $(this).removeClass('input-validation-error');
                }
            });
        },
        swap = function ($el, fromPos, toPos, duration, callback) {
            $el.css('position', 'absolute')
                .css(fromPos)
                .animate(toPos, duration, function () {
                    if (callback) {
                        callback();

                        addApprovelClass();

                        $(".mixingfighterslist .unassigned-box-sec .dro").each(function () {
                            var unassignedFighterId = $(this).find(".fighter-id").text();
                            if (unassignedFighterId === "" || unassignedFighterId === null) {
                                $(this).remove();
                            }
                        });

                        let totalFighter = 0;
                        $(".mixingfighterslist .unassigned-box-sec .dro").each(function () {
                            totalFighter++;
                        });

                        let text = totalFighter > 0 ? "(" + totalFighter + ")" : "";

                        $(".mixingfighterslist .unassigned-Fighters .top h2").text("Unassigned Fighters " + text);

                        checkboxSelect();
                        setCheckBoxId();
                    }
                });
        };
    return {
        init: init,
        Pagination: Pagination,
        RereshPageIndex: RereshPageIndex
    };
}();