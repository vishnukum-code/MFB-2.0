var eventPayment = function () {
    var getWeightClass = function (fightClassId) {
        app.showLoader();
        const url = "/events/getWeightClassByFightClassId";
        $.getJSON(url + "?fightClassIds=" + fightClassId, function (data) {
            var itemsWeightClass = "";
            const weightClassContainer = $("#WeightClassIds");
            $.each(data.weightclass, function (i, classes) {
                itemsWeightClass += `<option value='${classes.id}' data-subtext='(${classes.gender}) (${classes.fightClassName})'>${classes.name} (${classes.gender}) (${classes.fightClassName})</option>`;
            });
            weightClassContainer.html(itemsWeightClass);

            var weightClassIdsOnLoad = $("#WeightClassIdsList").val();
            if (weightClassIdsOnLoad !== "" && weightClassIdsOnLoad !== null) {
                $.each(weightClassIdsOnLoad.split(","), function (index, value) {
                    weightClassContainer.find(`option[value=${value}]`).prop("selected", true);
                });
            }

            weightClassContainer.multiselect("rebuild");

            if (data.weightclass !== null && data.weightclass.length > 0) {
                weightClassContainer.removeAttr("disabled");
            } else {
                weightClassContainer.attr("disabled", "disabled");
            }

            app.hideLoader();
        });
    },
        bindFn = function () {

            $("input").keyup(function () {
                if ($(this).val().length > 0) {
                    $(this).removeClass("input-validation-error");
                }
                else {
                    $(this).addClass("input-validation-error");
                }
            });

            $("#ClubId").change(function () {
                if ($(this).find("option:selected").index() > 0) {
                    $(this).removeClass("input-validation-error");
                }
                else {
                    $(this).addClass("input-validation-error");
                }
            });

            $("#FightClassIds").multiselect({
                includeSelectAllOption: true,
                selectAllText: "Select All Fight Class",
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                maxHeight: "200",
                disableIfEmpty: true,
                numberDisplayed: 2,
                nonSelectedText: "Select Fight Class",
                filterPlaceholder: "Search for fight class"
            });

            $("#WeightClassIds").multiselect({
                includeSelectAllOption: true,
                selectAllText: "Select All Weight Class",
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                maxHeight: "200",
                disableIfEmpty: true,
                numberDisplayed: 2,
                nonSelectedText: "Select Weight Class",
                filterPlaceholder: "Search for weight class"
            });

            $("#FightClassIds").change(function () {
                const fightClassIds = $(this).val();
                if (fightClassIds !== null && fightClassIds !== undefined) {
                    getWeightClass(fightClassIds.join(","));
                }
                else {
                    getWeightClass("");
                }
            });

            $("#registrationId").click(function () {
                let isOk = true;
                const clubId = $("#ClubId option:selected").index();
                const cardnumberId = $("#cardnumberId").val();
                const expiremonth = $("#expiremonth").val();
                const expireyear = $("#expireyear").val();
                const cvcId = $("#cvcId").val();
                const fightClassIdsList = $("#FightClassIds").val();
                const weightClassIdsList = $("#WeightClassIds").val();

                if (clubId > 0 || clubId === -1) {
                    $("#ClubId").removeClass("input-validation-error");
                }
                else {
                    $("#ClubId").addClass("input-validation-error");
                    isOk = false;
                }
                if (cardnumberId !== null && cardnumberId !== "") {
                    $("#cardnumberId").removeClass("input-validation-error");
                }
                else {
                    $("#cardnumberId").addClass("input-validation-error");
                    isOk = false;
                }

                if (expiremonth !== null && expiremonth !== "") {
                    $("#expiremonth").removeClass("input-validation-error");
                }
                else {
                    $("#expiremonth").addClass("input-validation-error");
                    isOk = false;
                }

                if (expireyear !== null && expireyear !== "") {
                    $("#expireyear").removeClass("input-validation-error");
                }
                else {
                    $("#expireyear").addClass("input-validation-error");
                    isOk = false;
                }
                if (cvcId !== null && cvcId !== "") {
                    $("#cvcId").removeClass("input-validation-error");
                }
                else {
                    $("#cvcId").addClass("input-validation-error");
                    isOk = false;
                }

                $("#FightClassIdsList").val("");
                $("#WeightClassIdsList").val("");
                $(".btn-group").removeClass("input-validation-error");
                if (fightClassIdsList === null) {
                    $("#FightClassIds").parent().find(".btn-group").addClass("input-validation-error");
                    isOk = false;
                }
                else {
                    const fightClassIds = fightClassIdsList.join(",");
                    $("#FightClassIdsList").val(fightClassIds);
                }

                if (weightClassIdsList === null) {
                    $("#WeightClassIds").parent().find(".btn-group").addClass("input-validation-error");
                    isOk = false;
                }
                else {
                    const weightClassIds = weightClassIdsList.join(",");
                    $("#WeightClassIdsList").val(weightClassIds);
                }

                if (isOk) {
                    app.showLoader();
                    $(this).attr("disabled", "disabled");
                    $("input[type='submit']").click();
                }
            });

            var fightClassIdOnLoad = $("#FightClassIds").val();
            if (fightClassIdOnLoad !== null && fightClassIdOnLoad !== undefined && fightClassIdOnLoad !== "") {
                getWeightClass(fightClassIdOnLoad.join(","));
            }
        };
    const init = function () {
        bindFn();
    };
    return {
        init: init
    };
}();