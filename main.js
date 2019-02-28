( function () {

    var lazyLoadBgImg = function() {

        var observer = null;
        
        var init = function() {

            onContentLoad = onContentLoad.bind( this );
            onIntersect   = onIntersect.bind( this );
            initIO();
            document.addEventListener( 'DOMContentLoaded', onContentLoad );
        };

        var onContentLoad = function() {

            var selector = '[data-lazy-bg-img]'
            var elms = document.querySelectorAll( selector );

            for( var i = 0; i < elms.length; i++ ) {

                observer.observe( elms[i] );
            }
        }

        var initIO = function() {

            var options = {
                root: null,
                rootMargin: '150px 0px 0px 0px',
                threshold: [ 0.2 ]
            };
    
            observer = new IntersectionObserver( onIntersect, options );
        }

        var onIntersect = function( entries ) {

            for( var j = 0; j < entries.length; j++ ) {

                if ( entries[j].intersectionRatio > 0 ) {

                    // Stop watching and load the image
                    observer.unobserve(entries[j].target);
                    var imgSrc = entries[j].target.dataset.lazyBgImg;
                    preLoadImage(entries[j].target, imgSrc);
                }

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
