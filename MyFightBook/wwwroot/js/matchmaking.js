var matchmaking = function () {
    var tBody = $("#activefighters tbody");
    var offSetRowNo = 1;
    const fetchRowNo = 10;
    const federationIds = $("#FederationIds").val();
    const isTestRights = $("#IsTestRights").val();
    const isSuperUserChecked = $("#IsSuperUserChecked").val();
    var clubId = "";
    var fightClassId = "";
    var weightClassId = "";
    var fromYear = "";
    var fromMonth = "";
    var bufferYear = "";
    var bufferMonth = "";
    var currentRequest = null;
    var isFilter = false;
    var index = 0;
    var federationList = federationIds.length > 0
        ? federationIds.split(",")
        : null;
    const totalFederations = federationList != null ? federationIds.length : 0;

    $('#WeightClassId').selectpicker({
        noneSelectedText: "Select Weight Class",
        liveSearch: true,
        hideDisabled: true,
        actionsBox: true,
        virtualScroll: false,
        container: 'body',
        title: "Select Weight Class"
    });

    var statisticsPopup = function ($this) {
        $this.find(".statisticsBtn").click(function () {
            const bodyContent = $(this).parent().find(".statistics-block").html();
            $("#FighterStatistics .fighter-statistics-list").html(bodyContent);
            $("#FighterStatistics").modal("show");
        });
        $this.removeClass("unbind-popup-event");
    },
        getFightersList = function (callback) {
            //var fids,wids;
            //var ids;
            var model = {};
            model.FederationIds = isFilter ? federationIds : federationList[index];
            model.OffSetRowNo = offSetRowNo;
            model.FetchRowNo = fetchRowNo;
            model.ClubId = clubId;
            model.FightClassId = fightClassId;
            model.WeightClassId = weightClassId;
            model.FromYear = fromYear;
            model.FromMonth = fromMonth;
            model.BufferYear = bufferYear;
            model.BufferMonth = bufferMonth;

            currentRequest = $.ajax({
                type: "POST",
                cache: false,
                data: model,
                url: "/matchmaking/activefighterslist",
                beforeSend: function () {
                    if (currentRequest != null) {
                        currentRequest.abort();
                    }
                },
                success: function (html) {
                    tBody.find("tr.loading__animate--box").before(html);
                    offSetRowNo++;
                    const remainingRecords = tBody.find("tr .RemainingRecords").val();
                    tBody.find("tr .RemainingRecords").remove();
                    if (remainingRecords !== undefined && parseInt(remainingRecords) > 0) {
                        callback(getFightersList);
                    }
                    else {
                        if (totalFederations > index) {
                            offSetRowNo = 1;
                            index++;
                            callback(getFightersList);
                        }
                        else {
                            if (tBody.find("tr").length === 1) {
                                tBody.find("tr.loading__animate--box").html("<td colspan='5'><span>None of fighters active !!</span></td>");
                            } else {
                                tBody.find("tr.loading__animate--box").remove();
                            }
                        }
                    }

                    statisticsPopup($(".unbind-popup-event"));
                },
                error: function (error) {
                    if (error.statusText !== "abort") {
                        index++;
                        offSetRowNo = 1;
                        callback(getFightersList);
                    }
                }
            });
        },
        getWeightClassList = function (callback) {
            var model = {};
            model.FederationIds = federationIds;
            model.IsTestRights = isTestRights;
            model.IsSuperUserChecked = isSuperUserChecked;

            $.ajax({
                type: "POST",
                cache: false,
                data: model,
                url: "/matchmaking/weightclasslist",
                success: function (html) {
                    $(".weight-class-list").html(html);
                    $(".weight-class-list .select2").select2();
                },
                error: function () {
                    callback(getWeightClassList);
                }
            });
        },
        getFightClassList = function (callback) {
            var model = {};
            model.FederationIds = federationIds;
            model.IsTestRights = isTestRights;
            model.IsSuperUserChecked = isSuperUserChecked;

            $.ajax({
                type: "POST",
                cache: false,
                data: model,
                url: "/matchmaking/fightclasslist",
                success: function (html) {
                    $(".fight-class-list").html(html);
                    $(".fight-class-list .select2").select2();
                },
                error: function () {
                    callback(getFightClassList);
                }
            });
        },
        getClubsList = function (callback) {
            var model = {};
            model.FederationIds = federationIds;
            model.IsTestRights = isTestRights;
            model.IsSuperUserChecked = isSuperUserChecked;

            $.ajax({
                type: "POST",
                cache: false,
                data: model,
                url: "/matchmaking/clublist",
                success: function (html) {
                    $(".club-list").html(html);
                    $(".club-list .select2").select2();
                },
                error: function () {
                    callback(getClubsList);
                }
            });
        },
        init = function () {
            $("#activefighters").sortTable();
            getClubsList(getClubsList);
            getFightClassList(getFightClassList);
            getWeightClassList(getWeightClassList);

            if (federationIds.length > 0) {
                getFightersList(getFightersList);
            }

            $("#activeFighterFilterBtn").click(function () {
                clubId = $("#ClubId").val();
                fightClassId = $("#FightClassId").val();
                weightClassId = $("#WeightClassId").val() !== null && $("#WeightClassId").val() !== "" ? $("#WeightClassId").val().join(",") : "";
                fromYear = $("#yearTxt").val() | 0;
                fromMonth = $("#monthTxt").val() | 0;
                bufferYear = $("#bufferYearTxt").val() | 0;
                bufferMonth = $("#bufferMonthTxt").val() | 0;
                if (parseInt(fromYear) < parseInt(bufferYear)) {
                    alert("Buffer year should be less than or equal by year.");
                    return false;
                }
                index = 0;
                offSetRowNo = 1;
                tBody.html("");
                tBody.html(`<tr class='loading__animate--box'><td colspan="5"><i class="fa fa-refresh loading--inline-block loading--animate " title="Loading" style=""></i></td></tr>`);
                if ((clubId === undefined || clubId === "") && (fightClassId === undefined || fightClassId === "") && (weightClassId === undefined || weightClassId === "")) {
                    isFilter = false;
                }
                else {
                    isFilter = true;
                    index = totalFederations;
                }

                getFightersList(getFightersList);
            });
        };
    return {
        init: init
    }
}();