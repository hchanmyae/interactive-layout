window.onload = function() {

    var timeline = new TimelineMax();
    timeline
    .to(".welcome-text", 1, {y: "-10", autoAlpha:1})
    .from(".c-preloader-bar", 1, {width: "0", autoAlpha:0, ease: Power2.easeOut}, "-=0.5")
    .from(".preloader-bar-1", 1, {width: "0", autoAlpha:0, ease: Power2.easeOut}, "-=0.5")
    .from(".preloader-bar-2", 1, {width: "0", ease: Power2.easeOut}, "-=0.5")
    .to(".c-preloader-bar", 1, {width: "0", autoAlpha:0, ease: Power4.easeOut}, "-=0.5")
    .to(".preloader-bar-1", 1, {width: "0", autoAlpha:0, ease: Power4.easeOut}, "-=0.5")
    .to(".preloader-bar-2", 1, {width: "0", autoAlpha:0, ease: Power4.easeOut}, "-=0.5")
       .to(".welcome-text", 1, {y: "0", autoAlpha:0, ease: Power4.easeOut}, "-=0.5")
    .to(".square-left", 1, {x: -600, autoAlpha:0, ease: Power4.easeOut}, "-=1")
    .to(".square-right", 1, {x: 600, autoAlpha:0, ease: Power4.easeOut}, "-=1")
    .to(".square-left2", 1, {x: -600, autoAlpha:0, ease: Power4.easeOut}, "-=2")
    .to(".square-right2", 1, {x: 600, autoAlpha:0, ease: Power4.easeOut}, "-=2")
    .to(".loader", 1, {x: -2000, ease: Power4.easeOut}, "-=0.5")
  
  
}
document.addEventListener('DOMContentLoaded', () =>{
    gsap.registerPlugin(ScrollTrigger);

    let boxEls,
        cards,
        shoes;

    let anim = {
    init: function() {
        anim.initEls();
        anim.animate();
    },
    initEls: function() {
        boxEls = gsap.utils.toArray(".image-box");
        cards = gsap.utils.toArray(".card");
        shoes = document.querySelectorAll('.shoes');
    },
    animate: function() {

        let tl1 = gsap.timeline({ 
            scrollTrigger: { 
                trigger: '.section1',
                toggleActions: 'play puase resume pause',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.25,
                pin: true
            } 
        })

        let tl2 = gsap.timeline({
        scrollTrigger: {
            id: 'text',
            trigger: '.section2',
            toggleActions: 'play puase resume pause',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.25,
            pin: true
        }
        });

        let tl3 = gsap.timeline({
            scrollTrigger: { 
                trigger: '.section3',
                // toggleActions: 'play puase resume pause',
                start: 'bottom top',
                end: '+500',
                scrub: 0.25,
                pin: false
            } 
        });

        let tl4 = gsap.timeline({
            scrollTrigger: { 
            trigger: '.section4',
            // toggleActions: 'play puase resume pause',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            pin: true
            } 
        });

        tl1
        .to('.cloud-img', { x: 550}, '-=6')
        .from('.text-div', { x: -450}, '-=5.8')
        .to('.bag-img', { xPercent: -30}, '-=0.5')
        .to('.bird', { x: -450}, '-=0.5')
        
        tl2.to(boxEls, {
            xPercent: -100 * (boxEls.length - 1)
        });

        tl3
       .set('.section3', {zIndex:999,  duration: 0.25})
        .to('.shiny', { opacity: 1})
      

        tl4
        .to('.title', { opacity: 1, y: -200}, '-=0.5')
        .from('.model', { x: -120, ease: Power1.easeOut}, '-=1')
        .from('.shadow', { x: -120, ease: Power1.easeOut}, '-=1')
        .from('.shoe1', { x: -260, ease: Power1.easeOut}, '-=0.5')
        .from('.shoe2', { x: -550, ease: Power1.easeOut}, '-=0.6')
        .from('.shoe6', { x: 1500, ease: Power1.easeOut}, '-=0.9')
        .from('.shoe5', { x: 500, ease: Power1.easeOut}, '-=0.5')
        .from('.shoe4', { x: 460, ease: Power1.easeOut}, '-=0.6')
        .from('.shoe3', { x: 860, ease: Power1.easeOut}, '-=0.8')
        
    }
    }

    window.addEventListener('load', function() {
        anim.init();
  
    });

    // image move with mouse
    gsap.utils.toArray(".image-move").forEach((el) => {
        const image = el.querySelector("img.thumb"),
            setX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3" }),
            setY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3" }),
            align = (e) => {
            const top = el.getBoundingClientRect().top;
            setX(e.clientX);
            setY(e.clientY - top);
            },
            startFollow = () => document.addEventListener("mousemove", align),
            stopFollow = () => document.removeEventListener("mousemove", align),
            fade = gsap.to(image, {
            autoAlpha: 1,
            ease: "none",
            paused: true,
            onReverseComplete: stopFollow
            });

        el.addEventListener("mouseenter", (e) => {
            fade.play();
            startFollow();
            align(e);
        });

        el.addEventListener("mouseleave", () => fade.reverse());
        });
        // end

});

$(function () {
    $('.text-items .title-text').hover(function () {
        console.log('hover')
        $('.image-move .thumb').fadeToggle("fast", "linear");      
    });
});


document.addEventListener('mousemove', mouseMoveFunc);
function mouseMoveFunc(e) {
  const depth = 10;
  const moveX = ((e.pageX)-(window.innerWidth/2))/depth;
//   const moveY = ((e.pageY)-(window.innerHeight/2))/depth;
  gsap.to(".moveable", {
    duration: 1,
    x: moveX,
    // y: moveY,
    ease: "slow",
    stagger: 0.010,
    overwrite: true
  });
}