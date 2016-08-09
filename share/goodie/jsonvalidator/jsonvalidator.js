DDH.json_validator = DDH.json_validator || {};

DDH.json_validator.build = function (ops) {
    "use strict";

    // Flag to make denote if IA has been shown or not
    var shown = false;

    ops.data.rows = is_mobile ? 8 : 20;

    return {
        onShow: function () {
            // Make sure this function is run only once, the first time
            // the IA is shown otherwise things will get initialized
            // more than once
            if (shown)
                return;

            // Set the flag to true so it doesn't get run again
            shown = true;

            var $dom = $('.zci--json_validator'),
                $validateButton = $dom.find('.json_validator--validate_button'),
                $clearButton = $dom.find('.json_validator--clear_button'),
                $input = $dom.find('.json_validator--input'),
                $result = $dom.find('.json_validator--result');

            // Load library when the IA is shown for the first time
            DDG.require('jsonlint', function () {
                $validateButton
                    .text('Validate JSON')
                    .prop('disabled', true)
                    .removeClass('btn--skeleton');
                $clearButton
                    .addClass('is-hidden');
            });
            function showButtons() {
                $validateButton
                    .prop('disabled', false)
                    .addClass('btn--primary');
                $clearButton.removeClass('is-hidden');
            }

            function hideButtons() {
                $validateButton
                    .prop('disabled', true)
                    .removeClass('btn--primary');
                $clearButton.addClass('is-hidden');
            }

            var oldVal = '';
            $input.on("change input propertychange", function () {
                var currentVal = $(this).val();
                if (currentVal !== oldVal) {
                    currentVal.length ? showButtons() : hideButtons();
                    oldVal = currentVal;
                }

            });
            $validateButton.click(function () {
                $result.parent().removeClass('is-hidden');
                try {
                    var result = jsonlint.parse($input.val());
                    // JSON is valid
                    if (result) {
                        $result
                            .html("JSON is valid!")
                            .removeClass('tx-clr--red-dark')
                            .addClass('tx-clr--green');
                    }
                } catch (e) {
                    // JSON is invalid, show the exception (error)
                    $result
                        .html(e)
                        .removeClass('tx-clr--green')
                        .addClass('tx-clr--red-dark')
                }
            });

            $clearButton.click(function () {
                // clear the input textarea
                $input.val('').change();

                // hide the results section
                $result.parent().addClass('is-hidden');
            });
        }
    };
};
