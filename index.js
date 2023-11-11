/*For Show Hide Menu*/
function showHideMenu() {
   
    $("#ToggleMenu").slideToggle();
    $("#menuBars").toggleClass('toggled-color');
}



/*For Testimonial Caraousel*/

const carouselContainer = document.querySelector(".carousel-container");
const carousel = document.querySelector(".carousel");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const arrows = document.querySelectorAll(".arrow");
const carouselChildren = [...carousel.children];
//15 is gap btw column + width of card
const firstCardWidth = document.querySelector(".card").offsetWidth + 15;
let isDragging = false, startX, startScrollLeft, timeoutId;

//Get the number of cards that could fit in a carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//Insert few copies of last cards to begining of carousel for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {

    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//Insert few copies of starting cards to end of carousel for infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(card => {

    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

right.addEventListener("click", () => {

    carousel.scrollLeft += firstCardWidth;
})
left.addEventListener("click", () => {
  
    carousel.scrollLeft -= firstCardWidth;
})

const dragStart = (e) => {

    isDragging = true;
    carousel.classList.add("dragging");
    //Records the initial cursor and scroll position of the Carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (isDragging) {

        //Update the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
       

    }

}


const dragStop = () => {

    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        //if carousel is at the begining, scroll to the end
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        // console.log("Reached the right end");
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

