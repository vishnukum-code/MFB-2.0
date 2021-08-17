var appDetails = function () {
    var init = function () {
        bindFn();
    },
        bindFn = function () {
            $(".facebook-icon").click(function () {
                const url = $(this).attr("data-val");
                app.shareOnFacebook(url);
            });

            $("#Load-More").click(function () {
                $("ul.mobile li.hide:lt(5)").removeClass("hide");
                if ($("ul.mobile li.hide").length === 0) {
                    $(this).hide();
                }
            });

            $(".print").click(function () {
                var myStyle = '<link rel="stylesheet" href="/backend-assets/css/style.css" />';
                w = window.open(null, 'Print_Page', 'scrollbars=yes');
                if ($(window).width() < 991) {
                    w.document.write(myStyle + jQuery('.mobile-print-block').html());
                }
                else {
                    w.document.write(myStyle + jQuery('.desktop-print-block').html());
                }
                w.document.close();
                w.print();
            });

            checkboxSelect();
            setWinner();
        },
        checkboxSelect = function () {
            $(".fighter-winner-sec input[type='checkbox']").click(function () {
                let c = $(this).closest('.f-block').hasClass('f-row') ? ".o-row .fighter-winner-sec input" : ".f-row .fighter-winner-sec input";
                let o = $(this).closest('.block').find(c);
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
        setWinner = function () {
            $(".block .set-winner").change(function () {
                let isOk = true;
                let blockDiv = $(this).closest(".block");
                let WinnerId = blockDiv.find(".fighter-winner-sec input:checked").val();
                let RoundNumber = blockDiv.find(".round-no").val();
                let OrderNumber = blockDiv.find(".order-no").val();
                let FighterId = 0;
                let clearResultFighterArr = [];

                let SiblingOrderNumber = 0, TargetBlock = 0, TargetOrderNumber = 0;
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

                let model = {};
                model.TournamentId = $("#TournamentId").val();
                model.WeightClassId = blockDiv.find(".weight-class-id").val();
                model.FightClassId = blockDiv.find(".fight-class-id").val();

                if ($(this).find("option:selected").index()) {
                    if (WinnerId == undefined || WinnerId == null || WinnerId == "") {
                        isOk = false;
                        alert("Please select winner fighter.");
                        $(this).select2("destroy");
                        $(this).find("option:eq(0)").prop('selected', true);
                        $(this).select2();
                        return false;
                    }

                    var FighterRoundNumber = blockDiv.find(".round-number").val();

                    if (FighterRoundNumber == undefined || FighterRoundNumber == null || FighterRoundNumber == "") {
                        isOk = false;
                        alert("Please select round number.");
                        $(this).select2("destroy");
                        $(this).find("option:eq(0)").prop('selected', true);
                        $(this).select2();
                        return false;
                    }

                    var fBlock = blockDiv.find(".fighter-winner-sec input:checked").closest('.f-block');
                    FighterId = fBlock.find('.fighter-id').val();

                    model.IsAwardWin = true;
                    model.FighterType = fBlock.hasClass("f-row") ? 1 : 2;
                    model.AwardWin = {
                        "OrderNumber": OrderNumber,
                        "RoundNo": RoundNumber,
                        "TargetBlock": TargetBlock,
                        "TargetOrderNumber": TargetOrderNumber,
                        "WinnerId": WinnerId,
                        "ClubId": fBlock.find(".club-id").val(),
                        "EndingId": $(this).find("option:selected").val(),
                        "FightRoundNumber": FighterRoundNumber
                    };
                }
                else {
                    blockDiv.find(".f-row .fighter-winner-sec input").prop("checked", false);
                    blockDiv.find(".o-row .fighter-winner-sec input").prop("checked", false);
                    blockDiv.find(".round-number").find("option:eq(0)").prop('selected', true);
                    blockDiv.find(".round-number").select2("destroy");
                    blockDiv.find(".round-number").select2();
                    isOk = true;

                    let clearResultFighterJson = {
                        "OrderNumber": OrderNumber,
                        "RoundNo": RoundNumber,
                        "TargetBlock": TargetBlock,
                        "TargetOrderNumber": TargetOrderNumber
                    };

                    clearResultFighterArr.push(clearResultFighterJson);

                    model.FighterId = WinnerId;
                    model.IsWinnerClearResult = true;
                    model.WinnerClearData = clearResultFighterArr;
                }

                if (isOk) {
                    app.showLoader();
                    var url = "/tournaments/updatetournamentfight";
                    app.fetchPost(url, model, function (html) {
                        window.location.reload();
                    });
                }
            });
        };
    return {
        init: init
    };
}();