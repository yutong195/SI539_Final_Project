document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing code) ...
    document.querySelectorAll('.pop_out').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.5}s`;
    })

    var hciSection = document.querySelector('.hci_section_all');
    var elementPosition = hciSection.offsetTop;
    var isElementVisible = false;

    function checkScrollAndAnimate() {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition + window.innerHeight > elementPosition && !isElementVisible) {
            hciSection.classList.remove('hci-section-hidden');
            hciSection.classList.add('hci-section-visible');
            isElementVisible = true;
        } else if (scrollPosition + window.innerHeight < elementPosition && isElementVisible) {
            hciSection.classList.remove('hci-section-visible');
            hciSection.classList.add('hci-section-hidden');
            isElementVisible = false;
        }
    }

    window.addEventListener('scroll', checkScrollAndAnimate);

});







// window.addEventListener("load", function() {
//     console.log("HIHI!")
//     document.querySelectorAll('.pop_out').forEach((el, i) => {
//         el.style.animationDelay = `${i * 0.5}s`;
//     })


// })





// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.pop_out').forEach((el, i) => {
//         el.style.animationDelay = `${i * 0.5}s`;
//     });
// });