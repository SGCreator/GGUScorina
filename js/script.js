const burger = document.querySelector('.header__inner-burger'),
      menu = document.querySelector('.header__inner-nav')

burger.addEventListener('click', function(){
    this.classList.toggle('active')
    menu.classList.toggle('active')
    document.body.classList.toggle('hidden')
})
let slider = (sliderSel,images) => {
    const slide = document.querySelector(sliderSel)
    let i = 1

    function toggleSlide (n,img) {
        setInterval(function(){
            slide.style.background = `url(${img[n]}) no-repeat 0 60px / cover`
            n++
            if(n >= img.length){
                n = 0
            }
        },8000)
    }
    toggleSlide(i,images)
}
slider('.full-block-slider', ['../images/main-slider/slider1.jpg','../images/main-slider/slider2.jpg'])