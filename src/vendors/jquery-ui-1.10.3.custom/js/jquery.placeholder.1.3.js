/**!
 * jQuery Placeholder plugin
 *
 * This plugin is used to support the HTML5 placeholder attribute on most non-HTML5-compliant browsers.
 * 
 * Usage: $.Placeholder.init({ color : "rgb(0,0,0)" });
 * 
 * Date: Sept 2011
 * Author: Otacon (byf1987_at_gmail.com)
 * Project page: https://code.google.com/p/jquery-placeholder-js/
 * Version: 1.3
 * Changelog: 
    1.3 Added cleanBeforeSubmit global function, so that user can call before submitting form by JS. thanks to Krzysztof (kot**********ztof_at_gmail.com) for contributing this idea and some codes.
    1.2 Added semicolons to the end of function, so that the min version work. thanks to Tony (ty*****_at_gmail.com) for pointing this out and providing fix.
	1.1	Updated the code to meet jQuery plugin format. Added parameterized init. 
 	1.0 Initial release.
 * Tested on: Chrome (latest dev version); IE6 (IETester); IE8 (IETester)
 * Known Issues: 
 * 	Placeholder for Password is currently not supported
**/ 
/*
(function($){ 
	$.Placeholder = {
		settings : {
			color : "rgb(169,169,169)", // darkGrey does not work in ie
			dataName : "original-font-color" // the name of the data tag used by this module
		},
		
		// -- Bind event to components --
		init : function(settings){
			// Merge default settings with the ones provided
			if(settings)
			{
				$.extend($.Placeholder.settings, settings);
			}
			
			// -- Util Methods --	
			var getContent = function(element){
				return $(element).val();		
			};
		
			var setContent = function(element, content){
				$(element).val(content);		
			};
			
			var getPlaceholder = function(element){
				return $(element).attr("placeholder");
			};
			
			var isContentEmpty = function(element){
				var content = getContent(element);
				return (content.length === 0) || content == getPlaceholder(element);
			};
				
			var setPlaceholderStyle = function(element){
				$(element).data($.Placeholder.settings.dataName, $(element).css("color"));
				$(element).css("color", $.Placeholder.settings.color);		
			};
			
			var clearPlaceholderStyle = function(element){
				$(element).css("color", $(element).data($.Placeholder.settings.dataName));		
				$(element).removeData($.Placeholder.settings.dataName);
			};
			
			var showPlaceholder = function(element){
				setContent(element, getPlaceholder(element));
				setPlaceholderStyle(element);	
			};
			
			var hidePlaceholder = function(element){
				if($(element).data($.Placeholder.settings.dataName)){
					setContent(element, "");
					clearPlaceholderStyle(element);
				}
			};
			
			// -- Event Handlers --
			var inputFocused = function(){
				if(isContentEmpty(this)){
					hidePlaceholder(this);		
				}
			};
			
			var inputBlurred = function(){
				if(isContentEmpty(this)){
					showPlaceholder(this);
				}
			};
			
			var parentFormSubmitted = function(){
				if(isContentEmpty(this)){
					hidePlaceholder(this);		
				}	
			};
			
			// -- Execution --
			$("textarea, input[type='text']").each(function(index, element){
				if($(element).attr("placeholder")){
					$(element).focus(inputFocused);
					$(element).blur(inputBlurred);
					$(element).bind("parentformsubmitted", parentFormSubmitted);
					
					// triggers show place holder on module init
					$(element).trigger("blur");
					// triggers form submitted event on parent form submit
					$(element).parents("form").submit(function(){
						$(element).trigger("parentformsubmitted");
					});
				}
			});
			
			return this;
		},
        
        // When form is submitted by JS, call this before submit to avoid submitting the placeholder value
        cleanBeforeSubmit : function(theForm){
            // Choose all forms if not given
            if(!theForm){
                theForm = $("form");
            }
            
            // Triggering this event will do the necessary cleanup
            $(theForm).find("textarea, input[type='text']").trigger("parentformsubmitted");
            
            return theForm;
        }
	}
})(jQuery);


;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (exception) {}
	}

}(this, document, jQuery));

*/


/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/

