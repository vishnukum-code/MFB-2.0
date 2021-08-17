var createFightMixing = function () {
    var on, ft, swapTo, swapFrom, drawSecIdsList = [],
        drawCounter = 0, totalDraw = 0,
        init = function () {
            bindData();
        },
        getWeightClass = function (fightClassId) {
            app.showLoader();
            const tournamentId = $("#tournamentId").val();
            fightClassId = fightClassId === undefined ? "" : fightClassId;
            const url = `/tournaments/getWeightClassByFightClassId?fightClassIds=${fightClassId}&tournamentId=${tournamentId}`;
            $.getJSON(url, function (data) {
                var itemsWeightClass = "";
                //Weight Class Id
                var weightClassContainer = $("#WeightClassId1");
                //Fight Class ID
                const selectedWeightClassIds = $("#ClassesDrp").val();
                itemsWeightClass += `<option value='0' data-subtext='(Select Weight Class)'>Select Weight Class</option>`;
                $.each(data.weightclass,
                    function (i, classes) {
                        itemsWeightClass += `<option value='${classes.id}'>${classes.name} (${classes.totalFighters})</option>`;
                    });
                weightClassContainer.html(itemsWeightClass);
                if (selectedWeightClassIds !== "" && selectedWeightClassIds !== undefined) {
                    $(".NumberOfFightsDiv").hide();
                    weightClassContainer.removeAttr("disabled");
                    $.each(selectedWeightClassIds.split(","),
                        function (i, e) {
                            weightClassContainer.find(`option[value='${e}']`).prop("selected", true);
                        });
                }
                if (data.weightclass !== null && data.weightclass.length > 0) {
                    weightClassContainer.removeAttr("disabled");
                } else {
                    weightClassContainer.attr("disabled", "disabled");
                }
                weightClassContainer.select2();

                app.hideLoader();
            });
        },
        showHideWeightClass = function ($parent) {
            var weightClassList = [];
            $parent.find("#WeightclassDrp option").each(function () {
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

            $parent.find("#FightClassId").change(function () {
                const fightClassId = $(this).val();
                const weightclassDrp = $parent.find("#WeightclassDrp");
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
        bindData = function () {

            $(window).load(function () {
                $("body").addClass('membership-table-dropdown');
            });

            getFights();
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
        addSingleFigherForSeed = function () {
            $("#FighterListModel .add-fighter").click(function () {
                var closest = $(this).closest(".table-main-sec").find(".fighter-list input[name='addFighter']:checked").closest(".row-block");
                var Fighters = closest.find("input[name='addFighter']:checked").val();
                let ClubId = closest.find(".clubids").val();
                let isFighterActive = closest.find(".isfighteractive").val();
                let isOk = true;
                let WeightClassIdForFighter1 = closest.find(".dropdown .dropdown-menu input:checked").val();
                let FightClassIdForFighter = closest.find("#ClassessDrp").val();
                let fighterName = closest.find("input[name='addFighter']:checked").siblings().text();

                $("#FighterListModel").find(".fighter-list .row-block  .form-control#ClassessDrp").removeClass("input-validation-error");
                $("#FighterListModel").find(".fighter-list .row-block  .dropdown-toggle").removeClass("input-validation-error");

                if (Fighters === "" || Fighters === null || Fighters === undefined) {
                    isOk = false;
                    alert("Please select fighter");
                }
                else if (isFighterActive == 0) {
                    isOk = false;
                    alert("This fighter is inactive for this federation.");
                }
                else if (FightClassIdForFighter === "" || FightClassIdForFighter === null || FightClassIdForFighter === undefined) {
                    isOk = false;
                    closest.find("#ClassessDrp").addClass("input-validation-error");
                    alert("Please select fight class for selected fighter");
                }
                else if (WeightClassIdForFighter1 === "" || WeightClassIdForFighter1 === null || WeightClassIdForFighter1 === undefined) {
                    isOk = false;
                    alert("Please select weight class for selected fighter");
                    closest.find(".dropdown-toggle").addClass("input-validation-error");
                }

                if (isOk) {
                    if (Fighters !== null && Fighters !== "") {
                        let isExist = false;

                        $(".unassigned-block .unassigned-box-sec .unassigned-box").each(function () {
                            if ($(this).find(".fighter-id").text() === Fighters && $(this).find(".weight-class-id").text() === WeightClassIdForFighter1 && $(this).find(".fight-class-id").text() === FightClassIdForFighter) {
                                isExist = true;
                            }
                        });

                        $(".Draw-Sec .FBlock .Draw-Block").each(function () {
                            if ($(this).find(".inner-block.first .fighter-id").text() === Fighters && $(this).find(".inner-block.first .weight-class-id").text() === WeightClassIdForFighter1 && $(this).find(".inner-block.first .fight-class-id").text() === FightClassIdForFighter) {
                                isExist = true;
                            }
                            if ($(this).find(".inner-block.second .fighter-id").text() === Fighters && $(this).find(".inner-block.second .weight-class-id").text() === WeightClassIdForFighter1 && $(this).find(".inner-block.second .fight-class-id").text() === FightClassIdForFighter) {
                                isExist = true;
                            }
                        });

                        if (!isExist) {
                            app.showLoader();

                            $("#FighterListModel").modal('hide');
                            $("#" + Fighters).prop("checked", false);
                            var tournamentId = $("#tournamentId").val();
                            var model = {};
                            model.TournamentId = tournamentId;
                            model.IsAddFighterFromPopup = true;
                            model.Fighters = Fighters;
                            model.OrderNumber = on;
                            model.FighterType = ft;
                            model.WeightClassIdForFighter = WeightClassIdForFighter1;
                            model.WeightClassId = $(".datawcId").val();
                            model.ClubIds = ClubId;
                            model.FightClassIdForFighter = FightClassIdForFighter;
                            console.log(model);
                            var url = "/tournaments/addfightersindatatable";
                            app.fetchPost(url, model, function (result) {
                                FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                            });
                        }
                        else {
                            alert(fighterName + " is already existed in this tournament !!");
                        }
                    }
                }
            });
        },
        addMultipleFigherForSeed = function () {
            $("#MultipleFighterListModel .add-fighter").click(function () {
                var Fighters = [];
                let isAllSelectedWeight = true, isAllSelectedClass = true, ClubIds = [];
                let inactiveFighters = "";
                let inactiveFighterCount = 0;

                $("#MultipleFighterListModel .fighter-list").find(".row-block .dropdown-toggle").removeClass("input-validation-error");
                $("#MultipleFighterListModel .fighter-list").find(".row-block #ClassessDrp").removeClass("input-validation-error");

                $.each($("#MultipleFighterListModel .fighter-list .chk_fighters:checked"), function () {
                    let WeightClassIdForFighter = $(this).closest(".row-block").find(".dropdown .dropdown-menu input:checked").val();
                    let FightClassIdForFighter = $(this).closest(".row-block").find("#ClassessDrp").val();

                    let isFighterActive = $(this).closest(".row-block").find(".isfighteractive").val();

                    if (isFighterActive == 0 || isFighterActive == "0") {
                        allFightersAreActive = false;
                        inactiveFighterCount++;
                        if (inactiveFighters == "") {
                            inactiveFighters = $(this).closest(".row-block").find(".chk-block .custom-control-label").text();
                        }
                        else {
                            inactiveFighters += ", " + $(this).closest(".row-block").find(".chk-block .custom-control-label").text();
                        }
                    }

                    if (WeightClassIdForFighter === "" || WeightClassIdForFighter === null || WeightClassIdForFighter === undefined) {
                        isAllSelectedWeight = false;
                        $(this).closest(".row-block").find(".dropdown-toggle").addClass("input-validation-error");
                    }

                    if (FightClassIdForFighter === "" || FightClassIdForFighter === null || FightClassIdForFighter === undefined) {
                        isAllSelectedClass = false;
                        $(this).closest(".row-block").find("#ClassessDrp").addClass("input-validation-error");
                    }

                    let fighterJson = {
                        "Id": $(this).val(),
                        "Name": $(this).siblings().text(),
                        "WeightClassIdForFighter": WeightClassIdForFighter,
                        "FightClassIdForFighter": FightClassIdForFighter
                    };
                    Fighters.push(fighterJson);
                    ClubIds.push($(this).closest(".row-block").find('.clubids').val());
                });

                console.log(Fighters);

                let isOk = true;

                if (Fighters.length === 0) {
                    isOk = false;
                    alert("Please select fighters");
                }
                else if (inactiveFighterCount > 0) {
                    isOk = false;
                    if (inactiveFighterCount > 1)
                        alert(inactiveFighters + " these fighters are inactive for this federation.");
                    else
                        alert(inactiveFighters + " this fighter is inactive for this federation.");
                }
                else if (!isAllSelectedWeight) {
                    isOk = false;
                    alert("Please select weight class for selected fighters");
                }
                else if (!isAllSelectedClass) {
                    isOk = false;
                    alert("Please select fight class for selected fighters");
                }

                if (isOk) {
                    var isIdExisted = false;
                    var ExistedFighters = "", ExistedFightersCount = 0;

                    for (let i = 0; i < Fighters.length; i++) {
                        $(".unassigned-block .unassigned-box-sec .unassigned-box").each(function () {
                            if ($(this).find(".fighter-id").text() === Fighters[i].Id && $(this).find(".weight-class-id").text() === Fighters[i].WeightClassIdForFighter && $(this).find(".fight-class-id").text() === Fighters[i].FightClassIdForFighter) {
                                isIdExisted = true;
                                ExistedFightersCount++;
                                if (ExistedFighters === "") {
                                    ExistedFighters += Fighters[i].Name;
                                }
                                else {
                                    ExistedFighters += ", " + Fighters[i].Name;
                                }
                            }
                        });

                        $(".Draw-Sec .FBlock .Draw-Block").each(function () {
                            if ($(this).find(".inner-block.first .fighter-id").text() === Fighters[i].Id && $(this).find(".inner-block.first .weight-class-id").text() === Fighters[i].WeightClassIdForFighter && $(this).find(".inner-block.first .fight-class-id").text() === Fighters[i].FightClassIdForFighter) {
                                isIdExisted = true;
                                ExistedFightersCount++;
                                if (ExistedFighters === "") {
                                    ExistedFighters += Fighters[i].Name;
                                }
                                else {
                                    ExistedFighters += ", " + Fighters[i].Name;
                                }
                            }
                            if ($(this).find(".inner-block.second .fighter-id").text() === Fighters[i].Id && $(this).find(".inner-block.second .weight-class-id").text() === Fighters[i].WeightClassIdForFighter && $(this).find(".inner-block.second .fight-class-id").text() === Fighters[i].FightClassIdForFighter) {
                                isIdExisted = true;
                                ExistedFightersCount++;
                                if (ExistedFighters === "") {
                                    ExistedFighters += Fighters[i].Name;
                                }
                                else {
                                    ExistedFighters += ", " + Fighters[i].Name;
                                }
                            }
                        });
                    }

                    if (!isIdExisted) {
                        let WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                        let tournamentId = $("#tournamentId").val();
                        for (let i = 0; i < Fighters.length; i++) {
                            app.showLoader();
                            let model = {};
                            model.TournamentId = tournamentId;
                            model.Fighters = Fighters[i].Id;
                            model.WeightClassIdForFighter = Fighters[i].WeightClassIdForFighter;
                            model.WeightClassId = WeightClassId;
                            model.ClubIds = ClubIds[i];
                            model.FightClassIdForFighter = Fighters[i].FightClassIdForFighter;
                            console.log(model);
                            var url = "/tournaments/addfightersindatatable";
                            app.fetchPost(url, model, function (result) {
                                FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                            });

                            $("#MultipleFighterListModel").modal('hide');
                        }
                    }
                    else {
                        if (ExistedFightersCount > 1) {
                            alert(ExistedFighters + " these fighters are already existed in this tournament !!");
                        }
                        else {
                            alert(ExistedFighters + " already existed in this tournament !!");
                        }
                    }
                }
            });
        },
        deleteUnassignedFighter = function () {
            $(".unassigned-box-sec .FighterDetail .delete-fighter").click(function () {
                let model = {};
                const removeableRow = $(this).closest(".unassigned-box");
                model.TournamentId = $("#tournamentId").val();
                model.FighterId = removeableRow.find(".fighter-id").text();
                model.WeightClassId = removeableRow.find(".weight-class-id").text();;
                model.FightClassId = removeableRow.find(".fight-class-id").text();
                model.ClubId = removeableRow.find(".club-id").text();
                app.showLoader();
                var url = "/tournaments/deletefighters";
                app.fetchPost(url, model, function () {
                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                });
            });
        },
        approveAllFightsForMedicalRecord = function () {
            $(".approve-all-medical-btn").click(function () {
                let NoOfSelectedFight = 0;
                $(".approve-fight-for-medical-record input[type='checkbox']").each(function () {
                    if ($(this).prop("checked")) {
                        NoOfSelectedFight++;
                    }
                });

                if (NoOfSelectedFight === 0) {
                    alert("Please select atleast one fight.");
                }
                else {
                    $("#myModalsuccess").modal('show');
                }
            });
            $("#myModalsuccess").modal('hide');
            $("#cancelapprove").click(function () {
                $("#myModalsuccess").modal('hide');
            });
            selectAllCheckBox();
            $("#approvesubmission").click(function () {
                let userids = [];
                $(".MainSec.FBlock .approve-fight-for-medical-record input[type='checkbox']:checked").each(function () {
                    userids.push($(this).closest(".Draw-Block").find('.inner-block.first .fighter-id').text());
                    userids.push($(this).closest(".Draw-Block").find('.inner-block.second .fighter-id').text());
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
                model.FederationId = $("input.federationId").val();

                if (message !== "" && userids.length > 0) {
                    $("#myModalsuccess").modal('hide');
                    app.showLoader();
                    var url = "/medical/approveAllFightersForMedicalRecord";
                    app.fetchPost(url, model, function (html) {
                        app.hideLoader();
                        if (html === null || html === "") {
                            alert("Approve all fights successfully.");
                            $(".approve-fight-for-medical-record input").prop("checked", false);
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
        selectAllCheckBox = function () {
            $(".approve-fight-for-medical-record-col input[type='checkbox']").click(function () {
                if ($(this).prop("checked")) {
                    $(".approve-fight-for-medical-record input[type='checkbox']").prop("checked", true);
                }
                else {
                    $(".approve-fight-for-medical-record input[type='checkbox']").prop("checked", false);
                }
            });
        },
        getFightersList = async function (WeightClassId, PageIndex) {
            await paginationForMultiFightersSeed(WeightClassId, PageIndex);
            await paginationForSingleFightersSeed(WeightClassId, PageIndex);
        },
        paginationMultiSeedFx = async function () {
            $(".pagination-btn").click(async function () {
                let index = $(this).attr("data-val");
                await paginationForMultiFightersSeed($("#WeightClassId1").val(), index);
            });
        },
        paginationSingleSeedFx = function () {
            $(".pagination-btn1").click(function () {
                let index = $(this).attr("data-val");
                paginationForSingleFightersSeed($("#WeightClassId1").val(), index);
            });
        },
        paginationForMultiFightersSeed = async function (WeightClassId, PageIndex) {
            var tournamentId = $("#tournamentId").val();
            app.showLoader();
            var model = {};
            model.TournamentId = tournamentId;
            model.WeightClassId = WeightClassId;
            model.PageIndex = PageIndex;

            var url = "/tournaments/getfighters";
            await app.fetchPost(url, model, function (html) {
                $(".multiple-fighter-list-model-content").html(html);

                $(".add-unassigned-fighters")
                    .attr("data-toggle", "modal")
                    .attr("data-target", "#MultipleFighterListModel")
                    .html("<img src='/backend-assets/img/plus-icon.svg' />");

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

                //Show Scroll on dropdown Age
                $(".form-group").on("shown.bs.dropdown", function (e) {
                    var nicelist = app.applyNiceScroll($('body').find(".dropdown-menu > .inner"));
                });

                RefreshErrorMessageBoxForM();
                showHideWeightClass($(".multiple-fighter-list-model-content"));
                enableDisableWeightClassFx();

                app.hideLoader();
                $(".filter-btn").click(function () {
                    RereshPageIndex($(this));

                    var FilterSec = $(this).closest(".filter-sec");
                    var federationid = $(".federationId").val();
                    var clubid = FilterSec.find("#ClubId").val(), WeightClasses = "";
                    $.each(FilterSec.find("#WeightclassDrp option:selected"), function () {
                        if (WeightClasses === "") {
                            WeightClasses = $(this).val();
                        } else {
                            WeightClasses = WeightClasses + "," + $(this).val();
                        }
                    });

                    let PageIndex = 0;

                    if (clubid === "" && WeightClasses === "") {
                        let pagein = $(".pagination-btn.next").attr("data-val") - 1;
                        PageIndex = pagein;
                    }

                    // Age Dropdown Get Selected List
                    var Age = "";
                    $.each($(".multiple-fighter-list-model-content #Age option:selected"), function () {
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
                    model.TournamentId = tournamentId;
                    model.PageIndex = PageIndex;
                    model.Gender = $(".multiple-fighter-list-model-content #Gender option:selected").val();;
                    model.Age = Age;
                    model.NoOfFights = $(".multiple-fighter-list-model-content #filterNoOfFights option:selected").val();
                    var url = "/tournaments/getfilteruserlist";
                    app.fetchPost(url, model, function (html) {
                        $("#MultipleFighterListModel .modal-body .fighter-list").html(html);
                        RefreshErrorMessageBoxForM();
                        enableDisableWeightClassFx();

                        var pi = $(".multiple-fighter-list-model-content #PageIndex").val();
                        var rr = $(".multiple-fighter-list-model-content #RemainingRecord").val();
                        if (parseInt(pi) > 1) {
                            $(".multiple-fighter-list-model-content #previous").css("display", "Block");
                        }
                        else {
                            $(".multiple-fighter-list-model-content #previous").css("display", "None");
                        }
                        if (parseInt(rr) > 0) {
                            $(".multiple-fighter-list-model-content #next").css("display", "Block");
                        }
                        else {
                            $(".multiple-fighter-list-model-content #next").css("display", "None");
                        }
                        app.hideLoader();
                    });
                });
                paginationMultiSeedFx();
                addMultipleFigherForSeed();
            });
        },
        paginationForSingleFightersSeed = async function (WeightClassId, PageIndex) {
            var tournamentId = $("#tournamentId").val();
            app.showLoader();
            model = {};
            model.TournamentId = tournamentId;
            model.WeightClassId = WeightClassId;
            model.PageIndex = PageIndex;

            url = "/tournaments/getfightersforseed";
            await app.fetchPost(url, model, function (html) {
                $(".fighter-list-model-content").html(html);
                RefreshErrorMessageBoxForS();
                enableDisableWeightClassFx();
                showHideWeightClass($(".fighter-list-model-content"));
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

                //Show Scroll on dropdown Age
                $(".form-group").on("shown.bs.dropdown", function (e) {
                    app.applyNiceScroll($('body').find(".dropdown-menu > .inner"));
                });

                app.hideLoader();
                $(".filter-btn1").click(function () {
                    RereshPageIndex($(this));

                    var FilterSec = $(this).closest(".filter-sec");
                    var federationid = $(".federationId").val();
                    var clubid = FilterSec.find("#ClubId").val(), WeightClasses = "";
                    $.each(FilterSec.find("#WeightclassDrp option:selected"), function () {
                        if (WeightClasses === "") {
                            WeightClasses = $(this).val();
                        } else {
                            WeightClasses = WeightClasses + "," + $(this).val();
                        }
                    });

                    let PageIndex = 0;

                    if (clubid === "" && WeightClasses === "") {
                        let pagein = $(".pagination-btn1.next").attr("data-val") - 1;
                        PageIndex = pagein;
                    }

                    // Age Dropdown Get Selected List
                    var Age = "";
                    $.each($(".fighter-list-model-content #Age option:selected"), function () {
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
                    model.TournamentId = tournamentId;
                    model.PageIndex = PageIndex;
                    model.Gender = $(".fighter-list-model-content #Gender option:selected").val();
                    model.Age = Age;
                    model.NoOfFights = $(".fighter-list-model-content #filterNoOfFights option:selected").val();
                    var url = "/tournaments/getfilteruserforseed";
                    app.fetchPost(url, model, function (html) {
                        $("#FighterListModel .modal-body .fighter-list").html(html);
                        RefreshErrorMessageBoxForS();
                        enableDisableWeightClassFx();

                        var pi = $(".fighter-list-model-content #PageIndex").val();
                        var rr = $(".fighter-list-model-content #RemainingRecord").val();
                        if (parseInt(pi) > 1) {
                            $(".fighter-list-model-content #previous").css("display", "Block");
                        }
                        else {
                            $(".fighter-list-model-content #previous").css("display", "None");
                        }
                        if (parseInt(rr) > 0) {
                            $(".fighter-list-model-content #next").css("display", "Block");
                        }
                        else {
                            $(".fighter-list-model-content #next").css("display", "None");
                        }
                        app.hideLoader();
                        paginationSingleSeedFx();
                    });
                });
                paginationSingleSeedFx();
                addSingleFigherForSeed();
            });
        },

        PaginationForSeed = function (btnType, $node) {
            var FilterSec = $($node).closest(".modal").find(".table-content .filter-sec");
            var federationid = $($node).closest(".modal").find(".federationId").val();
            var clubid = FilterSec.find("#ClubId option:selected").val(), WeightClasses = "";
            $.each(FilterSec.find("#WeightclassDrp option:selected"), function () {
                if (WeightClasses === "") {
                    WeightClasses = $(this).val();
                } else {
                    WeightClasses = WeightClasses + "," + $(this).val();
                }
            });

            var PageIndex = $($node).closest(".modal").find("#PageIndex").val();
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
            model.TournamentId = $("#tournamentId").val();
            model.PageIndex = PageIndex;
            var url = "/tournaments/getfilteruserforseed";
            console.log("model", model);
            app.fetchPost(url, model, function (html) {
                $("#FighterListModel .modal-body .fighter-list").html(html);
                RefreshErrorMessageBoxForS();
                enableDisableWeightClassFx();

                var pi = $($node).closest(".modal").find("#PageIndex").val();
                var rr = $($node).closest(".modal").find("#RemainingRecord").val();
                if (parseInt(pi) > 1) {
                    $($node).closest(".modal").find("#previous").css("display", "Block");
                }
                else {
                    $($node).closest(".modal").find("#previous").css("display", "None");
                }
                if (parseInt(rr) > 0) {
                    $($node).closest(".modal").find("#next").css("display", "Block");
                }
                else {
                    $($node).closest(".modal").find("#next").css("display", "None");
                }
                app.hideLoader();
                addSingleFigherForSeed();
                paginationSingleSeedFx();
            });
        },
        Pagination = function (btnType, $node) {
            var FilterSec = $($node).closest(".modal").find(".table-content .filter-sec");
            var federationid = $($node).closest(".modal").find(".federationId").val();
            var clubid = FilterSec.find("#ClubId option:selected").val(), WeightClasses = "";
            $.each(FilterSec.find("#WeightclassDrp option:selected"), function () {
                if (WeightClasses === "") {
                    WeightClasses = $(this).val();
                } else {
                    WeightClasses = WeightClasses + "," + $(this).val();
                }
            });

            var PageIndex = $($node).closest(".modal").find("#PageIndex").val();
            if (btnType === "Previous") {
                PageIndex = parseInt(PageIndex) - 1;
            }
            else {
                PageIndex = parseInt(PageIndex) + 1;
            }

            app.showLoader();
            var model = {};
            model.FederationId = federationid;
            model.ClubId = ((clubid == "" || clubid == null || clubid == undefined || clubid == "undefined") ? 0 : clubid);
            model.WeightClasses = WeightClasses;
            model.TournamentId = $("#tournamentId").val();;
            model.PageIndex = PageIndex;
            var url = "/tournaments/getfilteruserlist";

            console.log("model", model);

            app.fetchPost(url, model, function (html) {
                $("#MultipleFighterListModel .modal-body .fighter-list").html(html);
                RefreshErrorMessageBoxForM();
                enableDisableWeightClassFx();

                var pi = $($node).closest(".modal").find("#PageIndex").val();
                var rr = $($node).closest(".modal").find("#RemainingRecord").val();
                if (parseInt(pi) > 1) {
                    $($node).closest(".modal").find("#previous").css("display", "Block");
                }
                else {
                    $($node).closest(".modal").find("#previous").css("display", "None");
                }
                if (parseInt(rr) > 0) {
                    $($node).closest(".modal").find("#next").css("display", "Block");
                }
                else {
                    $($node).closest(".modal").find("#next").css("display", "None");
                }
                app.hideLoader();
                addMultipleFigherForSeed();
            });
        },
        RereshPageIndex = function ($node) {
            $($node).closest('.modal').find('#PageIndex').val('0');
            $($node).closest('.modal').find('#previous').css("display", "none");
        },
        makeDroppable = function () {
            $('.mixingfighterslist .drophere').not('.seed-locked').droppable({
                cursor: "move",
                hoverClass: "drag-hover-class",
                zIndex: 99999,
                drop: function (event, ui) {
                    var $from = $(ui.draggable),
                        $fromParent = $from.parent(),
                        $to = $(this).children(),
                        $toParent = $(this);

                    swapTo = $to;
                    swapFrom = $from;

                    app.showLoader();
                    updateFightAfterSwap();

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
            $('.mixingfighterslist .draghere').not('.seed-locked').draggable({
                cursor: "move",
                revert: 'invalid',
                appendTo: 'body',
                containment: 'body',
                helper: 'clone',
                zIndex: 99999,
                start: function (event, ui) {
                    window.startPos = $(this).offset();
                },
                stop: function (event, ui) {
                    statisticsPopup();
                }
            });
        },
        swap = function ($el, fromPos, toPos, duration, callback) {
            $el.css('position', 'absolute')
                .css(fromPos)
                .animate(toPos, duration, function () {
                    if (callback) {
                        callback();
                    }
                });
        },
        searchFighters = function () {
            $("input#SearchBox").on("keyup", function () {
                var value = $(this).val();
                if (value == "") {
                    $(".flow-chart-draw-main.Draw-Sec .FighterDetail").removeClass("heighlight-box");
                    return false;
                }
                $(".flow-chart-draw-main.Draw-Sec .FighterDetail").each(function () {
                    if ($(this).find("a.fighter-name").text().toLowerCase().indexOf(value.toLowerCase()) > -1) {
                        $(this).addClass("heighlight-box");
                    }
                    else {
                        $(this).removeClass("heighlight-box");
                    }
                });
            });
        },
        setAction = function ($this) {
            lockUnlockSeed();
            removeFighter();
            awardWinFx($this);
            clearWinnerResult();
            statisticsPopup();
        },
        lockUnlockSeed = function () {
            $(".Draw-Block .main-block .dropdown .dropdown-menu .lockunlockaction").click(function () {
                app.showLoader();
                var lock = false;
                if ($(this).closest(".main-block").hasClass('seed-locked')) {
                    lock = false;
                }
                else {
                    lock = true;
                }

                assignedFighterJSON = [];

                var FighterJSON = {
                    "OrderNumber": $(this).closest(".main-block").find(".FighterDetail .order-no").text(),
                    "ApprovedBy": $("#loginUserID").val(),
                    "RoundNo": $(this).closest(".main-block").find(".FighterDetail .round-no").text()
                };

                assignedFighterJSON.push(FighterJSON);

                let WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                let FightClassId = $(this).closest(".draw-main").find(".datafcId").val();
                var tournamentId = $("#tournamentId").val();
                var model = {};
                model.TournamentId = tournamentId;
                model.UpdateIsLocked = true;
                model.WeightClassId = WeightClassId;
                model.FightClassId = FightClassId;
                model.FighterId = $(this).closest(".main-block").find(".FighterDetail .fighter-id").text();
                model.IslockedFighter = lock;
                model.Data = assignedFighterJSON;
                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function (html) {
                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                });
            });
        },
        removeFighter = function () {
            $(".MainSec .flow-chart-inner .flow-chart-block .remove-fighter").click(function () {
                app.showLoader();

                assignedFighterJSON = [];

                var FighterJSON = {
                    "OrderNumber": $(this).closest(".flow-chart-block").find(".FighterDetail .order-no").text(),
                    "Fighter1Id": $(this).closest(".flow-chart-inner").find(".inner-block.first .FighterDetail .fighter-id").text(),
                    "Fighter2Id": $(this).closest(".flow-chart-inner").find(".inner-block.second .FighterDetail .fighter-id").text()
                };

                assignedFighterJSON.push(FighterJSON);
                let WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                let FightClassId = $(this).closest(".draw-main").find(".datafcId").val();

                var tournamentId = $("#tournamentId").val();
                var model = {};
                model.TournamentId = tournamentId;
                model.IsRemoveFighter = true;
                model.FighterType = $(this).closest(".inner-block").hasClass("first") ? 1 : 2;
                model.Data = assignedFighterJSON;
                model.WeightClassId = WeightClassId;
                model.FightClassId = FightClassId;
                console.log(model);
                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function (html) {
                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                });
            });
        },
        updateFightAfterSwap = function () {
            let from = swapFrom.closest(".inner-block");
            let to = swapTo.closest(".inner-block");

            if ((from.parent().hasClass("unassigned-box-sec") && to.parent().hasClass("unassigned-box-sec")) || (from.find(".FighterDetail .fighter-id").text() === "" && to.find(".FighterDetail .fighter-id").text() === "") || (from.find(".FighterDetail .fighter-id").text() === "0" && to.find(".FighterDetail .fighter-id").text() === "0")) {
                app.hideLoader();
            }
            else {
                let swapFighterJSON = [];

                let FromFighterJSON = {
                    "OrderNumber": from.find(".FighterDetail .order-no").text(),
                    "Fighter1Id": from.find(".FighterDetail .fighter-id").text(),
                    "Fighter1ClubId": from.find(".FighterDetail .club-id").text(),
                    "SwapFighterType": from.hasClass("first") ? 1 : 2
                };

                swapFighterJSON.push(FromFighterJSON);

                let ToFighterJSON = {
                    "OrderNumber": to.find(".FighterDetail .order-no").text(),
                    "Fighter1Id": to.find(".FighterDetail .fighter-id").text(),
                    "Fighter1ClubId": to.find(".FighterDetail .club-id").text(),
                    "SwapFighterType": to.hasClass("first") ? 1 : 2
                };

                swapFighterJSON.push(ToFighterJSON);

                let WeightClassId = $(".datawcId").val();
                let FightClassId = $(".datafcId").val();
                let tournamentId = $("#tournamentId").val();
                let model = {};
                model.TournamentId = tournamentId;
                model.IsUpdateAfterSwap = true;
                model.Data = swapFighterJSON;
                model.WeightClassId = WeightClassId;
                model.FightClassId = FightClassId;
                console.log(model);

                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function () {
                    FilterSeedsAccordingToWeightClassFx(WeightClassId, FightClassId);
                });
            }
        },
        awardWinFx = function ($this) {
            $this.find(".award-win select").change(function () {
                var endingId = $(this).find("option:selected").val();
                if (endingId === undefined || endingId == "" || endingId == null) {
                    app.showLoader();
                    let WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                    let FightClassId = $(this).closest(".draw-main").find(".datafcId").val();

                    let RoundNo = $(this).closest(".inner-block").find(".round-no").text();
                    let OrderNumber = $(this).closest(".inner-block").find(".order-no").text();
                    let FighterId = $(this).closest(".inner-block").find(".fighter-id").text();
                    let clearResultFighterArr = [];
                    let j = 0;
                    for (let i = RoundNo; i <= $(".MainSec").length; i++) {
                        let SiblingOrderNumber = 0, TargetBlock = 0, TargetOrderNumber = 0;
                        if (clearResultFighterArr.length === 0) {
                            if (parseInt(OrderNumber) % 2 === 1) {
                                SiblingOrderNumber = parseInt(OrderNumber) + 1;
                                TargetBlock = 1;
                                TargetOrderNumber = SiblingOrderNumber / 2;
                            }
                            else {
                                SiblingOrderNumber = parseInt(OrderNumber) - 1;
                                TargetBlock = 2;
                                TargetOrderNumber = parseInt(OrderNumber) / 2;
                            }
                        }
                        else {
                            OrderNumber = clearResultFighterArr[j - 1].TargetOrderNumber;
                            if (parseInt(OrderNumber) % 2 === 1) {
                                SiblingOrderNumber = parseInt(OrderNumber) + 1;
                                TargetBlock = 1;
                                TargetOrderNumber = SiblingOrderNumber / 2;
                            }
                            else {
                                SiblingOrderNumber = parseInt(OrderNumber) - 1;
                                TargetBlock = 2;
                                TargetOrderNumber = parseInt(OrderNumber) / 2;
                            }
                        }

                        let clearResultFighterJson = {
                            "OrderNumber": OrderNumber,
                            "RoundNo": i,
                            "TargetBlock": TargetBlock,
                            "TargetOrderNumber": TargetOrderNumber
                        };

                        clearResultFighterArr.push(clearResultFighterJson);
                        j++;
                    }

                    let model = {};
                    model.TournamentId = $("#tournamentId").val();
                    model.FighterId = FighterId;
                    model.IsWinnerClearResult = true;
                    model.WeightClassId = WeightClassId;
                    model.WinnerClearData = clearResultFighterArr;
                    model.FightClassId = FightClassId;

                    var url = "/tournaments/updatetournamentfight";
                    app.fetchPost(url, model, function (html) {
                        FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                    });
                }
                else {
                    let RoundNumber = $(this).closest(".inner-block").find(".round-number").val();

                    if (RoundNumber == "" || RoundNumber == null || RoundNumber == 0) {
                        alert("Please select round number.");
                        $(this).find("option:eq(0)").prop('selected', true);
                        $(this).select2();
                        return false;
                    }
                    app.showLoader();
                    var TargetBlock = 0, TargetOrderNumber = 0, OrderNumber = $(this).closest(".inner-block").find(".order-no").text(), SiblingOrderNumber = 0;

                    if (parseInt(OrderNumber) % 2 === 1) {
                        SiblingOrderNumber = parseInt(OrderNumber) + 1;
                        TargetBlock = 1;
                        TargetOrderNumber = SiblingOrderNumber / 2;
                    }
                    else {
                        SiblingOrderNumber = parseInt(OrderNumber) - 1;
                        TargetBlock = 2;
                        TargetOrderNumber = parseInt(OrderNumber) / 2;
                    }
                    let WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                    let FightClassId = $(this).closest(".draw-main").find(".datafcId").val();
                    let model = {};
                    model.IsAwardWin = true;
                    model.TournamentId = $("#tournamentId").val();
                    model.FighterType = $(this).closest(".inner-block").hasClass("first") ? 1 : 2;
                    model.WeightClassId = WeightClassId;
                    model.FightClassId = FightClassId;
                    model.AwardWin = {
                        "OrderNumber": OrderNumber,
                        "RoundNo": $(this).closest(".inner-block").find(".round-no").text(),
                        "TargetBlock": TargetBlock,
                        "TargetOrderNumber": TargetOrderNumber,
                        "WinnerId": $(this).closest(".inner-block").find(".fighter-id").text(),
                        "ClubId": $(this).closest(".inner-block").find(".club-id").text(),
                        "EndingId": endingId,
                        "FightRoundNumber": RoundNumber
                    };
                    console.log(model);
                    var url = "/tournaments/updatetournamentfight";
                    app.fetchPost(url, model, function (html) {
                        FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                    });
                }
            });
        },
        clearWinnerResult = function () {
            $(".clear-winner-result").click(function () {
                app.showLoader();
                let WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                let FightClassId = $(this).closest(".draw-main").find(".datafcId").val();
                if (WeightClassId == 0) {
                    WeightClassId = $(this).closest(".draw-main").find(".datawcId").val();
                }
                let RoundNo = $(this).closest(".inner-block").find(".round-no").text();
                let OrderNumber = $(this).closest(".inner-block").find(".order-no").text();
                let FighterId = $(this).closest(".inner-block").find(".fighter-id").text();
                let clearResultFighterArr = [];
                let j = 0;
                for (let i = RoundNo; i <= $(".MainSec").length; i++) {
                    let SiblingOrderNumber = 0, TargetBlock = 0, TargetOrderNumber = 0;
                    if (clearResultFighterArr.length === 0) {
                        if (parseInt(OrderNumber) % 2 === 1) {
                            SiblingOrderNumber = parseInt(OrderNumber) + 1;
                            TargetBlock = 1;
                            TargetOrderNumber = SiblingOrderNumber / 2;
                        }
                        else {
                            SiblingOrderNumber = parseInt(OrderNumber) - 1;
                            TargetBlock = 2;
                            TargetOrderNumber = parseInt(OrderNumber) / 2;
                        }
                    }
                    else {
                        OrderNumber = clearResultFighterArr[j - 1].TargetOrderNumber;
                        if (parseInt(OrderNumber) % 2 === 1) {
                            SiblingOrderNumber = parseInt(OrderNumber) + 1;
                            TargetBlock = 1;
                            TargetOrderNumber = SiblingOrderNumber / 2;
                        }
                        else {
                            SiblingOrderNumber = parseInt(OrderNumber) - 1;
                            TargetBlock = 2;
                            TargetOrderNumber = parseInt(OrderNumber) / 2;
                        }
                    }

                    let clearResultFighterJson = {
                        "OrderNumber": OrderNumber,
                        "RoundNo": i,
                        "TargetBlock": TargetBlock,
                        "TargetOrderNumber": TargetOrderNumber
                    };

                    clearResultFighterArr.push(clearResultFighterJson);
                    j++;
                }

                let model = {};
                model.TournamentId = $("#tournamentId").val();
                model.FighterId = FighterId;
                model.IsWinnerClearResult = true;
                model.WeightClassId = WeightClassId;
                model.WinnerClearData = clearResultFighterArr;
                model.FightClassId = FightClassId;

                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function (html) {
                    FilterSeedsAccordingToWeightClassFx(WeightClassId, FightClassId);
                });
            });
        },
        lockAllFighters = function () {
            $(".lock-all-seeds").click(function () {
                app.showLoader();
                let WeightClassId = $("#WeightClassId1").val();
                let FightClassId = $("#ClassesDrp").val();
                let model = {};
                model.TournamentId = $("#tournamentId").val();
                model.IsLockAllFighters = true;
                model.WeightClassId = WeightClassId;
                model.FightClassId = FightClassId;
                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function (html) {
                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                });
            });
        },
        unLockAllFighters = function () {
            $(".unlock-all-seeds").click(function () {
                app.showLoader();
                let WeightClassId = $("#WeightClassId1").val();
                let FightClassId = $("#ClassesDrp").val();
                let model = {};
                model.TournamentId = $("#tournamentId").val();
                model.IsUnLockAllFighters = true;
                model.WeightClassId = WeightClassId;
                model.FightClassId = FightClassId;
                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function (html) {
                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                });
            });
        },
        RefreshErrorMessageBoxForM = function () {
            $('#MultipleFighterListModel .multiple-fighter-list-model-content .select-radio-block .dropdown .dropdown-menu input').click(function () {
                $(this).closest('.select-radio-block').find("#dropdownMenuButton .custom-radio label").text($(this).siblings().text());
                if ($(this).val() != "" && $(this).val() != null)
                    $(this).closest(".dropdown").find(".dropdown-toggle").removeClass('input-validation-error');
            });

            $('#MultipleFighterListModel .multiple-fighter-list-model-content .select-radio-block select').change(function () {
                if ($(this).val() != "" && $(this).val() != "Select Fight Class") {
                    $(this).removeClass('input-validation-error');
                }
            });
        },
        RefreshErrorMessageBoxForS = function () {
            $('#FighterListModel .fighter-list-model-content .select-radio-block .dropdown .dropdown-menu input').click(function () {
                $(this).closest('.select-radio-block').find("#dropdownMenuButton .custom-radio label").text($(this).siblings().text());
                if ($(this).val() != "" && $(this).val() != null)
                    $(this).closest(".dropdown").find(".dropdown-toggle").removeClass('input-validation-error');
            });

            $('#FighterListModel .fighter-list-model-content .select-radio-block select#ClassessDrp').change(function () {
                if ($(this).val() != "" && $(this).val() != "Select Fight Class") {
                    $(this).removeClass('input-validation-error');
                }
            });
        },
        reroll = function () {
            $(".btn-reroll-draw").click(function () {
                let NumberofFightdifference = $("#noofFightDiff").val();
                app.showLoader();
                let WeightClassId = $("#WeightClassId1").val();
                let FightClassId = $("#ClassesDrp").val();
                let model = {};
                model.TournamentId = $("#tournamentId").val();
                model.NumberofFightdifference = NumberofFightdifference !== "" && NumberofFightdifference !== null ? $("#noofFightDiff").val() : 5;
                model.WeightClassId = WeightClassId;
                model.FightClassId = FightClassId;
                var url = "/tournaments/tournamentfightsreroll";
                console.log(model);
                app.fetchPost(url, model, function (html) {
                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                });
            });
        },
        statisticsPopup = function () {
            $(".statisticsBtn").click(function () {
                var bodyContent = $(this).closest(".statistics-box").find(".statistics-block").html();
                $("#FighterStatistics .fighter-statistics-list").html(bodyContent);
                $("#FighterStatistics").modal('show');
            });
            $("#FighterStatistics").modal('hide');
        },
        getDraw = function (drawId, methodType, callback) {
            $(".no-of-fight-diff").hide();
            $(".approve-fight-for-medical-record-col").hide();
            $(".approve-all-medical-btn").hide();

            var $this = $(`#${drawId}`);
            var tournamentId = $("#tournamentId").val();
            var model = {};
            model.UserId = $("#loginUserID").val();            
            model.TournamentId = tournamentId;                    
            model.WeightClassId = $this.parent().find(".datawcId").val();
            model.FightClassId = $this.parent().find(".datafcId").val();
            if (parseInt($("#IsNormalUser").val()) == 0)
                model.IsNormalUser = false;
            else
                model.IsNormalUser = true;

            if (parseInt($("#IsFederationManager").val()) == 0)
                model.IsFederationManager = false;
            else
                model.IsFederationManager = true;

            if (parseInt($("#IsFederationContactPerson").val()) == 0)
                model.IsFederationContactPerson = false;
            else
                model.IsFederationContactPerson = true;

            if (parseInt($("#IsSuperAdmin").val()) == 0)
                model.IsSuperAdmin = false;
            else
                model.IsSuperAdmin = true;

            if (parseInt($("#IsAllowToChanges").val()) == 0)
                model.IsAllowToChanges = false;
            else
                model.IsAllowToChanges = true;

            if (parseInt($("#IsInterFedAdmin").val()) == 0)
                model.IsInterFedAdmin = false;
            else
                model.IsInterFedAdmin = true;

            if (parseInt($("#IsContactPersonOrManager").val()) == 0)
                model.IsContactPersonOrManager = false;
            else
                model.IsContactPersonOrManager = true;
       
            model.SelectedWeightClassId = $("#WeightClassId1").val();
            model.SelectedFightClassId = $("#ClassesDrp").val();

            var url = "/tournaments/getallweightclassandfightclass";

            $.ajax({
                type: methodType,
                cache: false,
                data: model,
                url: url,
                success: function (html) {
                    $this.removeClass('waiting');
                    $this.html(html);
                    $(".dropdown-menu").find(".selector-dev").click(function (e) {
                        if (e.target.classList[0] !== "add-fighter-from-popup")
                            e.stopPropagation();
                    });

                    $(".event-sec.flow-chart-page").removeClass("fight-max-height");

                    $this.find(".select2").select2()
                        .on("select2:open", function () {
                            app.applyNiceScroll($(".select2-results__options"));
                        });

                    $(".add-fighter-from-popup").click(function () {
                        var cloestNode = $(this).closest('.inner-block');
                        on = cloestNode.find(".FighterDetail .order-no").text();
                        ft = cloestNode.hasClass("first") ? 1 : 2;
                    });

                    app.applyNiceScroll($(".flow-chart-sec .scrollbar-dynamic"));

                    $(".flow-chart-sec").mouseover(function () {
                        $(".flow-chart-sec .scrollbar-dynamic").getNiceScroll().resize();
                        $(".flow-chart-sec").getNiceScroll().resize();
                    });

                    makeDraggable();
                    makeDroppable();

                    if (model.SelectedWeightClassId > 0 && model.SelectedFightClassId > 0) {
                        $(".no-of-fight-diff").show();
                        $(".approve-fight-for-medical-record-col").show();
                        $(".approve-all-medical-btn").show();
                        if ($("#isAnyWinner").val() === 0 || $("#isAnyWinner").val() === "0") {
                            $(".btn-reroll-draw").removeAttr("style");
                        }
                        if ($("#anyOneFighterLock").val() === 1 || $("#anyOneFighterLock").val() === "1") {
                            $(".unlock-all-seeds").show();
                            $(".lock-all-seeds").hide();
                        }
                        else {
                            $(".lock-all-seeds").show();
                            $(".unlock-all-seeds").hide();
                        }

                        $("#noofFightDiff").val($("#NumberofFightdifference").val());
                        $("#noofFightDiff").select2();

                        getFightersList(model.SelectedWeightClassId, 1);

                        if ($("#Status").val() === "Edit" || $("#Status").val() === "View") {
                            $(".unassigned-Fighters").show();
                            var unassignedFightersDataModel = {};
                            unassignedFightersDataModel.TournamentId = tournamentId;
                            unassignedFightersDataModel.WeightClassId = $("#WeightClassId1").val();
                            unassignedFightersDataModel.FightClassId = $('#ClassesDrp option:selected').val();
                            unassignedFightersDataModel.OrderBy = 1;
                            unassignedFightersDataModel.IsAnyWinner = $("#isAnyWinner").val() == 1 ? true : false;
                            unassignedFightersDataModel.Status = $("#Status").val();
                            var url = "/tournaments/filterunassignedfighter";
                            app.fetchPost(url, unassignedFightersDataModel, function (html) {
                                $(".unassigned-Fighters .fighters-sec .unassigned-block").html(html);
                                app.applyNiceScroll($(".unassigned-Fighters .scrollbar-dynamic"));

                                const totalUnassignedFighters = $(".unassigned-box-sec .inner-block").length;
                                $(".unassigned-Fighters .left > h2").text(`Unassigned Fighters${totalUnassignedFighters > 0 ? ` (${totalUnassignedFighters})` : ""}`);
                                deleteUnassignedFighter();
                                statisticsPopup();
                                makeDraggable();
                                makeDroppable();
                                app.hideLoader();
                            });
                        }
                    }

                    $this.find(".box-drag").sortable({
                        placeholder: "ui-sortable-placeholder",
                        //items: ".flow-chart-inner.Draw-Block",
                        //connectWith: ".box-drag",
                        placeholder: "ui-sortable-placeholder",
                        update: function (event, ui) {
                            var DataArr = [];
                            var i = 1;
                            $(this).sortable();
                            $(this).find(".Draw-Block").each(function () {
                                var data = {
                                    "Id": $(this).data("id"),
                                    "OrderNumber": i
                                };
                                if ($(this).data("id") !== "") {
                                    DataArr.push(data);
                                }
                                $(this).attr("data-order", i++);
                            });
                            if (DataArr.length > 0) {
                                app.showLoader();
                                var model = {};
                                model.TournamentId = tournamentId;
                                model.SwapData = DataArr;
                                model.IsSwap = true;
                                var url = "/tournaments/updateswapdata";
                                app.fetchPost(url, model, function (html) {
                                    FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
                                });
                            }
                            console.log(model);
                        }
                    });
                    $this.find(".box-drag").disableSelection();

                    var TotalH = 0, TotalW = 0;
                    $this.find(".MainSec.FBlock .Draw-Block").each(function () {
                        $(this).css({ "top": TotalH });
                        TotalH += $(this).outerHeight(true);
                    });

                    var num = $this.find(".MainSec").length;
                    let width = $this.find(".MainSec .Draw-Block").width();
                    TotalW = (width * num) + (75 * num);

                    $this.height(TotalH - ($this.find(".MainSec.FBlock .Draw-Block").length * 3));
                    $this.width(TotalW);

                    var i = 0, j = 0;
                    for (let c = 0; c < $this.find(".MainSec.SBlock .Draw-Block").length; c++) {
                        i = 0;
                        $this.find(".MainSec.SBlock:eq(" + c + ") .Draw-Block").each(function () {
                            let fBlock;
                            let sBlock;
                            if (j === 0) {
                                fBlock = $this.find(".MainSec.FBlock .Draw-Block").eq(i++);
                                sBlock = $this.find(".MainSec.FBlock .Draw-Block").eq(i++);
                            }
                            else {
                                fBlock = $this.find(".MainSec.SBlock:eq(" + (j - 1) + ") .Draw-Block").eq(i++);
                                sBlock = $this.find(".MainSec.SBlock:eq(" + (j - 1) + ") .Draw-Block").eq(i++);
                            }

                            $(this).css({ "display": "block" });

                            let fDraw = fBlock.position().top;
                            let sDraw = sBlock.position().top;

                            let topC = fDraw + fBlock.find('.main-block').eq(1).position().top;
                            let bottomC = sDraw + sBlock.find('.main-block').eq(1).position().top;

                            let center = (bottomC - topC) / 2;

                            let fBlockMainSec = fBlock.find(".main-block").eq(0).outerHeight(true);
                            let sBlockMainSec = $(this).find(".main-block").eq(0).outerHeight(true);

                            let centerTop = fBlockMainSec + center + fDraw - sBlockMainSec;
                            let svgTop = topC;
                            if (c == 0) {
                                centerTop -= ((i - 1) * 4);
                                svgTop = svgTop - ((i - 1) * 4);
                            }
                            $(this).css({ "top": centerTop });

                            svg = "<svg xmlns='http://www.w3.org/2000/svg' width='41.816' height='472.451' viewBox='0 0 41.816 472.451' style='height:" + (bottomC - topC) + "px;top: " + (svgTop) + "px;'><defs><style>.a{fill:none;stroke:#e3e5ea;}</style></defs><g transform='translate(-1157.641 -384.91)'><path class='a' d='M-16474.016-16834.727s31.129,29.465,21.865,113.344c-14.826,90.592,19.268,122.252,19.268,122.252' transform='translate(17632 17220)'/><path class='a' d='M-16474.016-16599.129s31.129-29.465,21.865-113.346c-14.826-90.59,19.268-122.25,19.268-122.25' transform='translate(17632 17456.127)'/></g></svg>"
                            $(this).before(svg);
                        });
                        j++;
                    }

                    setAction($this);

                    if (drawCounter < totalDraw) {
                        var drawId = drawSecIdsList[drawCounter++];
                        callback(drawId, "POST", getDraw);
                    }
                },
                error: function () {
                    var drawId = drawSecIdsList[drawCounter++];
                    callback(drawId, "POST", getDraw);
                }
            });
        },
        FilterSeedsAccordingToWeightClassFx = function (WeightClassId, fightClassId) {
            const tournamentId = $("#tournamentId").val();
            var url = `/tournaments/GetFighterCountAccordingWeightClass?tournamentId=${tournamentId}`;
            app.fetch(url, function (result) {
                if (result != null && result.length > 0) {
                    $.each(result, function (index, value) {
                        if (value.noOfFighters > 0) {
                            const weightValue = $(`#WeightClassId1 option[value=${value.weightClassId}]`);
                            weightValue.text(`${value.name} (${value.noOfFighters})`);
                        }
                    });
                }

                $(".unassigned-Fighters").hide();
                $(".unassigned-Fighters .fighters-sec .unassigned-block").html('<i class="fa fa-refresh loading--inline-block loading--animate " title="Loading" style=""></i>');
                $(".unassigned-Fighters .left > h2").text("Unassigned Fighters");
                var model = {};
                model.TournamentId = tournamentId;
                model.WeightClassess = $("#weightClassess").val();
                model.FightClassess = $("#fightClassess").val();
                model.WeightClassId = WeightClassId;
                model.FightClassId = fightClassId;
                url = "/tournaments/tournamentFightsList";
                app.fetchPost(url, model, function (html) {
                    $(".tournament-data").html(html);
                    app.hideLoader();
                    $(".Draw-Sec").bind("scroll");
                    drawSecIdsList = [];
                    drawCounter = 0;
                    $.each($(".Draw-Sec"), function () {
                        var drawSecId = $(this).attr("id");
                        drawSecIdsList.push(drawSecId);
                    });

                    if (drawSecIdsList.length > 0) {
                        totalDraw = drawSecIdsList.length;
                        var drawId = drawSecIdsList[drawCounter++];
                        getDraw(drawId, "POST", getDraw);
                    }

                    $("#FilterUnassignedFighter option[value='" + $("#OrderBy").val() + "']").prop("selected", true);

                    statisticsPopup();
                });
            });
        },
        FilterSeedsAccordingToWeightClass = function () {
            $("#WeightClassId1").change(function () {
                app.showLoader();
                $("#OrderBy").val('1');
                FilterSeedsAccordingToWeightClassFx($(this).find('option:selected').val(), $("#ClassesDrp").val());
            });
        },
        FilterAccordingFightClass = function () {
            $("#ClassesDrp").change(function () {
                app.showLoader();
                $("#FCID").val($("#ClassesDrp").val());
                $("#OrderBy").val('1');
                FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $(this).find('option:selected').val());
                const fightClassIds = $(this).val();
                if (fightClassIds !== null && fightClassIds !== undefined) {
                    getWeightClass(fightClassIds);
                } else {
                    getWeightClass("");
                }
            });
        },
        FilterUnAssignedFighter = function () {
            $("#FilterUnassignedFighter").change(function () {
                $("#OrderBy").val($(this).val());
                app.showLoader();
                var model = {};
                var tournamentId = $("#tournamentId").val();
                model.TournamentId = tournamentId;
                model.WeightClassId = $("#WeightClassId1").val();
                model.FightClassId = $('#ClassesDrp option:selected').val();
                model.OrderBy = $(this).val();
                model.IsAnyWinner = $("#IsAnyWinner").val() == 1 ? true : false;
                model.Status = $("#Status").val();
                var url = "/tournaments/filterunassignedfighter";
                app.fetchPost(url, model, function (html) {
                    $(".unassigned-Fighters .fighters-sec .unassigned-block").html(html);
                    app.applyNiceScroll($(".unassigned-Fighters .scrollbar-dynamic"));
                    deleteUnassignedFighter();
                    statisticsPopup();
                    makeDraggable();
                    makeDroppable();
                    app.hideLoader();
                });
            });
        },
        SaveAndPublished = function () {
            $("#SaveAndPublished").click(function () {
                app.showLoader();
                var model = {};
                model.TournamentId = $("#tournamentId").val();;
                model.TournamentPublished = true;
                var url = "/tournaments/updatetournamentfight";
                app.fetchPost(url, model, function (html) {
                    alert("You have successfully saved and published this tournament.");
                    app.hideLoader();
                });
            })
        },
        SaveFight = function () {
            $("#SaveBtn").click(function () {
                alert("You have successfully saved this tournament.");
            });
        },
        getFights = function () {
            FilterSeedsAccordingToWeightClassFx($('#WeightClassId1 option:selected').val(), $('#ClassesDrp option:selected').val());
            FilterSeedsAccordingToWeightClass();
            FilterAccordingFightClass();
            searchFighters();
            reroll();
            SaveAndPublished();
            SaveFight();
            FilterUnAssignedFighter();
            approveAllFightsForMedicalRecord();
            lockAllFighters();
            unLockAllFighters();

            $(".box-resize-btn button").click(function () {
                if ($(this).text().toLowerCase() === "maximise") {
                    $(this).text("minimise");
                    let height = $(".inner-content.unassigned-Fighters").outerHeight();
                    TweenMax.to(".inner-content.unassigned-Fighters", 1, {
                        height: height + 200
                    });
                    $(".flow-chart-page").addClass("fight-max-height");
                }
                else {
                    $(this).text("maximise");
                    let height = $(".inner-content.unassigned-Fighters").outerHeight();
                    TweenMax.to(".inner-content.unassigned-Fighters", 1, {
                        height: height - 200
                    });
                    $(".flow-chart-page").removeClass("fight-max-height");
                }
                $(".flow-chart-sec").getNiceScroll().resize();
            });
        };
    getWeightClass($("#ClassesDrp").val());
    return {
        init: init,
        Pagination: Pagination,
        PaginationForSeed: PaginationForSeed,
        RereshPageIndex: RereshPageIndex
    };
}();