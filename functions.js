'use strict';

var timeoutId = 0;

const c_transcript = "bt3-col-md-12";
const c_transcriptSearch = "rc-InteractiveTranscript";
const c_secondaryNav = "rc-ItemSecondaryNav";
const c_lectureResources = "rc-LectureResources"
const c_interactiveTranscript = "rc-InteractiveTranscriptContainer";
const c_weekDrawerContainer = "week-drawer-container";
const c_forumsLink = "week-link-card";
const c_videoContainer = "video-container";
const c_extras = "extras";
const c_centreColumn = "content-container";
const c_rightColumn = "flex-3";

function resizeElementHeight(element, minus) {
    //console.log("resizeElementHeight");
    var height = 0;
    var body = window.document.body;
    if (window.innerHeight) {
        height = window.innerHeight;
    } else if (body.parentElement.clientHeight) {
        height = body.parentElement.clientHeight;
    } else if (body && body.clientHeight) {
        height = body.clientHeight;
    }
    element.style.height = ((height - element.offsetTop - minus) + "px");
}

function resizeContainersEvent() {
    //console.log("resizeContainersEvent");

    // resize left nav pane
    var secondaryNav = document.getElementsByClassName(c_secondaryNav)[0];
    resizeElementHeight(secondaryNav, secondaryNav.getBoundingClientRect().top);

    // resize right transcript
    var transcript = document.getElementsByClassName(c_transcript)[0];
    var transcriptSearch = document.getElementsByClassName(c_transcriptSearch)[0];
    resizeElementHeight(transcript, transcriptSearch.getBoundingClientRect().top);

    // resize centre column
    var centreColumn = document.getElementsByClassName(c_centreColumn)[0];
    resizeElementHeight(centreColumn, centreColumn.getBoundingClientRect().top);
}

function moveContainersAround() {
    //console.log("moveContainersAround");

    // move Downloads to the left
    var lectureResources = document.getElementsByClassName(c_lectureResources)[0];
    var secondaryNav = document.getElementsByClassName(c_secondaryNav)[0];
    secondaryNav.appendChild(lectureResources);

    // Move transcript to the right
    var transcript = document.getElementsByClassName(c_rightColumn)[0];
    var drawerContainer = document.getElementsByClassName(c_weekDrawerContainer)[0];
    drawerContainer.appendChild(transcript);

    // Move Transcript to be separate from Transcript Search
    var transcriptContainer = document.getElementsByClassName(c_interactiveTranscript)[0];
    var transcriptText = document.getElementsByClassName(c_transcript)[0];
    transcriptContainer.appendChild(transcriptText);

    // Move forums to the centre
    var forumsText = document.getElementsByClassName(c_forumsLink)[0];
    var forumsLink = forumsText.parentElement;
    var extras = document.getElementsByClassName(c_extras)[0];
    extras.appendChild(forumsLink);

    // Resize containers
    resizeContainersEvent();
}

function addResizeListener() {
    //console.log("addResizeListener");

    window.addEventListener('resize', function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function() {
            chrome.runtime.sendMessage({message: "resize"}, function(response) {
                if (response.message == "resize") {
                    resizeContainersEvent();
                }
              });
          timeoutId = 0;
        }, 100);
      }, false);
}

function checkRequiredElementsAreLoaded() {
    return document.getElementsByClassName(c_transcript).length > 0
            && document.getElementsByClassName(c_secondaryNav).length > 0
            && document.getElementsByClassName(c_lectureResources).length > 0
            && document.getElementsByClassName(c_interactiveTranscript).length > 0
            && document.getElementsByClassName(c_rightColumn).length > 0
            && document.getElementsByClassName(c_weekDrawerContainer).length > 0
            && document.getElementsByClassName(c_forumsLink).length > 0
            && document.getElementsByClassName(c_extras).length > 0
            && document.getElementsByClassName(c_videoContainer).length > 0;
}

function initialiseFunctions() {
    //console.log("initialiseFunctions");

    // wait until stuff has been loaded
    var checkExist = setInterval(function() {
        if (checkRequiredElementsAreLoaded()) {
            //console.log("Page appears to be loaded")
            clearInterval(checkExist);
            addResizeListener();
            moveContainersAround();
        }
    }, 100);
}

initialiseFunctions();
