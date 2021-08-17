$(function () {
    var countries = [
        {
            "name": "Australia",
            "code": "AU"
        },
        {
            "name": "Austria",
            "code": "AT"
        },
        {
            "name": "Belgium",
            "code": "BE"
        },
        {
            "name": "Canada",
            "code": "CA"
        },
        {
            "name": "Denmark",
            "code": "DK"
        },
        {
            "name": "Finland",
            "code": "FI"
        },
        {
            "name": "France",
            "code": "FR"
        },
        {
            "name": "Germany",
            "code": "DE"
        },
        {
            "name": "Hong Kong",
            "code": "HK"
        },
        {
            "name": "Ireland",
            "code": "IE"
        },
        {
            "name": "Italy",
            "code": "IT"
        },
        {
            "name": "Japan",
            "code": "JP"
        },
        {
            "name": "Luxembourg",
            "code": "LU"
        },
        {
            "name": "Netherlands",
            "code": "NL"
        },
        {
            "name": "New Zealand",
            "code": "NZ"
        },
        {
            "name": "Norway",
            "code": "NO"
        },
        {
            "name": "Portugal",
            "code": "PT"
        },
        {
            "name": "Singapore",
            "code": "SG"
        },
        {
            "name": "Spain",
            "code": "ES"
        },
        {
            "name": "Sweden",
            "code": "SE"
        },
        {
            "name": "Switzerland",
            "code": "CH"
        },
        {
            "name": "United Kingdom",
            "code": "GB"
        },
        {
            "name": "United States",
            "code": "US"
        }
        //{
        //    "name": "Brazil",
        //    "code": "BR"
        //},
        //{
        //    "name": "India",
        //    "code": "IN"
        //},
        //{
        //    "name": "Mexico",
        //    "code": "MX"
        //}
    ]

    var countryInput = $(document).find('.countrypicker');
    var countryList = "";
    var codeclass = 'au';
    var hdnCountryCode = $(".hdnCountryCode").val();
    var hdnAddressCountryCode = $(".hdnAddressCountryCode").val();
    //set defaults
    for (i = 0; i < countryInput.length; i++) {
        var curId = countryInput.eq(i).attr("id");//countrylist //AddressCountry

        //check if flag
        flag = countryInput.eq(i).data('flag');

        if (flag) {
            countryList = "";
            codeclass = 'au';
            //for each build list with flag
            $.each(countries, function (index, country) {
                var selected = "";
                if (curId == "countrylist") {
                    selected = hdnCountryCode == country.code ? "selected" : "";
                }
                else if (curId == "AddressCountry") {
                    selected = hdnAddressCountryCode == country.code ? "selected" : "";
                }
                //var flagIcon = "../../css/flags/" + country.code + ".png";
                if (country.code == "AU") {
                    codeclass = 'au';
                }
                else if (country.code == "AT") {
                    codeclass = 'at';
                }
                else if (country.code == "BE") {
                    codeclass = 'be';
                }
                else if (country.code == "CA") {
                    codeclass = 'ca';
                }
                else if (country.code == "DK") {
                    codeclass = 'dk';
                }
                else if (country.code == "FI") {
                    codeclass = 'fi';
                }
                else if (country.code == "FR") {
                    codeclass = 'fr';
                }
                else if (country.code == "DE") {
                    codeclass = 'de';
                }
                else if (country.code == "HK") {
                    codeclass = 'hk';
                }
                else if (country.code == "IE") {
                    codeclass = 'ie';
                }
                else if (country.code == "IT") {
                    codeclass = 'it';
                }
                else if (country.code == "JP") {
                    codeclass = 'jp';
                }
                else if (country.code == "LU") {
                    codeclass = 'lu';
                }
                else if (country.code == "NL") {
                    codeclass = 'nl';
                }
                else if (country.code == "NZ") {
                    codeclass = 'nz';
                }
                else if (country.code == "NO") {
                    codeclass = 'no';
                }
                else if (country.code == "PT") {
                    codeclass = 'pt';
                }
                else if (country.code == "SG") {
                    codeclass = 'sg';
                } else if (country.code == "ES") {
                    codeclass = 'es';
                }
                else if (country.code == "SE") {
                    codeclass = 'se';
                }
                else if (country.code == "CH") {
                    codeclass = 'ch';
                }
                else if (country.code == "GB") {
                    codeclass = 'gb';
                }
                else {
                    codeclass = 'us';
                }
                countryList += "<option data-country-code='" + country.code + "' data-tokens='" + country.code + " " + country.name + "'  class= '" + codeclass + "' style='padding-left:25px;background-repeat:no-repeat;' value='" + country.code + "' " + selected + ">" + country.name + "</option>";
            });

            //add flags to button

            countryInput.eq(i).on('loaded.bs.select', function (e) {
                //var button = $(this).closest('.btn-group').children('.btn');
                var ele = $(this).closest('.dropdown').find('.btn .filter-option-inner');
                var newclass = '';
                if (hdnCountryCode == "AU" || hdnAddressCountryCode == "AU") {
                    newclass = 'au';
                }
                else if (hdnCountryCode == "AT" || hdnAddressCountryCode == "AT") {
                    newclass = 'at';
                }
                else if (hdnCountryCode == "BE" || hdnAddressCountryCode == "BE") {
                    newclass = 'be';
                }
                else if (hdnCountryCode == "CA" || hdnAddressCountryCode == "CA") {
                    newclass = 'ca';
                }
                else if (hdnCountryCode == "DK" || hdnAddressCountryCode == "DK") {
                    newclass = 'dk';
                }
                else if (hdnCountryCode == "FI" || hdnAddressCountryCode == "FI") {
                    newclass = 'fi';
                }
                else if (hdnCountryCode == "FR" || hdnAddressCountryCode == "FR") {
                    newclass = 'fr';
                }
                else if (hdnCountryCode == "DE" || hdnAddressCountryCode == "DE") {
                    newclass = 'de';
                }
                else if (hdnCountryCode == "HK" || hdnAddressCountryCode == "HK") {
                    newclass = 'hk';
                }
                else if (hdnCountryCode == "IE" || hdnAddressCountryCode == "IE") {
                    newclass = 'ie';
                }
                else if (hdnCountryCode == "IT" || hdnAddressCountryCode == "IT") {
                    newclass = 'it';
                }
                else if (hdnCountryCode == "JP" || hdnAddressCountryCode == "JP") {
                    newclass = 'jp';
                }
                else if (hdnCountryCode == "LU" || hdnAddressCountryCode == "LU") {
                    newclass = 'lu';
                }
                else if (hdnCountryCode == "NL" || hdnAddressCountryCode == "NL") {
                    newclass = 'nl';
                }
                else if (hdnCountryCode == "NZ" || hdnAddressCountryCode == "NZ") {
                    newclass = 'nz';
                }
                else if (hdnCountryCode == "NO" || hdnAddressCountryCode == "NO") {
                    newclass = 'no';
                }
                else if (hdnCountryCode == "PT" || hdnAddressCountryCode == "PT") {
                    newclass = 'pt';
                }
                else if (hdnCountryCode == "SG" || hdnAddressCountryCode == "SG") {
                    newclass = 'sg';
                }
                else if (hdnCountryCode == "ES" || hdnAddressCountryCode == "ES") {
                    newclass = 'es';
                }
                else if (hdnCountryCode == "SE" || hdnAddressCountryCode == "SE") {
                    newclass = 'se';
                }
                else if (hdnCountryCode == "CH" || hdnAddressCountryCode == "CH") {
                    newclass = 'ch';
                }
                else if (hdnCountryCode == "GB" || hdnAddressCountryCode == "GB") {
                    newclass = 'gb';
                }
                else {
                    newclass = 'us';
                }
                ele.removeClass();
                if (hdnCountryCode != null && hdnAddressCountryCode != null && hdnAddressCountryCode != undefined && hdnCountryCode != undefined && hdnCountryCode != '' && hdnAddressCountryCode != '') {
                    ele.addClass('filter-option-inner countrycode ' + newclass + '');
                }
                else {
                    ele.addClass('filter-option-inner countrycode au');
                }
                //  button.hide();
                //var def = $(this).find(':selected').data('country-code');
                //var flagIcon = "../../css/flags/" + def + ".png";
                //button.css("background-size", '20px');
                //button.css("background-position", '10px 9px');
                //button.css("padding-left", '40px');
                //button.css("background-repeat", 'no-repeat');
                ///*  button.css("background-image", "url(../../css/flags/" + def + ".png)");*/
                //button.addClass('au');
                //button.show();
            });

            //change flag on select change
            countryInput.on('change', function () {
                var ele = $(this).closest('.dropdown').find('.btn .filter-option-inner');
                var countryval = $(this).val();
                //console.log(countryval);
                var newclass = '';
                if (countryval == "AU") {
                    newclass = 'au';
                }
                else if (countryval == "AT") {
                    newclass = 'at';
                }
                else if (countryval == "BE") {
                    newclass = 'be';
                }
                else if (countryval == "CA") {
                    newclass = 'ca';
                }
                else if (countryval == "DK") {
                    newclass = 'dk';
                }
                else if (countryval == "FI") {
                    newclass = 'fi';
                }
                else if (countryval == "FR") {
                    newclass = 'fr';
                }
                else if (countryval == "DE") {
                    newclass = 'de';
                }
                else if (countryval == "HK") {
                    newclass = 'hk';
                }
                else if (countryval == "IE") {
                    newclass = 'ie';
                }
                else if (countryval == "IT") {
                    newclass = 'it';
                }
                else if (countryval == "JP") {
                    newclass = 'jp';
                }
                else if (countryval == "LU") {
                    newclass = 'lu';
                }
                else if (countryval == "NL") {
                    newclass = 'nl';
                }
                else if (countryval == "NZ") {
                    newclass = 'nz';
                }
                else if (countryval == "NO") {
                    newclass = 'no';
                }
                else if (countryval == "PT") {
                    newclass = 'pt';
                }
                else if (countryval == "SG") {
                    newclass = 'sg';
                }
                else if (countryval == "ES") {
                    newclass = 'es';
                }
                else if (countryval == "SE") {
                    newclass = 'se';
                }
                else if (countryval == "CH") {
                    newclass = 'ch';
                }
                else if (countryval == "GB") {
                    newclass = 'gb';
                }
                else {
                    newclass = 'us';
                }
                ele.removeClass();
                ele.addClass('filter-option-inner countrycode ' + newclass + '');

                //button = $(this).closest('.btn-group').children('.btn');
                //def = $(this).find(':selected').data('country-code');
                //flagIcon = "../../css/flags/" + def + ".png";
                //button.css("background-size", '20px');
                //button.css("background-position", '10px 9px');
                //button.css("padding-left", '40px');
                //button.css("background-repeat", 'no-repeat');
                ///*  button.css("background-image", "url(../../css/flags/" + def + ".png)");*/
                //button.addClass('au');

            });
        } else {
            countryList = "";

            //for each build list without flag
            $.each(countries, function (index, country) {
                countryList += "<option data-country-code='" + country.code + "' data-tokens='" + country.code + " " + country.name + "' value='" + country.code + "'>" + country.name + "</option>";
            });


        }

        //append country list
        countryInput.eq(i).html(countryList);


        //check if default
        def = countryInput.eq(i).data('default');
        //if there's a default, set it
        if (def) {
            countryInput.eq(i).val(def);
        }


    }

});