/*$(function() {
function init() {
    $('[placeholder]').placeholder();
}

(function($) {
    function Placeholder(input) {
        this.input = input;
        if (input.attr('type') == 'password') {
            this.handlePassword();
        }
        // Prevent placeholder values from submitting
        $(input[0].form).submit(function() {
            if (input.hasClass('placeholder') && input[0].value == input.attr('placeholder')) {
                input[0].value = '';
            }
        });
    }
    Placeholder.prototype = {
        show : function(loading ) {
            // FF and IE saves values when you refresh the page. If the user refreshes the page with
            // the placeholders showing they will be the default values and the input fields won't be empty.
            if (this.input[0].value === '' || (loading && this.valueIsPlaceholder())) {
                if (this.isPassword ) {
                    try {
                        this.input[0].setAttribute('type', 'text');
                    } catch (e) {
                        this.input.before(this.fakePassword.show()).hide();
                    }
                }
                this.input.addClass('placeholder');
                this.input[0].value = this.input.attr('placeholder');

                this.moveCursorToBeginning();
            }
        },
        hide : function( override ) {
            if (this.valueIsPlaceholder( override ) && this.input.hasClass('placeholder')) {
                this.input.removeClass('placeholder');
                if( !override ) {
                    this.input[0].value = '';
                }

                if (this.isPassword ) {
                    try {
                        this.input[0].setAttribute('type', 'password');
                    } catch (e) { }
                    // Restore focus for Opera and IE
                    this.input.show();
                    this.input[0].focus();
                }

                this.show();
            }
        },
        valueIsPlaceholder : function( override ) {
            if( override && (new RegExp( this.input.attr('placeholder') ).test( this.input[0].value ) ) ) {
                this.input[0].value = this.input[0].value.replace(this.input.attr('placeholder'), '');
                return true;    
            }

            return this.input[0].value == this.input.attr('placeholder');
        },
        handlePassword: function() {
            var input = this.input;
            input.attr('realType', 'password');
            this.isPassword = true;
            // IE < 9 doesn't allow changing the type of password inputs
            if ($.browser.msie && input[0].outerHTML) {
                var fakeHTML = $(input[0].outerHTML.replace(/type=(['"])?password\1/gi, 'type=$1text$1'));
                this.fakePassword = fakeHTML.val(input.attr('placeholder')).addClass('placeholder').focus(function() {
                    input.trigger('focus');
                    $(this).hide();
                });
                $(input[0].form).submit(function() {
                    fakeHTML.remove();
                    input.show();
                });
            }
        },
        moveCursorToBeginning: function( end ) {
            if( !end ) {
                this.input[0].selectionStart = this.input[0].selectionEnd = 0;
            }
            else {
                this.input[0].selectionStart = this.input[0].selectionEnd = this.input[0].value.length;
            }
        }
    };
    var NATIVE_SUPPORT = !!("placeholder" in document.createElement( "input" ) && !$.browser.mozilla);
    $.fn.placeholder = function() {
        return NATIVE_SUPPORT ? this : this.each(function() {
            var input = $(this);
            var placeholder = new Placeholder(input);
            placeholder.show(true);
            input.focus(function() {
                placeholder.show( true );
            });

            input.keyup(function() {
                var testValue = this.value.replace( $(this).attr('placeholder'), '');
                if( testValue === '' ) {
                    placeholder.show();
                }
                else {
                    placeholder.hide( true );
                }
            });
            
            input.blur(function() {
                placeholder.show(false);
            });

            // On page refresh, IE doesn't re-populate user input
            // until the window.onload event is fired.
            if ($.browser.msie) {
                $(window).load(function() {
                    if(input.val()) {
                        input.removeClass("placeholder");
                    }
                    placeholder.show(true);
                });
                // What's even worse, the text cursor disappears
                // when tabbing between text inputs, here's a fix
                input.focus(function() {
                    if(this.value == "") {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveStart('character', 0);
                        range.select();
                       
                    }
                });
               input.mouseup(function(){
                	input[0].setSelectionRange(0, 0);
                	this.value=='';
                	
                });
            }
        });
    }
})(jQuery);

init();
});
*/












/*-- PLUGIN --*/
/*
*
* Placeholder.js 1.1
* Creates placeholder on inputs/textareas for browsers that don't support it (well, IE...)
*
* @ Created by Guillaume Gaubert
* @ http://widgetulous.com/placeholderjs/
* @ © 2011 Guillaume Gaubert
*
* @ Default use :
*   Placeholder.init();
*
*/


