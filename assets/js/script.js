$(document).ready(function() {

    $("form[method=post]").append(
        $("<input>")
        .attr("type", "hidden")
        .attr("name", "csrf")
        .attr("value", $("meta[name=csrf]").attr("content"))
    );

    $(document).on("submit", "form", function() {
        $(this).find("input[type=checkbox][data-boolean]").each(function() {
            var checkbox = $(this);
            if (!checkbox.prop("checked")) {
                checkbox.clone()
                    .prop("type", "hidden")
                    .val("false")
                    .insertBefore(checkbox);
            }
        });
    });

    $("form").submit(function(e) {
        if ($(this).hasClass("submitted")) {
            e.preventDefault();
        } else {
            $(this).addClass("submitted");
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    $(".auto-copy")
        .focus(function(e) {
            $(this).select();
            try {
                document.execCommand("copy");
            } catch (e) {}
        })
        .mouseup(function(e) {
            e.preventDefault();
        });

    $("select").each(function() {
        var raw = $(this).data("value");
        if (raw == null || raw == undefined) return;
        $(this).find('option[value="' + raw + '"]').attr("selected", "selected");
    });

    $("input[type=datetime-local]").each(function() {
        var raw = $(this).data("value");
        if (raw == "" || raw == null || raw == undefined || raw == 0) return;
        var dateObj = new Date(raw * 1000);
        var formated = ""; //yyyy-MM-ddThh:mm
        formated += dateObj.getFullYear();
        formated += "-";
        formated += ((dateObj.getMonth() + 1) <= 9 ? "0" : "") + (dateObj.getMonth() + 1).toString();
        formated += "-";
        formated += (dateObj.getDate() <= 9 ? "0" : "") + dateObj.getDate().toString();
        formated += "T";
        formated += (dateObj.getHours() <= 9 ? "0" : "") + dateObj.getHours().toString();
        formated += ":";
        formated += (dateObj.getMinutes() <= 9 ? "0" : "") + dateObj.getMinutes().toString();
        $(this).val(formated);
    });

    $("input[type=date]").each(function() {
        var raw = $(this).data("value");
        if (raw == "" || raw == null || raw == undefined || raw == 0) return;
        var dateObj = new Date(raw * 1000);
        var formated = ""; //yyyy-MM-dd
        formated += dateObj.getFullYear();
        formated += "-";
        formated += ((dateObj.getMonth() + 1) <= 9 ? "0" : "") + (dateObj.getMonth() + 1).toString();
        formated += "-";
        formated += (dateObj.getDate() <= 9 ? "0" : "") + dateObj.getDate().toString();
        $(this).val(formated);
    });

    $(".toggle-password .input-group-text")
        .mousedown(function() {
            $(this).parent().parent().find("input").attr("type", "text");
            $(this).find("span").removeClass("fa-eye");
            $(this).find("span").addClass("fa-eye-slash");
        })
        .mouseup(function() {
            $(this).parent().parent().find("input").attr("type", "password");
            $(this).find("span").removeClass("fa-eye-slash");
            $(this).find("span").addClass("fa-eye");
        });

    if ($(".auto-option").length) {
        $(".auto-option").each(function() {
            var container = $(this);
            container.find(".auto-option-element").each(function() {
                var element = $(this);
                element.addClass("d-flex mb-3 mr-n3");
                element.append($("<button>")
                    .attr("type", "button")
                    .addClass("btn btn-link text-danger auto-option-remove")
                    .append($("<span>").addClass("fa fa-trash-alt"))
                    .click(function() {
                        element.remove();
                        container.trigger("auto-option-removed");
                    })
                );
            });
            var copy = $(this).find(".auto-option-element").first().clone();
            copy.find("input").val("");
            copy.find("select").val("");
            copy.find("select option").prop("selected", false);
            copy.find("textarea").text("");
            container.prepend(
                $("<div>")
                .addClass("d-flex justify-content-end mr-n3")
                .append($("<button>")
                    .attr("type", "button")
                    .addClass("btn btn-link text-success")
                    .append($("<span>").addClass("fa fa-plus"))
                    .click(function() {
                        var fresh = copy.clone();
                        fresh.find(".auto-option-remove").click(function() {
                            fresh.remove();
                            container.trigger("auto-option-removed");
                        });
                        container.append(fresh);
                        container.trigger("auto-option-added");
                    })
                )
            );
        });
    }

    if ($("#theme-switch").length) {

        $("#theme-switch").on("click, change", function() {
            var dark = $("#theme-switch").prop("checked");
            $("#theme-light").prop("disabled", dark);
            $("#theme-dark").prop("disabled", !dark);
            localStorage.setItem("dark-mode", dark ? "true" : "false");
        });

    }

    $("input[data-filter]").on("keypress", function(event) {
        var regex = new RegExp($(this).data("filter"));
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $(document).on("click", ".random-phone .input-group-text", function() {
        $(this).parent().parent().find("input").val(Math.random().toString().slice(2, 12));
    });

    if ($("#notifications").length) {
        $("#notifications-clear").click(function(e) {
            e.preventDefault();
            $.post("/ajax/notifications/clear", {
                "CSRF": $("meta[name=csrf]").attr("content"),
                "Clear": "Clear"
            })
            $("#notifications-container").empty();
            $("#notifications-indicator").remove();
            return false;
        });
    }

    if ($("#template-form").length) {

        $("#TemplateCountry").change(function() {
            if (this.value == "US") {

                $("#TemplateState").removeAttr("disabled", true);
                $("#TemplateStateContainer").show();

                $("#TemplateStateInt").attr("disabled", true);
                $("#TemplateStateInt").val("");
                $("#TemplateStateIntContainer").hide();

            } else {

                $("#TemplateState option").prop("selected", false);
                $("#TemplateState option").first().prop("selected", true);
                $("#TemplateState").attr("disabled", true);
                $("#TemplateStateContainer").hide();

                $("#TemplateStateInt").attr("disabled", false);
                $("#TemplateStateInt").val("");
                $("#TemplateStateIntContainer").show();

            }
        });

        $("#TemplateStateInt").attr("disabled", true);
        $("#TemplateStateInt").val("");
        $("#TemplateStateIntContainer").hide();

    }

    if ($("#order-form").length) {

        var couponAmount = 0;

        $(".FieldLabel").each(function() {
            $(this).data("label", $(this).html());
        });

        function handleType() {

            var type = $("#provider-selector option:selected").data("type");

            if (type == undefined) return;

            $("#Weight").val("");
            if (type.maxweight > 0) {
                $("#Weight").attr("max", type.maxweight);
                $("#WeightHelper").text("(" + type.maxweightformatted + " max)");
                $("#WeightContainer").show();
            } else {
                $("#Weight").val(0);
                $("#WeightContainer").hide();
            }

            $("#Weight").attr("step", type.weightdecimal ? "0.01" : "0");
            $("#Weight").attr("placeholder", (type.weightdecimal ? "0.00" : "0") + " " + type.weightunit);

            $("#FromPhoneContainer").show();
            $("#FromStateIntContainer").show();

            $("#ToPhoneContainer").show();
            $("#ToStateIntContainer").show();

            if (type.international) {

                $("#FromCountry option").prop("selected", false);
                $("#FromCountry option").first().prop("selected", true);
                $("#FromCountry").removeAttr("disabled");

                $("#FromState option").prop("selected", false);
                $("#FromState option").first().prop("selected", true);
                $("#FromState").attr("disabled", true);
                $("#FromStateContainer").hide();

                $("#FromStateInt").attr("disabled", false);
                $("#FromStateInt").val("");
                $("#FromStateIntContainer").show();

                $("#ToCountry option").prop("selected", false);
                $("#ToCountry option").first().prop("selected", true);
                $("#ToCountry").removeAttr("disabled");

                $("#ToState option").prop("selected", false);
                $("#ToState option").first().prop("selected", true);
                $("#ToState").attr("disabled", true);
                $("#ToStateContainer").hide();

                $("#ToStateInt").attr("disabled", false);
                $("#ToStateInt").val("");
                $("#ToStateIntContainer").show();

            } else {

                $("#FromCountry option").prop("selected", false);
                $("#FromCountry option[value=US]").prop("selected", true);
                $("#FromCountry").attr("disabled", true);

                $("#FromState").removeAttr("disabled", true);
                $("#FromStateContainer").show();

                $("#FromStateInt").attr("disabled", true);
                $("#FromStateInt").val("");
                $("#FromStateIntContainer").hide();

                $("#ToCountry option").prop("selected", false);
                $("#ToCountry option[value=US]").prop("selected", true);
                $("#ToCountry").attr("disabled", true);

                $("#ToState").removeAttr("disabled", true);
                $("#ToStateContainer").show();

                $("#ToStateInt").attr("disabled", true);
                $("#ToStateInt").val("");
                $("#ToStateIntContainer").hide();

            }

            if (type.altfields) {

                $("#FromCountry option[value=UK]").prop("selected", true);
                $("#FromCountry").attr("disabled", true);

                $("#FromNameLabel").text("First Name");
                $("#FromCompanyLabel").text("Last Name");
                $("#FromStreetLabel").text("Street");
                $("#FromStreet2Label").text("Building Name");
                $("#FromCityLabel").text("Town");
                $("#FromZipLabel").text("Postcode");

                $("#FromPhoneContainer").hide();
                $("#FromStateIntContainer").hide();

                $("#ToCountry option[value=UK]").prop("selected", true);
                $("#ToCountry").attr("disabled", true);

                $("#ToNameLabel").text("First Name");
                $("#ToCompanyLabel").text("Last Name");
                $("#ToStreetLabel").text("Street");
                $("#ToStreet2Label").text("Building Name");
                $("#ToCityLabel").text("Town");
                $("#ToZipLabel").text("Postcode");

                $("#ToPhoneContainer").hide();
                $("#ToStateIntContainer").hide();

            } else {

                $(".FieldLabel").each(function() {
                    $(this).html($(this).data("label"));
                });

            }

            $("#ToState option[value=PR]").prop("disabled", type.hidestates);
            $("#FromState option[value=PR]").prop("disabled", type.hidestates);

            $("#order-banner").hide().text("");
            if (type.banner !== false && type.banner !== "") {
                $("#order-banner").text(type.banner).show();
            }

            handlePrice();

        }

        function handlePrice() {

            var type = $("#provider-selector option:selected").data("type");

            if (type == undefined) return;

            var weight = $("#Weight").val() - 0;
            var currency = $("#Price").data("currency");

            var price = 0;
            for (var i = 0; i < type.prices.length; i++) {
                var option = type.prices[i];
                if (weight >= option.from && weight <= option.to) {
                    price = option.price;
                }
            }

            var amount = $("#order-to .card").length;
            var total = price * amount;

            if (couponAmount > 0) {
                var discount = (total / 100) * couponAmount;
                total -= discount;
            }

            $("#Price").text(currency + total.toFixed(2));

        }

        $("#provider-selector").change(function(e) {
            if ($(this).hasClass("disabled")) {
                e.preventDefault();
                return false;
            }
            handleType();
        });

        $(".TemplateSelector").change(function() {

            var prefix = "#" + $(this).data("prefix");
            var type = $("#provider-selector option:selected").data("type");

            var id = this.value;
            if (id == "") {
                $(prefix + "Country").val("");
                $(prefix + "StateInt").val("");
                $(prefix + "State option").prop("selected", false);
                $(prefix + "State option").first().prop("selected", true);
                $(prefix + "Name").val("");
                $(prefix + "Company").val("");
                $(prefix + "Phone").val("");
                $(prefix + "Street").val("");
                $(prefix + "Street2").val("");
                $(prefix + "City").val("");
                $(prefix + "Zip").val("");
                return;
            };

            $.get("/address/" + id + "/ajax", function(data) {
                if (data.Success == false || data.Data == false) return;
                var template = data.Data;

                if (type.international) {
                    $(prefix + "Country").val(template.Country);
                    $(prefix + "StateInt").val(template.State);
                } else {
                    $(prefix + "State").find('option[value="' + template.State + '"]').attr("selected", "selected");
                }

                $(prefix + "Name").val(template.Name);
                $(prefix + "Company").val(template.Company);
                $(prefix + "Phone").val(template.Phone);
                $(prefix + "Street").val(template.Street);
                $(prefix + "Street2").val(template.Street2);
                $(prefix + "City").val(template.City);
                $(prefix + "Zip").val(template.Zip);

            });

        });

        $("#Weight").on("click, change", handlePrice);

        var raw = $("#provider-selector").data("preselect");
        if (raw == null || raw == undefined || raw == "" || raw == false) {
            $("#provider-selector option:nth-child(2)").prop("selected", true);
        } else {
            $('#provider-selector option[value="' + raw + '"]').prop("selected", true);
        }

        handleType();
        handlePrice();

        var original = $("#order-to .card").first().clone();
        $("#order-to-add").click(function() {
            addToElement();
        });

        $("#order-to-import").click(function() {
            $("#order-to-import-file").click();
        });

        $("#order-to-import-file").change(function() {
            var files = $(this)[0].files;
            if (files == false || files.length == 0) return;
            if (files[0].name.split(".").pop().toLowerCase().trim() != "csv") return;
            var reader = new FileReader();
            reader.onload = function(event) {
                parseCSV(event.target.result);
            }
            reader.readAsText(files[0], "UTF-8");
        });

        function parseCSV(raw) {
            if (raw == 0 || raw == false || raw == undefined) return;
            var csv = $.csv.toObjects(raw, {
                "separator": ","
            });
            if (csv.length < 1) return;
            $("#order-to .card").remove();
            $.each(csv, function(i, row) {
                addToElement(row);
            });
        }

        function addToElement(prefill = false) {
            var fresh = original.clone();
            fresh.find(".order-to-remove")
                .removeClass("d-none")
                .click(function() {
                    fresh.remove();
                    handlePrice();
                });
            fresh.find(".order-to-template-seletor").addClass("d-none");
            fresh.find(".order-to-country").addClass("d-none");
            if (prefill != false) {
                console.log(prefill);
                //if("Country" in prefill) fresh.find(prefix + "Country").val(prefill.Country);
                //if("State" in prefill) fresh.find(prefix + "StateInt").val(prefill.State);
                if ("State" in prefill) fresh.find("#ToState").find('option[value="' + prefill.State + '"]').attr("selected", "selected");
                if ("Name" in prefill) fresh.find("#ToName").val(prefill.Name);
                if ("Company" in prefill) fresh.find("#ToCompany").val(prefill.Company);
                if ("Phone" in prefill) fresh.find("#ToPhone").val(prefill.Phone);
                if ("Street1" in prefill) fresh.find("#ToStreet").val(prefill.Street1);
                if ("Street2" in prefill) fresh.find("#ToStreet2").val(prefill.Street2);
                if ("City" in prefill) fresh.find("#ToCity").val(prefill.City);
                if ("Zip" in prefill) fresh.find("#ToZip").val(prefill.Zip);

            }


            var type = $("#provider-selector option:selected").data("type");

            if (type == undefined) return;

            if (type.altfields) {

                fresh.find("#ToCountry option[value=UK]").prop("selected", true);
                fresh.find("#ToCountry").attr("disabled", true);

                fresh.find("#ToNameLabel").text("First Name");
                fresh.find("#ToCompanyLabel").text("Last Name");
                fresh.find("#ToStreetLabel").text("Street");
                fresh.find("#ToStreet2Label").text("Building Name");
                fresh.find("#ToCityLabel").text("Town");
                fresh.find("#ToZipLabel").text("Postcode");

                fresh.find("#ToPhoneContainer").hide();
                fresh.find("#ToStateContainer").hide();
                fresh.find("#ToState").prop("disabled", true);
                fresh.find("#ToStateIntContainer").hide();

            }

            $("#order-to").append(fresh);
            handlePrice();
        }

        $("#Coupon").change(function() {
            if ($(this).val() == "") {
                couponAmount = 0;
                $("#CouponMessage").text("").hide();
                handlePrice();
                return;
            };
            $.get("/coupon/ajax/" + $(this).val(), function(data) {
                if (data.Success) {
                    $("#CouponMessage")
                        .text("You get " + data.Data + "% off")
                        .removeClass("text-danger")
                        .addClass("text-success")
                        .show();
                    couponAmount = data.Data;
                    handlePrice();
                } else {
                    $("#CouponMessage")
                        .text("Coupon code is not valid")
                        .removeClass("text-success")
                        .addClass("text-danger")
                        .show();
                }
            });
        });

    }

    if ($(".tracking-copy").length) {
        $(".tracking-copy").click(function() {
            var tracking = $(this).data("tracking").replace(/\s+/g, "").trim();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(tracking).then(function() {
                    // console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                    // console.error('Async: Could not copy text: ', err);
                });
            }
        });
    }

    var cache = {};
    $(document).on("keyup change", ".zip-autofill", function() {
        var zipElem = $(this);
        var clientKey = zipElem.data("key");

        if (clientKey == "") return;

        var cityElem = $(this).parent().parent().find("[name*=City]"); //$("#" + zipElem.data("city"));
        if (cityElem == undefined || cityElem.is(":hidden")) return;

        var stateElem = $(this).parent().parent().find("select[name*=State]"); //$("#" + zipElem.data("state"));
        if (stateElem == undefined || stateElem.is(":hidden")) return;

        var zipCode = $(this).val().substring(0, 5);
        if (zipCode.length != 5) return;
        if (/^[0-9]+$/.test(zipCode) == false) return;

        function updateZipElements(data) {
            if (data.error_msg) {
                //errorDiv.text(data.error_msg);
            } else if ("city" in data) {
                cityElem.val(data.city);
                stateElem.val(data.state);
            }
        }

        if (zipCode in cache) {
            updateZipElements(cache[zipCode]);
        } else {
            var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zipCode + "/radians";
            $.ajax({
                "url": url,
                "dataType": "json"
            }).done(function(data) {
                updateZipElements(data);
                cache[zipCode] = data;
            }).fail(function(data) {
                if (data.responseText && (json = $.parseJSON(data.responseText))) {
                    cache[zipCode] = json;
                    //if (json.error_msg){
                    //errorDiv.text(json.error_msg);
                    //}
                } //else {
                //errorDiv.text('Request failed.');
                //}
            });
        }

    });

});