const track = document.getElementById("image_slider_track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX; //keep track of where the x-value of the mouse is, specifically tracking the starting point from when pressed down.

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerwidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100, //calculate the percentage of the slider slid.
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage, //take last percentage slid, add it to current percentage, and use it below to get the new percentage
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}


// what are touch events? Whatever they are, this deals with them.
window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