Placeholder = {    
    // The normal and placeholder colors
    defaultSettings : {
        normal      : '#000000',
        placeholder : '#C0C0C0',
        wait        : false,
        classFocus  : '',
        classBlur   : ''
    },

    
    init: function(settings)
    {
        // Merge default settings with the ones provided
        if(settings) {
            // Merge the desired settings
            for(var property in settings) {
                Placeholder.defaultSettings[property] = settings[property];
            }
        }
        
        // Let's make the funky part...
        // Get inputs and textareas
        var inputs = document.getElementsByTagName("input");
        var textareas = document.getElementsByTagName("textarea");
        // Merge all that
        var elements = Placeholder.utils.concat(inputs, textareas);
        // Bind events to all the elements
        for (var i = 0; i < elements.length; i++) {
            var placeholder = elements[i].getAttribute("placeholder");
            
            if(placeholder && (elements[i].type == "text" || elements[i].type == "password" || elements[i].type == "textarea")) {
                var _input = elements[i];
                
                // Bind events
                _input.onclick = function(){
                    Placeholder.onSelected(this);
                };
                _input.onkeypress = function(){
                    Placeholder.onSelected(this);
                };
                
                _input.onblur = function(){
                    Placeholder.unSelected(this);
                };
                // Only if we want that wait feature
                if(Placeholder.defaultSettings.wait) {
                    _input.onkeyup = function(){
                        Placeholder.onType(this);
                    };
                }
                
                // Set style and value
                Placeholder.style.inactive(_input);
                _input.value = placeholder;
                //_input.className = Placeholder.defaultSettings.class;
                
                // Check for parent forms
                var forms = document.getElementsByTagName('form');
                for(var f = 0; f < forms.length; f++) {
                    if(forms[f]) {
                        // Check if the current input is a child of that form
                        var children = forms[f].children;
                        if(Placeholder.utils.contains(children, _input)) {
                            // Bind the submit to clear all empty fields
                            forms[f].onsubmit = function() {
                                Placeholder.submitted(this);
                            };
                        }
                    }
                }
                
            }
        };
    },
    
    // Called when an input/textarea is selected
    onSelected: function(input)
    {
        if(Placeholder.defaultSettings.wait == true) {
            if(input.value == input.getAttribute('placeholder')) {
                Placeholder.utils.caret(input);
            }
        }
        else {
            if(input.value == input.getAttribute('placeholder')) {
                input.value = '';
            }
            Placeholder.style.normal(input);
        }
    },
    
    // Called on onkeypressed of an input/textarea, used for the 'wait' setting
    onType: function(input)
    {
        var placeholder = input.getAttribute('placeholder');
        if(input.value != placeholder) {
            var diff = input.value.length - placeholder.length;
            // Check if this is the first character typed
            if(diff >= 1 && input.value.indexOf(placeholder) != -1) {
                input.value = input.value.substring(0, diff);
            }
            Placeholder.style.normal(input);
        }
        // Check if the text field is empty, so back to the inactive state
        if(input.value.length == 0) {
            Placeholder.style.inactive(input);
            input.value = placeholder;
            Placeholder.utils.caret(input);
        }
    },
    
    // Called when an input/textarea is unselected
    // It applies the placeholder state if input value is empty
    unSelected: function(input)
    {
        // Reset a placeholder if the user didn't type text
        if(input.value.length <= 0) {
            Placeholder.style.inactive(input);
            input.value = input.getAttribute("placeholder");
        }
    },
    
    // Called when a form containing an input/textarea is submitted
    // If one of these are empty (placeholder is left), we clear the value for each
    submitted: function(form)
    {
        var children = form.children;
        for(var i = 0; i < children.length; i++) {
            if(children[i]) {
                var node = children[i];
                if(node.tagName.toLowerCase() == "input" || node.tagName.toLowerCase() == "textarea") {
                    if(node.value == node.getAttribute('placeholder')) {
                        node.value = "";
                    }
                }
            }
        }
    },
    
    
    // Style
    // Manage styles for normal and inactive
    
    style : {
        // Apply the normal style to the element
        normal: function(input) {
            // Check if class if set so we use that
            if(Placeholder.defaultSettings.classFocus) {
                input.className = Placeholder.defaultSettings.classFocus;
            }
            else {
                // Use the text color
                input.style.color = Placeholder.defaultSettings.normal;
            }
        },
        
        // Apply the inactive style to the element
        inactive: function(input) {
            // Check if class if set so we use that
            if(Placeholder.defaultSettings.classBlur) {
                input.className = Placeholder.defaultSettings.classBlur;
            }
            else {
                // Use the text color
                input.style.color = Placeholder.defaultSettings.placeholder;
            }
        }
    },
    
    // Utils
    // Private methods
    
    utils : {
        // Check if array contains el
        contains: function(array, el) {
            for(var i = 0; i < array.length; i++) {
                if(array[i]) {
                    if(array[i] == el) {
                        return true;
                    }
                }
            }
            return false;
        },
        // Merge two node lists
        concat: function(node1, node2) {
            var array = [];
            for(var i = 0; i < node1.length; i++) {
                if(node1[i]) {
                    array.push(node1[i]);
                }
            }
            for(var i = 0; i < node2.length; i++) {
                if(node2[i]) {
                    array.push(node2[i]);
                }
            }
            return array;
        },
        // Set caret position to the beginning
        caret: function(input) {
            if(input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(0,0);
            }
            else if(input.createTextRange) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', 0);
                range.moveStart('character', 0);
                range.select();
            }
        }
    }
};



/*-- FUNCTION --*/
$(function(){
	if ($.browser.msie) {
//	if ($.browser.msie  && parseInt($.browser.version, 10) === 7) {
        // Placeholder
        Placeholder.init();
	}
});

