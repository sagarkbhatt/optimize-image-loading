( function () {

    var lazyLoadBgImg = function() {

        var init = function() {

            onContentLoad = onContentLoad.bind( this );
            document.addEventListener( 'DOMContentLoaded', onContentLoad.bind( this ) );
        };

        var onContentLoad = function() {

            console.log( ' hi' );
            var selector = '[data-lazy-bg-img]'
            var elms = document.querySelectorAll( selector );

            for( var i = 0; i < elms.length; i++ ) {

                var imgSrc = elms[i].dataset.lazyBgImg;
                preLoadImage( elms[i], imgSrc )
            }
        }

        var preLoadImage = function( imgElm, imgSrc ) {

            var img = new Image();

            img.onload = function() {
    
                imgElm.style.backgroundImage = 'url(' + img.src + ')';
            }

            img.src = imgSrc;
        }

        return {
            init: init
        };
    }

    var instance = new lazyLoadBgImg();
    instance.init();
} () )