window.addEventListener("load", function() {
    console.log("HIHI!")
    document.querySelectorAll('.pop_out').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.5}s`;
    })


})



// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.pop_out').forEach((el, i) => {
//         el.style.animationDelay = `${i * 0.5}s`;
//     });
// });