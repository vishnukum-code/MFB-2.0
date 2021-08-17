$(document).ready(function () {
    if ($("span").hasClass("field-validation-error")) {
        $(".alert-danger").show();
    }

    if ($("div").hasClass('validation-summary-errors')) {
        setTimeout(function () {
            $(".validation-summary-errors").fadeOut();
        }, 3000);
    }

    //var currentDate = new Date();
    //var startDate = new Date(currentDate.getFullYear(), 0, 1);
    //var endDate = new Date(currentDate.getFullYear(), 11, 31);

    //$("#SeasonStart").datetimepicker({
    //    format: "MM/DD",
    //    viewMode: "months",
    //    minDate: startDate,
    //    maxDate: endDate,
    //    dayViewHeaderFormat: 'MMMM',
    //    extraFormats: true,
    //    icons: {
    //        time: 'fa fa-clock-o',
    //        date: 'fa fa-calendar',
    //        up: 'fa fa-chevron-up',
    //        down: 'fa fa-chevron-down',
    //        previous: 'fa fa-chevron-left',
    //        next: 'fa fa-chevron-right',
    //        today: 'fa fa-crosshairs',
    //        clear: 'fa fa-trash-o',
    //        close: 'fa fa-times'
    //    }
    //});

    //$("#SeasonEnd").datetimepicker({
    //    format: "MM/DD",
    //    viewMode: "months",
    //    icons: {
    //        time: 'fa fa-clock-o',
    //        date: 'fa fa-calendar',
    //        up: 'fa fa-chevron-up',
    //        down: 'fa fa-chevron-down',
    //        previous: 'fa fa-chevron-left',
    //        next: 'fa fa-chevron-right',
    //        today: 'fa fa-crosshairs',
    //        clear: 'fa fa-trash-o',
    //        close: 'fa fa-times'
    //    }
    //});


    changeMonths();

    $(".change-month").change(function () {
        $(this).closest(".row").find(".season-date").val("0");
        changeMonths();
    });

    $(".change-day").change(function () {
        var selectedDay = $(this).val();
        $(this).closest(".form-group").find(".season-date").val(selectedDay);
    });
});

function changeMonths() {
    const startMonth = $("#StartMonth").val();
    const endMonth = $("#EndMonth").val();
    const tDaysMonths = ["4", "6", "9", "11"];
    const startDays = $("#StartDay");
    const endDays = $("#EndDay");

    var days = `<option value="">Select Season Start Day</option>`;

    for (var i = 1; i <= 29; i++) {
        days += `<option value="${i}">${i}</option>`;
    }

    var startDaysHtml = days;
    var endDaysHtml = days;

    if (startMonth !== "" && startMonth.length > 0) {
        if (jQuery.inArray(startMonth, tDaysMonths) > -1) {
            startDaysHtml += `<option value="30">30</option>`;
        }

        else if (startMonth !== "2") {
            startDaysHtml += `<option value="30">30</option><option value="31">31</option>`;
        }

        startDays.html(startDaysHtml);
        var seasonDay = startDays.closest(".form-group").find(".season-date").val();
        startDays.find(`option[value=${seasonDay}]`).prop("selected", true);
        startDays.select2();
        startDays.removeAttr("disabled");
    }
    else {
        startDays.attr("disabled", "disabled");
        startDays.html(`<option value="">Select Season Start Day</option>`);
    }

    if (endMonth !== "" && endMonth.length > 0) {
        if (jQuery.inArray(endMonth, tDaysMonths) > -1) {
            endDaysHtml += `<option value="30">30</option>`;
        }

        else if (endMonth !== "2") {
            endDaysHtml += `<option value="30">30</option><option value="31">31</option>`;
        }

        endDays.html(endDaysHtml);
        var seasonDay = endDays.closest(".form-group").find(".season-date").val();
        endDays.find(`option[value=${seasonDay}]`).prop("selected", true);
        endDays.select2();
        endDays.removeAttr("disabled");
    }
    else {
        endDays.attr("disabled", "disabled");
        endDays.html(`<option value="">Select Season Start Day</option>`);
    }
}