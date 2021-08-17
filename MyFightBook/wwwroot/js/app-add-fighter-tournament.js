var addFighter = function () {
    var init = function () {
        bindFn();
        filteruser(0);
    },
        statisticsPopup = function () {
            $(".statisticsBtn").click(function () {
                const bodyContent = $(this).parent().find(".statistics-block").html();
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

            $('.multi-select').selectpicker('destroy');

            $("#tournamentcreate").click(function () {
                var fighterIdsList = [];
                var clubIdsList = [];
                var fightClassIdsList = [];
                var weightClassIdsList = [];
                let isAllSelectedWeight = true;
                let isAnySelected = false;
                let isAllSelectedFightClass = true;

                $(".row-block").find(".dropdown-toggle").removeClass('input-validation-error');
                $(".row-block").find("#ClassessDrp").removeClass('input-validation-error');

                $.each($(".chk_fighters:checked"), function () {
                    let weightClassId = $(this).closest(".row-block").find(".add-fighter-from-popup input:checked").val();
                    let fightClassIndex = $(this).closest(".row-block").find("#ClassessDrp option:selected").index();
                    var clubId = $(this).closest(".row-block").find('.clubids').val();

                    if (weightClassId === "" || weightClassId === null || weightClassId === undefined) {
                        isAllSelectedWeight = false;
                        $(this).closest(".row-block").find(".dropdown-toggle").addClass('input-validation-error');
                    }
                    else {
                        weightClassIdsList.push(weightClassId);
                    }

                    if (fightClassIndex === 0) {
                        isAllSelectedFightClass = false;
                        $(this).closest(".row-block").find("#ClassessDrp").addClass('input-validation-error');
                    }
                    else {
                        var fightClassId = $(this).closest(".row-block").find("#ClassessDrp option:selected").val();
                        fightClassIdsList.push(fightClassId);
                    }

                    fighterIdsList.push($(this).val());
                    clubIdsList.push(clubId);
                    isAnySelected = true;
                });

                if (!isAnySelected) {
                    alert("Please select fighter !!!");
                }
                else if (!isAllSelectedFightClass) {
                    alert("Please select fight class for selected fighters");
                }
                else if (!isAllSelectedWeight) {
                    alert("Please select weight class for selected fighters");
                }
                else {
                    var fighterIds = fighterIdsList.length > 0 ? fighterIdsList.join(",") : "";
                    var clubIds = clubIdsList.length > 0 ? clubIdsList.join(",") : "";
                    var fightClassIds = fightClassIdsList.length > 0 ? fightClassIdsList.join(",") : "";
                    var weightClassIds = weightClassIdsList.length > 0 ? weightClassIdsList.join(",") : "";

                    $("#Fighters").val(fighterIds);
                    $("#WeightClassIdForFighter").val(weightClassIds);
                    $("#FightClassIdForFighter").val(fightClassIds);
                    $("#ClubIds").val(clubIds);
                    //Filter Values Bind
                    $("#WeightClassFilterId").val($("#WeightclassDrp").val());
                    if ($("#ClubId").val()) {
                        $("#ClubFilterId").val($("#ClubId").val());
                    }
                    $("#GenderFilter").val($("#Gender").val());
                    if ($("#Age").val()) {
                        $("#AgeFilter").val($("#Age").val());
                    }
                    if ($("#NoOfFights").val()) {
                        $("#NoOfFightsFilter").val($("#NoOfFights").val());
                    }
                    $("#tournamentcreateSubmit").click();
                }
            });

            enableDisableWeightClassFx();

            //#region Age Dropdown 
            if ($("#AgeFilter").val() !== "" && $("#AgeFilter").val() != null) {
                let values = $("#AgeFilter").val();
                $("#Age").removeAttr('disabled');
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
                container: "body",
                title: "Select Age"
            });

            $(".form-group").on("shown.bs.dropdown", function (e) {
                app.applyNiceScroll($('body').find(".dropdown-menu > .inner"));
            });
            //#endregion

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
        filteruser = function (PageIndex) {
            $("#filteruser").click(function () {
                RereshPageIndex();

                var federationid = $("#federationId").val();
                var tournamentid = $("#TournamentId").val();
                var clubid = $("#ClubId").val(), WeightClasses = "";
                $.each($("#WeightclassDrp option:selected"), function () {
                    if (WeightClasses === "") {
                        WeightClasses = $(this).val();
                    } else {
                        WeightClasses = WeightClasses + "," + $(this).val();
                    }
                });

                if (clubid === "" && WeightClasses === "") {
                    let pageinurl = window.location.href.split('?')[1];
                    let pagein = pageinurl !== undefined ? pageinurl.split('=')[1] : 1;
                    PageIndex = pagein;
                }

                app.showLoader();

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

                var model = {};
                model.FederationId = federationid;
                model.ClubId = clubid;
                model.WeightClasses = WeightClasses;
                model.tournamentid = tournamentid;
                model.PageIndex = PageIndex;
                model.Gender = $("#Gender option:selected").val();;
                model.Age = $("#Age option:selected").val();;
                model.NoOfFights = $("#NoOfFights option:selected").val();
                var url = "/tournaments/getfilteruserlist";
                app.fetchPost(url, model, function (html) {
                    $(".fighter-list").html(html);
                    RefreshErrorMessageBox();
                    statisticsPopup();

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

                    enableDisableWeightClassFx();

                    app.hideLoader();
                });
            });
        },
        Pagination = function (btnType) {
            var federationid = $("#federationId").val();
            var tournamentid = $("#TournamentId").val();
            var clubid = $("#ClubId").val();
            var WeightClasses = $("#WeightclassDrp option:selected").val();

            var PageIndex = $("#PageIndex_Addfighter").val();
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
            model.tournamentid = tournamentid;
            model.PageIndex = PageIndex;
            model.Gender = $("#Gender option:selected").val();;
            model.Age = $("#Age option:selected").val();;
            model.NoOfFights = $("#NoOfFights option:selected").val();
            var url = "/tournaments/getfilteruserlist";
            app.fetchPost(url, model, function (html) {
                $(".fighter-list").html(html);
                RefreshErrorMessageBox();
                statisticsPopup();

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

            $("select#ClassessDrp").change(function () {
                if ($(this).val() !== "") {
                    $(this).removeClass('input-validation-error');
                }
            });
        },
        RereshPageIndex = function () {
            $('#PageIndex_Addfighter').val('0');
            $('#previous_Addfighter').css("display", "none");
        };
    return {
        init: init,
        Pagination: Pagination,
        RereshPageIndex: RereshPageIndex
    };
}();