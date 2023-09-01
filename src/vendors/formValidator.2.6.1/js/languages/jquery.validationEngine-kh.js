(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "*  ប្រអប់នេះតម្រូវឱ្យបញ្ចូល",
                    "alertTextCheckboxMultiple": "* សូមជ្រើសជម្រើសមួយ ",
                    "alertTextCheckboxe": "* ប្រអប់ធីកនេះតម្រូវឱ្យបញ្ចូល",
                    "alertTextDateRange": "* ប្រអប់កាលបរិច្ឆេទទាំងពីរគឺតម្រូវឱ្យមាន "
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* ប្រអប់តម្លៃ ត្រូវតែស្មើនឹង តម្លៃសាកល្បង"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "*  មិនត្រឹមត្រូវ ",
                    "alertText2": "កាលបរិច្ឆេទ "
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* មិនត្រឹមត្រូវ  ",
                    "alertText2": "ម៉ោងកាលបរិច្ឆេទ"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* ចំនួនតិចបំផុត   ",
                    "alertText2": "  តួអក្សរត្រូវបានអនុញ្ញាត"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* ចំនួនខ្ពស់បំផុត  ",
                    "alertText2": " តួអក្សរត្រូវបានអនុញ្ញាត "
                },
                "groupRequired": {
                    "regex": "none",
                    "alertText": "* អ្នកត្រូវតែបំពេញតម្លៃក្នុងប្រអប់ដូចខាងក្រោម "
                },
                "min": {
                    "regex": "none",
                    "alertText": "*  តម្លៃតូចជាងគឺ "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* តម្លៃធំជាងគេគឺ "
                },
                "past": {
                    "regex": "none",
                    "alertText": "*  កាលបរិច្ឆេទមុនពេល  "
                },
                "future": {
                    "regex": "none",
                    "alertText": "*  កាលបរិច្ឆេទកន្លងមក "
                },      
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "*  ខ្ពស់បំផុត ",
                    "alertText2": "  ជម្រើសត្រូវបានអនុញ្ញាត "
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* សូមជ្រើសរើស ",
                    "alertText2": " ជម្រើស "
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* ប្រអប់បញ្ចូលមិនត្រូវគ្នា "
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* លេខកាតឥណទានមិនត្រឹមត្រូវ "
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                    "alertText": "* លេខទូរស័ព្ទមិនត្រឹមត្រូវ"
                },
                "email": {
                    // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                    "regex": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    "alertText": "* អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* មិនមែនជាចំនួនគត់ត្រឹមត្រូវ "
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* ចំនួនលេខគោលដប់មិនត្រឹមត្រូវ "
                },
                "date": {
//                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                        "regex": /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                    "alertText": "*  កាលបរិច្ឆេទត្រឹមត្រូវត្រូវតែនៅក្នុងទ្រង់ទ្រាយ DD-MM-YYYY "
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* អាសយដ្ឋាន IP មិនត្រឹមត្រូវ "
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* URL ដែលមិនត្រឹមត្រូវ "
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* បញ្ចូលបានតែលេខ"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* បញ្ចូលបានតែអក្សរ "
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* គ្មានតួអក្សរពិសេសដែលបានអនុញ្ញាត "
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* *  ឈ្មោះនេះត្រូវបានបញ្ចូលរួចហើយ",
                    "alertTextLoad": "*  បញ្ជាក់សូមរង់ចាំ"
                },
                "ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* ឈ្មោះនេះគឺអាចប្រើប្រាស់បាន ",
                    "alertText": "*  ឈ្មោះនេះត្រូវបានបញ្ចូលរួចហើយ",
                    "alertTextLoad": "*  បញ្ជាក់សូមរង់ចាំ"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "*  ឈ្មោះនេះត្រូវបានបញ្ចូលរួចហើយ",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* ឈ្មោះនេះគឺអាចប្រើប្រាស់បាន ",
                    // speaks by itself
                    "alertTextLoad": "*  បញ្ជាក់សូមរង់ចាំ"
                },
                "ajaxNameCallPhp": {
                    // remote json service location
                    "url": "phpajax/ajaxValidateFieldName.php",
                    // error
                    "alertText": "*  ឈ្មោះនេះត្រូវបានបញ្ចូលរួចហើយ",
                    // speaks by itself
                    "alertTextLoad": "*  បញ្ជាក់សូមរង់ចាំ"
                },
                "validate2fields": {
                    "alertText": "* សូមបញ្ចូល HELLO"
                },
                //tls warning:homegrown not fielded
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* កាលបរិច្ឆេទមិនត្រឹមត្រូវ "
                },
                //tls warning:homegrown not fielded 
                "dateTimeFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* កាលបរិច្ឆេទមិនត្រឹមត្រូវឬទ្រង់ទ្រាយកាលបរិច្ឆេទ ",
                    "alertText2": "ទ្រង់ទ្រាយរំពឹងថានឹង: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
                },
                "ajaxCheckUsername": {
                    // remote json service location
                    "url": "../checkTitleName.html",
                    "alertTextOk": "*ឈ្មោះនេះគឺអាចប្រើប្រាស់បាន ",
                    // error
                    "alertText": "* ឈ្មោះនេះត្រូវបានបញ្ចូលរួចហើយ",
                    // speaks by itself
                    "alertTextLoad": "* បញ្ជាក់សូមរង់ចាំ"
                }
            };
            
        }
    };

    $.validationEngineLanguage.newLang();
    
})(jQuery);