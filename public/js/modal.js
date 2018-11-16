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
$('#searchbutton').click(function() {
    //$('#paytable').hide();
    $('#employee').empty();
    //$('#searchtable').show();
    //if ($('#searchinput').val() !== " " && $('#searchinput') !== ""){
    $.get("/employees", function(employees){
        $.each(employees, function(i, emply){
            var search = emply.id
            /*if ($('#searchId').val() === 'id'){*/
            if (search === parseInt($('#searchinput').val())){
                $('#employee').append('<tr class="rows">' + '<td data-label="ID">' +
                emply.id + '<td data-label="NAME">' + 
                emply.surname + ' ' + emply.othername  + '<td data-label="EMAIL">' +
                emply.email + '<td data-label="ACCOUNT">' +
                emply.account + '<td data-label="LEVEL">' +
                emply.level + '<td data-label="SALARY">' +
                emply.salary + '<td data-label="PAYMENT STATUS">' +
                emply.paid + '<td data-label=""><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleModal" onclick="edits(this.id)">edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button>');
            } else if (Object.values(emply).includes($('#searchinput').val())){
                $('#employee').append('<tr class="rows">' + '<td data-label="ID">' +
                emply.id + '<td data-label="NAME">' + 
                emply.surname + ' ' + emply.othername  + '<td data-label="EMAIL">' +
                emply.email + '<td data-label="ACCOUNT">' +
                emply.account + '<td data-label="LEVEL">' +
                emply.level + '<td data-label="SALARY">' +
                emply.salary + '<td data-label="PAYMENT STATUS">' +
                emply.paid + '<td data-label=""><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleModal" onclick="edits(this.id)">edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button>');
            }
        })
    });
    
});