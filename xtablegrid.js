/**
 * jQuery xTableGrid plugin
 *
 *
 * @package      jQuery
 * @author      Remi Heens | www.remiheens.fr | jquery@remiheens.fr
 * @copyright   Copyright (c) 2013, Remi Heens.
 * @license      http://creativecommons.org/licenses/by-nc/3.0/
 * @link      http://www.remiheens.fr
 * @version      Version 0.2
 *
 */

(function($){
    $.fn.xtablegrid = function(options) {

        var defaults = {
            width: 300,
            itemsPerLine: 3,
            itemClassName : "item",
            boxClassName : "box",
            bullClassName : "bulle",
            duration : 500
        };

        var options = $.extend(defaults, options);

        var canDisplayOnTop = function(wrapper,element)
        {
            var yWrapper = $(wrapper).offset().top;

            var yElem = $(element).offset().top;

            if(yElem > yWrapper)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        return this.each(function(i, _this) {
            $(_this).css("width",options.width);
            $(_this).css("margin","auto");
            $(_this).css("background","red");

            var widthitem = $(_this).width()/options.itemsPerLine;

            var yWrapper = $(_this).offset().top;


            $("."+options.itemClassName).css("background","grey");
            $("."+options.itemClassName).css("width",widthitem);
            $("."+options.itemClassName).css("height",widthitem);
            $("."+options.itemClassName).css("float","left");

            $("."+options.itemClassName+" ."+options.boxClassName).css("width",widthitem);
            $("."+options.itemClassName+" ."+options.boxClassName).css("height",widthitem);
           $("."+options.itemClassName+" ."+options.boxClassName).css("float","left");

            $("."+options.itemClassName+" ."+options.bullClassName).each(function(j,el){
                $(el).css("width",widthitem);
                $(el).css("height",widthitem);
                $(el).css("position","absolute");
                var top = $(_this).offset().top;
                if(canDisplayOnTop(_this,el))
                {
                    top = $(el).offset().top-widthitem;
                }
                else
                {
                    top  = $(el).offset().top+widthitem;
                }
                $(el).css("top",top);
            });
            $("."+options.itemClassName+" ."+options.bullClassName).css("background","red")
            $("."+options.itemClassName+" ."+options.bullClassName).hide();

            $("."+options.itemClassName+" ."+options.boxClassName).live("mouseover",function()
            {
                $("."+options.itemClassName+" ."+options.bullClassName).hide();
                var yBox = $(this).offset().top;
                if(yBox == yWrapper)
                {
                    $(this).siblings("."+options.bullClassName).show("slide",{direction: 'up'},options.duration);

                }
                else
                {
                    $(this).siblings("."+options.bullClassName).show("slide",{direction: 'down'},options.duration);
                }
            });

            $("."+options.itemClassName+" ."+options.boxClassName).live("mouseout",function()
            {
                $(this).siblings("."+options.bullClassName).hide();
            });
        });
    };
})(jQuery);