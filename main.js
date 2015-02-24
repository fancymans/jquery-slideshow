"use strict";

$(document).ready(function () {

    // sliding params
    var time2Slide      = 3000;     // 3 secs till image slides
    var time4Slide      = 500;      // 0.5 secs for image to finish sliding
    var amount2Slide    = 460;      // the amount of pixels to slide by
    var timeout         = 5000;     // 5 seconds to timeout before image starts sliding again

    // DOM cache
    var $slider = $("#slideshowWrapper .slideshow");    // what is animating
    var $slides = $("#slideshowWrapper .slide");        // the container holding all the slides
    var numSlides = $slides.length - 1;                 // number of slides in $slides
    var currSlide = 0;                                  // keeps track of the current slide

// ------------------------------------------------------------------------------//
//                                  FUNCTIONS                                    //
// ------------------------------------------------------------------------------//
    // FUNCTION - slides to the next image
    function slideNext() {
        // debug message
        console.log("Sliding to next image...");

        // if current slide is the last slide then go back to beginning
        // otherwise slide to next image
        if(currSlide == numSlides) {
            $slider.animate({marginLeft: "0px"}, time4Slide);
            currSlide = 0;
        }
        else {
            $slider.animate({marginLeft: "-=" +amount2Slide}, time4Slide);
            currSlide++;
        }
    }

    // FUNCTION - slides to the previous image
    function slidePrev() {
        // debug message
        console.log("Sliding to previous image...");

        // if current slide is the firrst slide then go to the last slide
        // otherwise slide to previous image
        if(currSlide == 0) {
            $slider.animate({marginLeft: "-1840px"}, time4Slide);
            currSlide = numSlides;
        }
        else {
            $slider.animate({marginLeft: "+=" +amount2Slide}, time4Slide);
            currSlide--;
        }
    }

    // FUNCTION - event handler that pauses slideshow when hovered over
    function hoverHandlerIn() {
        slideInterval = clearInterval(slideInterval);
    }

    // FUNCTION - event handler that resumes slideshow when not hovered over
    function hoverHandlerOut() {
        slideInterval = setInterval(slideNext, time2Slide);
    }

// ------------------------------------------------------------------------------//

    // Animate slideshow in a set interval
    var slideInterval = setInterval(slideNext, time2Slide);

    // Stop slideshow when user hovers with cursor, resume when not hovering
    $slider.hover(hoverHandlerIn, hoverHandlerOut);

    // When user clicks next button, slideshow slides to next image
    $(".next").click(slideNext);
    $(".prev").click(slidePrev);

});

