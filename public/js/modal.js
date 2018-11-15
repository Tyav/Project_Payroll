// console.log('This is the modal.js')

$(document).ready(function() {
    function disableBack() {window.history.forward()}

    window.onload = disableBack();
    window.onpageshow = function (evt) {if (evt.persisted) disableBack()}

});

// function print(){
//     alert('hello')
// }
// $("#update1").click(function() {
//     alert("Hello");
// });