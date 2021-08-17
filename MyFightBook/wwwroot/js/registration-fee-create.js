var registrationFee = function () {
    var init = function () {
        if ($("span").hasClass("field-validation-error")) {
            $(".alert-danger").show();
        }

        if ($('div').hasClass('validation-summary-errors')) {
            setTimeout(function () {
                $(".validation-summary-errors").fadeOut();
            }, 3000);
        }

        var newDate = $("#StartDate").val() != "" ? new Date($("#StartDate").val()) : new Date().setHours(0, 0, 0, 0);

        if ($("#Fee").val() == "0") {
            $("#Fee").val('')
        }

        $('#StartDate').datetimepicker({
            minDate: newDate,
            useCurrent: false,
            format: "L",
            showTodayButton: true,
            icons: {
                next: "fa fa-chevron-right",
                previous: "fa fa-chevron-left",
                today: 'todayText',
            }
        });

        $('#EndDate').datetimepicker({
            minDate: newDate,
            useCurrent: false,
            format: "L",
            showTodayButton: false,
            icons: {
                next: "fa fa-chevron-right",
                previous: "fa fa-chevron-left",
                today: 'todayText',
            }
        })

        $("#StartDate").on("dp.change", function (e) {
            if (e.date > new Date($('#EndDate').val())) {
                $('#EndDate').val('')
            };
            $('#EndDate').data("DateTimePicker").minDate(e.date);
        });

        $("#EndDate").on("dp.change", function (e) {
            if (e.date < new Date($('#StartDate').val())) {
                $('#StartDate').val('')
            };
            $('#StartDate').data("DateTimePicker").maxDate(e.date);
        });
    };
    return {
        init: init
    }
}();