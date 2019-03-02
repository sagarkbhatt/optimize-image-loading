( function () {

    var lazyLoadImg = function() {

        var observer = null;

        var ioConfig = {
            root: null,
            rootMargin: '150px 0px 0px 0px',
            threshold: [ 0.2 ]
        };

        var elmsSelector = '[data-lazy-bg-img]';
        
        /**
         * Initialize Lazy Loading
         * 
         * @param {Object} config 
         */
        var init = function( config ) {

            if ( 'undefined' === typeof config ) {
                config = {};
            }
            
            if ( config.selector ) {
                selector = config.selector;
            }

            if ( config.ioConfig ) {
                ioConfig = mergeObj( ioConfig, config.ioConfig );
            }

            onContentLoad = onContentLoad.bind( this );
            onIntersect   = onIntersect.bind( this );
            initIO();
            document.addEventListener( 'DOMContentLoaded', onContentLoad );
        };

        /**
         * Merge object
         * 
         * @param {Object} obj1 Default object.
         * @param {Object} obj2 User given object.
         * 
         * @returns {Object}
         */
        var mergeObj = function( obj1, obj2 ) {
            
            var keys = Object.keys( obj2 );

            for ( var l = 0; l < keys.length; l++ ) {

                if ( keys[l] in obj2 ) {

                    obj1[ keys[l] ] = obj2[ keys[l] ];
                }
            }

            return obj1;
        }

        var onContentLoad = function() {

            var elms = document.querySelectorAll( elmsSelector );

            for( var i = 0; i < elms.length; i++ ) {

                observer.observe( elms[i] );
            }
        }

        var initIO = function() {
    
            observer = new IntersectionObserver( onIntersect, ioConfig );
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
    
                imgElm.src = img.src;
            }

            img.src = imgSrc;
        }

        return {
            init: init
        };
    }

    window.lazyLoadImg  = new lazyLoadImg();
} () );
