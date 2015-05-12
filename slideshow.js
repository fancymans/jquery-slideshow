/*
 *  Author: Darrin Lin
 *  Thanks to Amanda Nguyen for buttons
 *  v1.0
 **/

"use strict";

jQuery(document).ready(function ($) {

// ---------------------------------------------------------------------------//
//                                VARIABLES                                   //
// ---------------------------------------------------------------------------//
    // sliding params
    var time2Slide      = 7000;     // 7 secs till image slides
    var time4Slide      = 500;      // 0.5 secs for image to finish sliding
    var time4Fade       = 250;      // 0.25 secs for caption to fade in/out (0.5 sec total)
    var amount2Slide    = 460;      // the amount of pixels to slide by
    var beginMargin     = 0;        // the margin to go to first slide
    var slideMargin2    = 460;      // margin to second slide
    var endMargin       = 920;      // the margin to go to last slide
    var timeout         = 5000;     // 10 seconds to timeout before image starts sliding again

    // DOM cache
    var $slider         = $("#slideshowWrapper .slideshow");    // what is animating
    var $slides         = $("#slideshowWrapper .slide");        // the container holding all the slides
    var numSlides       = $slides.length - 1;                   // number of slides in $slides
    var currSlide       = 0;                                    // keeps track of the current slide
    var slideaway       = 0; // calculates how many slides away when a numbered slide is clicked on
    var amountNUMslide  = 0; // how much to slide to desination numbered
// ---------------------------------------------------------------------------//



// ---------------------------------------------------------------------------//
//                                  FUNCTIONS                                 //
// ---------------------------------------------------------------------------//
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
        highlightSlideNum();
    }
    // _____________________________________________________


    // FUNCTION - slides to the previous image
    function slidePrev() {
        // debug message
        console.log("Sliding to previous image...");

        // if current slide is the firrst slide then go to the last slide
        // otherwise slide to previous image
        $(".caption").find("span").animate({opacity: 0});
        if (currSlide == 0) {
            $slider.animate({marginLeft: -endMargin}, time4Slide);
            currSlide = numSlides;
        }
        else {
            $slider.animate({marginLeft: "+=" +amount2Slide}, time4Slide);
            currSlide--;
        }
        showCaption();
        highlightSlideNum();
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


    //FUNCTION - called on when user clicks on a certain number button
    function slideNumOnClick(event){
        slideInterval = clearInterval(slideInterval);
        if($(event.target).is('#s1')){    // goes to slide 1
            $slider.animate({marginLeft: beginMargin}, time4Slide);
            currSlide = 0;
        }
        else if($(event.target).is('#s2')){ //goes to slide 2
            $slider.animate({marginLeft: -slideMargin2}, time4Slide);
            currSlide = 1;
        }
        else if($(event.target).is('#s3')){ //goes to slide 3
            $slider.animate({marginLeft: -endMargin}, time4Slide);
            currSlide = 2;
        }
        showCaption();
        highlightSlideNum();
    }
    //______________________________________________________


    // FUNCTION - shows the caption for the current slide. Called when page loads and each time slide transitions
    function showCaption() {
        $(".caption").find("span").animate({opacity: 0}, time4Fade, function() {
            for (var i = 0; i <= numSlides; ++i) {
                var currCaptionID = "caption" + i.toString();   // get the current caption ID
                var captionText = document.getElementById(currCaptionID).textContent;

                if (currSlide == i) {
                    $(".caption").find("span").text(captionText);
                    $(".caption").find("span").animate({opacity: 1}, time4Fade);
                }
            }
        });
    }
    // _____________________________________________________


    // FUNCTION - highlights the current slide number the slideshow is on
    function highlightSlideNum() {
        var currSlideNumID = "";
        for (var i = 0; i <= numSlides; ++i) {
            currSlideNumID = "s" + (i+1).toString();        // get ID for page indicators

            if (currSlide == i) {
                document.getElementById(currSlideNumID).style.opacity = 1;
            }
            else {
                document.getElementById(currSlideNumID).style.opacity = "";
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
// ---------------------------------------------------------------------------//



// ---------------------------------------------------------------------------//
//                                  "MAIN"                                    //
// ---------------------------------------------------------------------------//
    $("#captions").hide();  // Hides the preset captions
    showCaption();          // Show initial caption for 1st slide
    highlightSlideNum();    // Highlights initial slide number

    // Animate slideshow in a set interval
    var slideInterval = setInterval(slideNext, time2Slide);

    // Stop slideshow when user hovers with cursor, resume when not hovering
    $slider.hover(hoverHandlerIn, hoverHandlerOut);

    // When user clicks next button, slideshow slides to next image
    $(".next").click(slideNextOnClick);
    // When user clicks on prev button, the slide goes to the prev image
    $(".prev").click(slidePrevOnClick);
    // When user clicks on any of the numbered button it goes to that slide
    $(".num").click(function(event) {
        slideNumOnClick(event);
    });
});
// ---------------------------------------------------------------------------//
