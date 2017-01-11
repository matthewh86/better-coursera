// add resize listener
document.body.setAttribute("onresize", "resizeContainersEvent()");

moveContainersAround();

function moveContainersAround() {
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
    var forumsLink = document.getElementsByClassName("week-link-card");
    var extras = document.getElementsByClassName("extras");
    extras[0].appendChild(forumsLink[0]);

    // Resize containers
    resizeContainersEvent();
}

function resizeContainersEvent() {
    var transcript = document.getElementsByClassName("bt3-col-md-12")[0];
    resizeElementHeight(transcript, transcript.getBoundingClientRect().top);
}

function resizeElementHeight(element, minus) {
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
