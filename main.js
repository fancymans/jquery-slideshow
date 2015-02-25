"use strict";

$(document).ready(function () {

// ------------------------------------------------------------------------------//
//                                  VARIABLES                                    //
// ------------------------------------------------------------------------------//
    // sliding params
    var time2Slide      = 7000;     // 7 secs till image slides
    var time4Slide      = 500;      // 0.5 secs for image to finish sliding
    var amount2Slide    = 460;      // the amount of pixels to slide by
    var beginMargin     = 0;        // the margin to go to first slide
    var endMargin       = 1840;     // the margin to go to last slide
    var timeout         = 10000;    // 10 seconds to timeout before image starts sliding again

    // DOM cache
    var $slider     = $("#slideshowWrapper .slideshow");    // what is animating
    var $slides     = $("#slideshowWrapper .slide");        // the container holding all the slides
    var numSlides   = $slides.length - 1;                   // number of slides in $slides
    var currSlide   = 0;                                    // keeps track of the current slide
// ------------------------------------------------------------------------------//



// ------------------------------------------------------------------------------//
//                                  FUNCTIONS                                    //
// ------------------------------------------------------------------------------//
    // FUNCTION - slides to the next image
    function slideNext() {
        // debug message
        console.log("Sliding to next image...");

        // if current slide is the last slide then go back to beginning
        // otherwise slide to next image
        if (currSlide == numSlides) {
            $slider.animate({marginLeft: beginMargin}, time4Slide);
            currSlide = 0;
        }
        else {
            $slider.animate({marginLeft: "-=" +amount2Slide}, time4Slide);
            currSlide++;
        }
        showCaption();
    }
    // _____________________________________________________


    // FUNCTION - slides to the previous image
    function slidePrev() {
        // debug message
        console.log("Sliding to previous image...");

        // if current slide is the firrst slide then go to the last slide
        // otherwise slide to previous image
        if (currSlide == 0) {
            $slider.animate({marginLeft: -endMargin}, time4Slide);
            currSlide = numSlides;
        }
        else {
            $slider.animate({marginLeft: "+=" +amount2Slide}, time4Slide);
            currSlide--;
        }
        showCaption();
    }
    // _____________________________________________________


    // FUNCTION - called when user clicks on next slide button
    function slideNextOnClick() {
        // debug message
        console.log("User clicked NEXT");

        slideInterval = clearInterval(slideInterval);       // pause the slideshow
        slideNext();                                        // slide to next
        slideInterval = setInterval(slideNext, time2Slide); // resume slideshow
    }
    // _____________________________________________________


    // FUNCTION - called when user clicks on previous slide button
    function slidePrevOnClick() {
        // debug message
        console.log("User clicked PREV");

        slideInterval = clearInterval(slideInterval);       // pause the slideshow
        slidePrev();                                        // slide to prev
        slideInterval = setInterval(slideNext, time2Slide); // resume slideshow
    }
    // _____________________________________________________


    // FUNCTION - shows the caption for the current slide. Called when page loads and each time slide transitions
    function showCaption() {
        for (var i = 0; i <= numSlides; ++i) {
            if (currSlide == i) {
                var currCaptionID = "caption" + i.toString();   // get the current caption ID

                // debug messages
                console.log("currSlide: %i", i);
                console.log("Current caption ID: " + currCaptionID);

                var captionText = document.getElementById(currCaptionID).textContent;

                // debug message
                console.log("Caption text: " + captionText);

                $(".caption").html(captionText);    // insert captionText to the caption
            }
        }
    }
    // _____________________________________________________


    // FUNCTION - event handler that pauses slideshow when hovered over
    function hoverHandlerIn() {
        slideInterval = clearInterval(slideInterval);
    }
    // _____________________________________________________


    // FUNCTION - event handler that resumes slideshow when not hovered over
    function hoverHandlerOut() {
        slideInterval = setInterval(slideNext, timeout);
    }
    // _____________________________________________________
// ------------------------------------------------------------------------------//



// ------------------------------------------------------------------------------//
//                                   "MAIN"                                      //
// ------------------------------------------------------------------------------//
    $("#captions").hide();  // Hides the preset captions
    showCaption();          // Show initial caption for 1st slide

    // Animate slideshow in a set interval
    var slideInterval = setInterval(slideNext, time2Slide);

    // Stop slideshow when user hovers with cursor, resume when not hovering
    $slider.hover(hoverHandlerIn, hoverHandlerOut);

    // When user clicks next button, slideshow slides to next image
    $(".next").click(slideNextOnClick);
    $(".prev").click(slidePrevOnClick);
});
// ------------------------------------------------------------------------------//

