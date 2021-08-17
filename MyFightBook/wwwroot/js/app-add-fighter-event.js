var addFighter = function () {
    var init = function () {
        bindFn();
        filteruser();
        paginationFx();
    },
        statisticsPopup = function () {
            $(".statisticsBtn").click(function () {
                var bodyContent = $(this).parent().find(".statistics-block").html();
                $("#FighterStatistics .fighter-statistics-list").html(bodyContent);
                $("#FighterStatistics").modal("show");
            });
        },
        showHideWeightClass = function () {
            var weightClassList = [];
            $("#WeightclassDrp option").each(function () {
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

            $("#FightClassId").change(function () {
                const fightClassId = $(this).val();
                const weightclassDrp = $("#WeightclassDrp");
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
        bindFn = function () {
            if (jQuery.fn.select2) {
                $(".Age-class-box").removeClass("loading-dropdown");
                $(".Age-class-box").closest(".form-group").addClass("select-div");
            }

            $(window).load(function () {
                $('body').addClass('membership-table-dropdown');
            });
            setTimeout(function () {
                $(".alert-success").slideUp();
            }, 3000);

            RefreshErrorMessageBox();
            showHideWeightClass();
            $("#eventcreate").click(function () {
                var fightersIdsList = [];
                var fightClassIdsList = [];
                var clubIdsList = [];
                var weightClassIdList = [];
                let isAllSelectedWeight = true;
                let isAnySelected = false;
                let isAllSelectedFightClass = true;

                $(".row-block").find(".dropdown-toggle").removeClass('input-validation-error');
                $(".row-block").find("#ClassessDrp").removeClass('input-validation-error');

                $.each($(".chk_fighters:checked"), function () {
                    let weightClassId = $(this).closest(".row-block").find(".add-fighter-from-popup input:checked").val();
                    let fightClassIndex = $(this).closest(".row-block").find("#ClassessDrp option:selected").index();
                    let clubId = $(this).closest(".row-block").find('.clubids').val();
                    let fighterId = $(this).val();

                    if (weightClassId === "" || weightClassId === null || weightClassId === undefined) {
                        isAllSelectedWeight = false;
                        $(this).closest(".row-block").find(".dropdown-toggle").addClass('input-validation-error');
                    }
                    else {
                        weightClassIdList.push(weightClassId);
                    }

                    if (fightClassIndex === 0) {
                        isAllSelectedFightClass = false;
                        $(this).closest(".row-block").find("#ClassessDrp").addClass('input-validation-error');
                    }
                    else {
                        var fightClassId = $(this).closest(".row-block").find("#ClassessDrp option:selected").val();
                        fightClassIdsList.push(fightClassId);
                    }

                    fightersIdsList.push(fighterId);
                    clubIdsList.push(clubId);
                    isAnySelected = true;
                });

                let fighterIds = fightersIdsList.length > 0 ? fightersIdsList.join(",") : "";
                let clubIds = clubIdsList.length > 0 ? clubIdsList.join(",") : "";
                let fightClassIds = fightClassIdsList.length > 0 ? fightClassIdsList.join(",") : "";
                let weightClassIds = weightClassIdList.length > 0 ? weightClassIdList.join(",") : "";

                if (isAllSelectedFightClass) {
                    if (isAllSelectedWeight) {
                        if (isAnySelected) {
                            $("#Fighters").val(fighterIds);
                            $("#WeightClassIdForFighter").val(weightClassIds);
                            $("#FightClassIdForFighter").val(fightClassIds);
                            $("#ClubIds").val(clubIds);
                            //Filter Values Bind
                            $("#WeightClassFilterId").val($('#WeightclassDrp').val());
                            if ($("#ClubId").val()) {
                                $("#ClubFilterId").val($("#ClubId").val());
                            }
                            $("#GenderFilter").val($("#ClubId").val());
                            if ($("#Age").val()) {
                                $("#AgeFilter").val($("#Age").val());
                            }
                            if ($("#NoOfFights").val()) {
                                $("#NoOfFightsFilter").val($("#NoOfFights").val());
                            }
                            $("#eventcreateSubmit").click();
                        }
                        else {
                            alert("Please select fighter !!!");
                            return false;
                        }
                    }
                    else {
                        alert("Please select weight class for selected fighters");
                        return false;
                    }
                }
                else {
                    alert("Please select fight class for selected fighters");
                    return false;
                }
            });

            enableDisableWeightClassFx();

            // #region Age Dropdown 
            if ($("#AgeFilter").val() !== "" && $("#AgeFilter").val() != null) {
                let values = $("#AgeFilter").val();
                $("#Age").removeAttr("disabled");
                $.each(values.split(","), function (i, e) {
                    $("#Age option[value='" + e.trim() + "']").prop("selected", true);
                });
            }

            $(".Age-class-box").selectpicker({
                noneSelectedText: "Select Age",
                liveSearch: true,
                hideDisabled: true,
                actionsBox: true,
                virtualScroll: false,
                //container: 'body',
                title: "Select Age"
            });

            $(".form-group").on("shown.bs.dropdown", function () {
                app.applyNiceScroll($('body').find(".dropdown-menu > .inner"));
            });
            // #endregion

            statisticsPopup();
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
        paginationFx = function () {
            $(".pagination-btn").click(function () {
                var eventId = $("#EventId").val();
                var federationId = $("#federationId").val();
                var clubId = $("#ClubId").val();
                var weightClassIdsList = "";
                $.each($("#WeightclassDrp option:selected"), function () {
                    weightClassIdsList.push($(this).val());
                });

                let weightClassIds = weightClassIdsList.length > 0 ? weightClassIdsList.join(",") : "";

                app.showLoader();
                var model = {};
                model.FederationId = federationId;
                model.ClubId = clubId;
                model.WeightClasses = weightClassIds;
                model.eventid = eventId;
                model.PageIndex = $(this).attr("data-val");
                var url = "/events/addfighters";
                app.fetchPost(url, model, function (html) {
                    $(".fighter-list").html(html);
                    RefreshErrorMessageBox();
                    statisticsPopup();
                    enableDisableWeightClassFx();
                    app.hideLoader();
                });
            });
        },
        getFilteredData = function (pageIndex) {
            RereshPageIndex();
            var eventId = $("#EventId").val();
            var federationId = $("#federationId").val();
            var clubId = $("#ClubId").val(), weightClasses = "";

            if (clubId === "" && weightClasses === "") {
                let pageInUrl = window.location.href.split('?')[1];
                let pageIn = pageInUrl !== undefined ? pageInUrl.split('=')[1] : 1;
                pageIndex = pageIn;
            }

            app.showLoader();

            // Age Dropdown Get Selected List
            var ageList = "";
            $.each($("#Age option:selected"), function () {
                ageList.push($(this).val());
            });
            //End

            let age = ageList.length > 0 ? ageList.join(",") : "";
            var model = {};
            model.FederationId = federationId;
            model.ClubId = clubId;
            model.WeightClasses = $("#WeightclassDrp option:selected").val();
            model.eventid = eventId;
            model.PageIndex = pageIndex;
            model.Gender = $("#Gender option:selected").val();
            model.Age = age;
            model.NoOfFights = $("#NoOfFights option:selected").val();
            var url = "/events/getfilteruserlist";
            app.fetchPost(url, model, function (html) {
                $(".fighter-list").html(html);
                var pi = $("#PageIndex_Addfighter").val();
                var rr = $("#RemainingRecord_Addfighter").val();
                if (parseInt(pi) > 1) {
                    $("#previous_Addfighter").css("display", "Block");
                }
                else {
                    $("#previous_Addfighter").css("display", "None");
                }
                if (parseInt(rr) > 0) {
                    $("#next_Addfighter").css("display", "Block");
                }
                else {
                    $("#next_Addfighter").css("display", "None");
                }
                RefreshErrorMessageBox();
                statisticsPopup();
                enableDisableWeightClassFx();

                app.hideLoader();
            });
        },
        filteruser = function () {
            $("#filteruser").click(function () {
                getFilteredData(0);
            });
        },
        Pagination = function (btnType) {
            var eventId = $("#EventId").val();
            var federationId = $("#federationId").val();
            var clubId = $("#ClubId").val();
            var weightClasses = $("#WeightclassDrp option:selected").val();

            var pageIndex = $("#PageIndex_Addfighter").val();
            if (btnType === "Previous") {
                pageIndex = parseInt(pageIndex) - 1;
            }
            else {
                pageIndex = parseInt(pageIndex) + 1;
            }

            app.showLoader();
            var model = {};
            model.FederationId = federationId;
            model.ClubId = clubId;
            model.WeightClasses = weightClasses;
            model.eventid = eventId;
            model.PageIndex = pageIndex;
            model.Gender = $("#Gender option:selected").val();;
            model.Age = $("#Age option:selected").val();;
            model.NoOfFights = $("#NoOfFights option:selected").val();
            var url = "/events/getfilteruserlist";
            app.fetchPost(url, model, function (html) {
                $(".fighter-list").html(html);
                RefreshErrorMessageBox();

                var pi = $("#PageIndex_Addfighter").val();
                var rr = $("#RemainingRecord_Addfighter").val();
                if (parseInt(pi) > 1) {
                    $("#previous_Addfighter").css("display", "Block");
                }
                else {
                    $("#previous_Addfighter").css("display", "None");
                }
                if (parseInt(rr) > 0) {
                    $("#next_Addfighter").css("display", "Block");
                }
                else {
                    $("#next_Addfighter").css("display", "None");
                }
                statisticsPopup();
                enableDisableWeightClassFx();
                app.hideLoader();
            });
        },
        RefreshErrorMessageBox = function () {
            $('.select-radio-block .dropdown .dropdown-menu input').click(function () {
                $(this).closest('.select-radio-block').find("#dropdownMenuButton .custom-radio label").text($(this).siblings().text());
                if ($(this).parent().attr('data-id') !== "" && $(this).parent().attr('data-id') !== null) {
                    $(this).closest(".dropdown").find(".dropdown-toggle").removeClass('input-validation-error');
                }
            });

            $('select#ClassessDrp').change(function () {
                if ($(this).val() !== "") {
                    $(this).removeClass('input-validation-error');
                }
            });
        },
        RereshPageIndex = function () {
            $('#PageIndex_Addfighter').val("0");
            $('#previous_Addfighter').css("display", "none");
        };
    return {
        init: init,
        Pagination: Pagination,
        RereshPageIndex: RereshPageIndex
    };
}();