// Detecting if it is an iOS device, true/false
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform); 

  $(document).ready(function(){ 
    // Defining that "overlay" is the element that has a changing display value
    var overlay = document.querySelector('.w-nav-overlay');

    // Creating our mutation observer, which we attach to overlay later
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {

        // Checking if it's the style attribute got changed and if display value now set to 'none'?
        if( mutationRecord.attributeName === 'style' && window.getComputedStyle(overlay).getPropertyValue('display') !== 'none'){

          //Overlay's  display value is no longer 'none', now changing the "body" styles:
          if (iOS) { 
            // for iOS devices:
            var x = $(window).scrollTop().toFixed()
            

            $('body').css({'overflow': 'hidden',
                           'position': 'fixed',
                           'top' : '-' + x + 'px',
                           'width': '100vw'});
          }
          // for all other devices:
          $('body').css('overflow', 'hidden');  
        } 
         //Overlay's  display value back to 'none' , now changing the "body" styles again:
         else {
               if (iOS) {
               //  for iOS devices:
                  var t = $('body').css('top').replace('-','').replace('px','')
                  $('body').css({'overflow': 'auto',
                                 'position': '',
                                 'width': '100vw'});
                  $('body').animate({scrollTop:t}, 0);
               }
              // for all other devices:
              $('body').css('overflow', '');

        }

      });    
    });
    // Attach the mutation observer to overlay, and only when attribute values change
    observer.observe(overlay, { attributes : true, attributeFilter : ['style']});

  });
