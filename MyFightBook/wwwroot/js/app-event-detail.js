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
                let winnerId = blockDiv.find(".fighter-winner-sec input:checked").val();
                let roundNumber = blockDiv.find(".round-number").val();

                if ($(this).find("option:selected").index()) {
                    if (winnerId == undefined || winnerId == null || winnerId == "") {
                        isOk = false;
                        alert("Please select winner fighter.");
                        $(this).select2("destroy");
                        $(this).find("option:eq(0)").prop('selected', true);
                        $(this).select2();
                        return false;
                    }

                    if (roundNumber == undefined || roundNumber == null || roundNumber == "") {
                        isOk = false;
                        alert("Please select round number.");
                        $(this).select2("destroy");
                        $(this).find("option:eq(0)").prop('selected', true);
                        $(this).select2();
                        return false;
                    }
                }
                else {
                    blockDiv.find(".f-row .fighter-winner-sec input").prop("checked", false);
                    blockDiv.find(".o-row .fighter-winner-sec input").prop("checked", false);
                    blockDiv.find(".round-number").find("option:eq(0)").prop('selected', true);
                    blockDiv.find(".round-number").select2("destroy");
                    blockDiv.find(".round-number").select2();
                    isOk = true;
                }

                if (isOk) {
                    app.showLoader();
                    let model = {};

                    var SetResult = {
                        "Fighter1Id": blockDiv.find(".f-row .fighter-id").val(),
                        "Fighter2Id": blockDiv.find(".o-row .fighter-id").val(),
                        "OrderNumber": blockDiv.attr("data-id"),
                        "WinnerId": winnerId,
                        "Fights1ClubId": blockDiv.find(".f-row .club-id").val(),
                        "Fights2ClubId": blockDiv.find(".o-row .club-id").val(),
                        "EndingId": $(this).val(),
                        "WeightClassId": blockDiv.find(".weight-class-id").val(),
                        "FightClassId": blockDiv.find(".fight-class-id").val(),
                        "RoundNumber": roundNumber
                    };

                    model.EventId = $("#EventId").val();
                    model.SetResult = SetResult;
                    model.IsSetResult = true;
                    var url = "/events/updateeventfight";
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