/*!
Vortext.js
Version 0.1
Copyright 2012 Arek Czechowski
*/

(function ($) {

    var defaults = {
        hover_class: 'hovered',
        letters: false,
        log: false
    };

    function my_plug(element, options) {
        element = $(element);
        options = $.extend(defaults, options || {});
        
        var reg = options.letters ? /(\S)/g : /(\S+)/g;
        var texts = getTextNodesIn(element);

        texts.each(function (i, text) {
            $(text).replaceWith(text.textContent.replace(reg, '<span class="single-word">$1</span>'));
        });

        $("span.single-word").hover( 
            function() {
                $(this).addClass(options.hover_class); 
            },
            function() {
                $(this).removeClass(options.hover_class);
        });

        if(options.log){
            $(".single-word").bind("mouseover", function() {
                console.log($(this).text());
            });
        };
    };
    
    function getTextNodesIn(el) {
        return $(el).find(":not(iframe)").andSelf().contents().filter(function() {
            return this.nodeType == 3;
        });
    };

    $.fn.my_plug = function (options) {
        return this.each(function () {
            my_plug(this, options);
        });
    };

})(jQuery);
