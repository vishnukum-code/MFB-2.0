var createTournament = function () {
    var tournamentPrice, bankId, isFree, status;

    var setErrorMessage = function (id, errorMessage) {
        $(`#${id}`).parent().append(
            `<span class='field-validation-error' data-valmsg-for='${id}' data-valmsg-replace='true'><span id='${id
            }-error'>${errorMessage
            }</span></span>`);
        $(`#${id}`).focus();
    },
        removeErrorMessage = function (id) {
            $(`#${id}-error`).remove();
        },
        getWeightClass = function (fightClassId) {
            app.showLoader();
            const url = "/events/getWeightClassByFightClassId";
            $.getJSON(url + "?fightClassIds=" + fightClassId,
                function (data) {
                    var itemsWeightClass = "";
                    var weightClassContainer = $("#WeightclassDrp");
                    const selectedWeightClassIds = $("#Weightclass").val();
                    $.each(data.weightclass,
                        function (i, classes) {
                            itemsWeightClass += `<option value='${classes.id}' data-subtext='(${classes.fightClassName
                                }) (${classes.gender})'>${classes.name}</option>`;
                        });
                    weightClassContainer.html(itemsWeightClass);
                    if (selectedWeightClassIds !== "") {
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
                    weightClassContainer.selectpicker("refresh");

                    app.hideLoader();
                });
        },
        bindData = function (federationId) {
            removeErrorMessage("FederationId");
            app.showLoader();
            const url = "/events/getFightClassByFederationId";
            $.getJSON(url + "?federationId=" + federationId,
                function (data) {
                    var itemsFightClass = "";
                    var itemSports = "";
                    var fightClassContainer = $("#ClassesDrp");
                    var sportsContainer = $("#SportsId");
                    var priceOfTournament = $("#PriceOfTournament");
                    $.each(data.fightclass,
                        function (i, classes) {
                            itemsFightClass += `<option value='${classes.id}'>${classes.name}</option>`;
                        });
                    fightClassContainer.html(itemsFightClass);
                    var selectedFightClassIds = $("#Classes").val();
                    if (selectedFightClassIds !== "") {
                        $.each(selectedFightClassIds.split(","),
                            function (i, e) {
                                fightClassContainer.find(`option[value='${e}']`).prop("selected", true);
                            });

                        getWeightClass(selectedFightClassIds);
                    }
                    if (data.fightclass !== null && data.fightclass.length > 0) {
                        fightClassContainer.removeAttr("disabled");
                    } else {
                        fightClassContainer.attr("disabled", "disabled");
                    }
                    fightClassContainer.selectpicker("refresh");

                    //get sports
                    itemSports = "<option value=''>" + "Select Sport" + "</option>";
                    $.each(data.sports,
                        function (i, sport) {
                            itemSports += `<option value='${sport.id}'>${sport.name}</option>`;
                        });
                    sportsContainer.html(itemSports);
                    var selectedSportId = $("#selectedSportId").val();
                    if (selectedSportId !== "" && selectedSportId !== null) {
                        sportsContainer.find(`option[value='${selectedSportId}']`).prop("selected", true);
                    }
                    if (data.sports !== null) {
                        if (data.sports.length > 0) {
                            sportsContainer.removeAttr("disabled");
                        } else {
                            sportsContainer.attr("disabled", "disabled");
                        }
                    }

                    tournamentPrice = data.adminPrice;
                    bankId = data.bankId;
                    status = data.status;
                    isFree = data.isFree;
                    app.hideLoader();

                    if ((data.bankId === null || data.bankId === 0) && federationId !== "") {
                        priceOfTournament.removeAttr("disabled");
                        if (!data.isFree) {
                            alert(
                                "Federation account is not created yet. Please create federation account first for paid tournament.");
                            window.location.href = `/federations/${federationId}/createaccount`;
                        }
                    } else if (status !== "verified") {
                        alert("Federation account is not verified yet.");
                        $("#FederationId").prop("selectedIndex", 0);
                    }
                    if (data.isFree) {
                        priceOfTournament.attr("disabled", "disabled");
                        priceOfTournament.val("0");
                    } else {
                        priceOfTournament.removeAttr("disabled");
                    }
                });
        },
        bindFn = function () {
            const selectedFederationId = $("#FederationId option:selected").val();
            if (selectedFederationId !== "") {
                bindData(selectedFederationId);
            }

            $(".select2").select2();

            $("#FederationId").change(function () {
                if ($(this).val() !== "") {
                    bindData($(this).val());
                }
            });

            $("#ClassesDrp").change(function () {
                const fightClassIds = $(this).val();
                if (fightClassIds !== null && fightClassIds !== undefined) {
                    getWeightClass(fightClassIds.join(","));
                } else {
                    getWeightClass("");
                }
            });

            $("#ClassesDrp").selectpicker({
                noneSelectedText: "Select Fight Class",
                liveSearch: true,
                hideDisabled: true,
                actionsBox: true,
                virtualScroll: false,
                container: $(this).closest(".form-group"),
                title: "Select Fight Class"
            });

            $("#WeightclassDrp").selectpicker({
                noneSelectedText: "Select Weight Class",
                liveSearch: true,
                hideDisabled: true,
                actionsBox: true,
                virtualScroll: false,
                container: $(this).closest(".form-group"),
                title: "Select Weight Class"
            });

            if (selectedFederationId !== "") {
                isFree = $("#isFree").val();
                if (isFree === "True" || isFree === true) {
                    $("#PriceOfTournament").attr("disabled", "disabled");
                } else {
                    $("#PriceOfTournament").prop("disabled", false);
                }
            }

            $("#tournamentcreate").click(function () {
                var fightClassList = [];
                var weightClassList = [];
                var fightClassIds = "", weightClassIds = "";
                $.each($("#ClassesDrp option:selected"),
                    function () {
                        fightClassList.push($(this).val());
                    });
                $.each($("#WeightclassDrp option:selected"),
                    function () {
                        weightClassList.push($(this).val());
                    });

                fightClassIds = fightClassList.length > 0 ? fightClassList.join(",") : "";
                weightClassIds = weightClassList.length > 0 ? weightClassList.join(",") : "";

                $("#Classes").val(fightClassIds);
                $("#Weightclass").val(weightClassIds);
                var priceOfTournament = $("#PriceOfTournament").val();
                var startDate = $("#StartDate").val();
                var endDate = $("#EndDate").val();
                var deadlineDate = $("#DeadlineDate").val();
                var tournamentStartDate = startDate.split("/");
                var tournamentEndDate = endDate.split("/");
                var eventDeadlineDate = deadlineDate.split("/");
                var newStartDate = new Date(tournamentStartDate[2],
                    (tournamentStartDate[0] - 1),
                    tournamentStartDate[1]);
                var newEndDate = new Date(tournamentEndDate[2], (tournamentEndDate[0] - 1), tournamentEndDate[1]);
                var newDeadlineDate = new Date(eventDeadlineDate[2], (eventDeadlineDate[0] - 1), eventDeadlineDate[1]);
                var sportsId = $("#SportsId option:selected").val();

                var currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                var startDateForDeadline = new Date(1901, 01, 01);
                var endDateForDeadline = new Date(9999, 12, 31);

                removeErrorMessage("FederationId");
                removeErrorMessage("DeadlineDate");
                removeErrorMessage("Weightclass");
                removeErrorMessage("Classes");
                removeErrorMessage("SportsId");
                removeErrorMessage("Name");
                removeErrorMessage("Location");
                removeErrorMessage("StartDate");
                removeErrorMessage("EndDate");
                removeErrorMessage("attachmentid");
                removeErrorMessage("PriceOfTournament");
                removeErrorMessage("descriptionId");

                if ($("#FederationId").val() === "") {
                    setErrorMessage("FederationId", "Please select Federation.");
                } else if (deadlineDate === "") {
                    setErrorMessage("DeadlineDate", "Please select Deadline Date.");
                } else if (newDeadlineDate <= startDateForDeadline || newDeadlineDate >= endDateForDeadline) {
                    setErrorMessage("DeadlineDate",
                        "Subscription DeadlineDate date should be less than 31/12/9999 and should be greater than 01/01/1901");
                } else if (fightClassList.length <= 0) {
                    setErrorMessage("Classes", "Please select fight class.");
                    $("#ClassesDrp").focus();
                } else if (weightClassList.length <= 0) {
                    setErrorMessage("Weightclass", "Please select weight class.");
                    $("#WeightclassDrp").focus();
                } else if (sportsId === 0 || sportsId === "") {
                    setErrorMessage("SportsId", "Please select sports.");
                } else if ($("#Name").val().trim() === "") {
                    setErrorMessage("Name", "Please enter your name.");
                } else if ($("#Location").val().trim() === "") {
                    setErrorMessage("Location", "Please enter your location.");
                } else if (startDate === "") {
                    setErrorMessage("StartDate", "Please enter start date.");
                } else if (endDate === "") {
                    setErrorMessage("EndDate", "Please enter end date.");
                } else if (newStartDate < currentDate) {
                    setErrorMessage("StartDate", "Start date should be before or the same as the current date.");
                } else if (newStartDate > newEndDate) {
                    setErrorMessage("StartDate", "Start date should be less than or equal to End date.");
                } else if (newDeadlineDate > newEndDate) {
                    setErrorMessage("DeadlineDate", "Deadline date should be less than or equal to End date.");
                } else if (newDeadlineDate < currentDate) {
                    setErrorMessage("DeadlineDate", "Deadline date should be greater than or equal to current date.");
                } else if ($("#Gender").val() === "") {
                    setErrorMessage("Gender", "Please select gender");
                } else if ((!isFree && parseInt(priceOfTournament) > 0) &&
                    (bankId === null || bankId === 0) &&
                    ($("#FederationId").val() !== "")) {
                    alert("Federation account is not created yet. Please create federation account.");
                    window.location.href = `/federations/${$("#FederationId").val()}/createaccount`;
                } else if ((!isFree && parseInt(priceOfTournament) > 0) && status !== "verified") {
                    alert("Federation account is not verified yet.");
                } else if ($("#attachmentid").val() === "" || $("#attachmentid").val() === null) {
                    setErrorMessage("attachmentid", "Please select image");
                } else if (tournamentPrice > priceOfTournament) {
                    setErrorMessage("PriceOfTournament", `Minimum price of attendance is ${tournamentPrice} DKK`);
                } else if (tinymce.activeEditor.getContent() === "") {
                    setErrorMessage("descriptionId", "Description field is required");
                } else {
                    var form = $(this).closest("form");
                    if (form.valid()) {
                        setTimeout(function () {
                            $("#tournamentcreate").attr("disabled", "disabled");
                        },
                            10);
                        $("#tournamentcreateSubmit").click();
                    }
                }
            });
        };

    const init = function () {
        app.bindTiny();
        bindFn();

        const isSuccess = $("#isSuccess").val();
        if (!isSuccess) {
            $("#tournamentcreate").removeAttr("disabled");
        }
    };
    return {
        init: init
    };
}();