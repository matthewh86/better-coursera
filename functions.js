function resizeElementHeight(element, minus) {
    console.log("resizeElementHeight");
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
    console.log("resizeContainersEvent");
    if (document.getElementsByClassName("bt3-col-md-12").length == 0) {
        console.log("resizeContainersEvent FAILED");
        return;
    }

    var transcript = document.getElementsByClassName("bt3-col-md-12")[0];
    resizeElementHeight(transcript, transcript.getBoundingClientRect().top);
}

function moveContainersAround() {
    console.log("moveContainersAround");
    if (document.getElementsByClassName("rc-ItemSecondaryNav").length == 0) {
        console.log("moveContainersAround FAILED");
        return;
    }

    // move Downloads to the left
    var lectureResources = document.getElementsByClassName("rc-LectureResources")[0];
    var secondaryNav = document.getElementsByClassName("rc-ItemSecondaryNav")[0];
    secondaryNav.appendChild(lectureResources);

    // Move transcript to the right
    var transcript = document.getElementsByClassName("flex-3")[0];
    var drawerContainer = document.getElementsByClassName("week-drawer-container")[0];
    drawerContainer.appendChild(transcript);

    // Move Transcript to be separate from Transcript Search
    var transcriptContainer = document.getElementsByClassName("rc-InteractiveTranscriptContainer")[0];
    var transcriptText = document.getElementsByClassName("bt3-col-md-12")[0];
    transcriptContainer.appendChild(transcriptText);

    // Set Transcript to be Scroll-able
    transcriptText.style.overflowY = "scroll";

    // Move forums to the centre
    var forumsLink = document.getElementsByClassName("week-link-card")[0];
    var extras = document.getElementsByClassName("extras")[0];
    extras.appendChild(forumsLink);

    // Resize containers
    resizeContainersEvent();
}

function addResizeListener() {
    console.log("addResizeListener");
    window.addEventListener('resize', resizeContainersEvent());
}

function checkRequiredElementsAreLoaded() {
    return document.getElementsByClassName("bt3-col-md-12").length > 0
            && document.getElementsByClassName("rc-ItemSecondaryNav").length > 0
            && document.getElementsByClassName("rc-LectureResources").length > 0
            && document.getElementsByClassName("rc-InteractiveTranscriptContainer").length > 0
            && document.getElementsByClassName("flex-3").length > 0
            && document.getElementsByClassName("week-drawer-container").length > 0
            && document.getElementsByClassName("week-link-card").length > 0
            && document.getElementsByClassName("extras").length > 0
            && document.getElementsByClassName("video-container").length > 0;
}

function initialiseFunctions() {
    console.log("initialiseFunctions");

    // wait until stuff has been loaded
    var checkExist = setInterval(function() {
        if (checkRequiredElementsAreLoaded()) {
            console.log("Page appears to be loaded")
            clearInterval(checkExist);
            addResizeListener();
            moveContainersAround();
        }
    }, 100);
}

initialiseFunctions();
