$(document).ready(function() {
    //alert('good to goo')
    $('#searchtable').hide();
});

$('#showUpdate').hide();

$('#updatestaff').click(function() {
    //$('#updatestaff').show();
});
/*
var name = $('#name');
var email = $('#email');
var account = $('#acct');
var level = $('#lev').val();*/
/*var pay = $('#payst');
*/
/*
//HERE WE COLLECT INFO FOR THE FULL DISPLAY
$.ajax({
    type: 'GET',
    url: '/employees',
    success: function(employees) {
        $.each(employees, function(i, emply) {
            $('#employee').append('<tr>' + '<td>' +
            emply.name  + '<td>' +
            emply.email + '<td>' +
            emply.account + '<td>' +
            emply.level + '<td>' +
            emply.qualif + '<td>' +
            emply.salary + '<td>' +
            emply.pay);
        },
     <div class="row">
      <div class="cell">
        Luke Peters
      </div>
      <div class="cell">
        25
      </div>
      <div class="cell">
        Freelance Web Developer
      </div>
      <div class="cell">
        Brookline, MA
      </div>
      <div class="cell">
        Luke Peters
      </div>
      <div class="cell">
        25
      </div>
      <div class="cell">
        Freelance Web Developer
      </div>
      <div class="cell">
        Brookline, MA
      </div>
    }
});
*/

//HERE WE COLLECT INFO FOR THE FULL DISPLAY
$.get("/employees", function(employees) {
    $.each(employees, function(i, emply) {
        $('#employee').append('<tr class="rows">' + '<td>' +
        emply.id + '<td>' + 
        emply.name  + '<td>' +
        emply.email + '<td>' +
        emply.account + '<td>' +
        emply.level + '<td>' +
        emply.qualif + '<td>' +
        emply.salary + '<td>' +
        emply.paid + '<td>' + '<button id="deletebut" >Del</button>');
    })

});

//ADDING AN EMPLOYEE
$('#addBut').click(function() {
    
    
//HERE WE COMPUTE FOR THE SALARY OF THE EMPLOYEE
    
    
    /*var sal = {
        "Managing Director": "USD70000",
        "Supervisor": "USD45000",
        "General Manager": "USD40000"
    }*/
    //if ($('#qualification').val() in sal) {
    //var salar = sal[`${$('#qualification').val()}`];
    //console.log(salar);
    //}
    var sal;

    $.get("/salaries", function(salaries) {
        $.each(salaries, function(i, salar){
            console.log(salar[$('#level').val()]);
            var sal = salar[$('#level').val()];
            
            //return salar[$('#level').val()];
            
       
    



    //sal();
    //alert(pay1);
   
    //var qualif = $('#qualification').val();
    
    
        /*var newPost = {
            title: title.val(),
            author: author.val(),
        };
    $.ajax({
        type: 'POST',
        url: '/posts',
        data: newPost,
        success: function(newPost) {
            $posts.append('<li>Title: ' + title.val() + ', Author: ' + author.val() + '</li>');
            console.log(newPost)
                },
                error: function() {
                    alert('error saving order');
                }
            });*/
            alert($('#surname').val())
            $.post('/employees', {
                name: $('#surname').val() + ' ' + $('#otherName').val(),
                email: $('#email').val(),
                account: $('#acctNum').val(),
                bank: $('#acctbank').val(),
                level: $('#level').val(),
                qualif: $('#qualification').val(),
                salary: sal,
                paid: "No"
            }, 
            function(data, status) {
                alert(data);
                /*$('#employee').append('<tr>' + '<td>' + '<td>' + 
                $('#surname').val()  + '<td>' +
                $('#email').val() + '<td>' +
                $('#acctNum').val() + '<td>' +
                $('#level').val() + '<td>' +
                $('#qualification').val() + '<td>' +
                sal + '<td>' +
                'no' + '<td>' + '<button id="deletebut" >Del</button>');
                *///$('#orders').append('<li>Title: ' + $('#title').val() + ', Author: ' + $('#author').val() + '</li>');
                alert(status);
            })
        });
    });
});


//TO SEARCH FOR STAFF
$('#searchbutton').click(function() {
    //$('#paytable').hide();
    $('#employee').empty();
    //$('#searchtable').show();
    //if ($('#searchinput').val() !== " " && $('#searchinput') !== ""){
    $.get("/employees", function(employees){
        $.each(employees, function(i, emply){
            var search = emply[$('#searchId').val()]
            if ($('#searchId').val() === 'id'){
                if (search === parseInt($('#searchinput').val())){
                    $('#employee').append('<tr class="rows">' + '<td>' +
                    emply.id + '<td>' + 
                    emply.name  + '<td>' +
                    emply.email + '<td>' +
                    emply.account + '<td>' +
                    emply.level + '<td>' +
                    emply.qualif + '<td>' +
                    emply.salary + '<td>' +
                    emply.paid + '<td>' + '<button id="deletebut" >Del</button>');
                } 
            } else {
                if (search.includes($('#searchinput').val())){
                    $('#employee').append('<tr class="rows">' + '<td>' +
                    emply.id + '<td>' + 
                    emply.name  + '<td>' +
                    emply.email + '<td>' +
                    emply.account + '<td>' +
                    emply.level + '<td>' +
                    emply.qualif + '<td>' +
                    emply.salary + '<td>' +
                    emply.paid + '<td>' + '<button id="deletebut" >Del</button>');
                } 
            }
                /*if (emply[$('#searchId').val()] === $('#searchinput').val()) {
                    $('#employee').append('<tr>' + '<td>' +
                    emply.id + '<td>' + 
                    emply.name  + '<td>' +
                    emply.email + '<td>' +
                    emply.account + '<td>' +
                    emply.level + '<td>' +
                    emply.qualif + '<td>' +
                    emply.salary + '<td>' +
                    emply.paid + '<td>' + '<button id="deletebut" >Del</button>');
                }*/
        })
    });
    
});


//TO DELETE FROM THE DATA
$('#deletebutton').click(function() {
    //if ($('#searchinput').val() !== " " && $('#searchinput') !== ""){
    $.delete("/employees", function(employees){
        alert('gotten');
        $.each(employees, function(i, emply){
            if ($('#deleteId').val() === 'id'){
                if (emply[$('#deleteId').val()] === parseInt($('#deleteinput').val())){
                    delete emply;
                    alert('done');
                } 
            } else {
                if (emply[$('#deleteId').val()] === $('#deleteinput').val()){
                    delete emply;
                    alert('done');
                } 
            }
                /*if (emply[$('#searchId').val()] === $('#searchinput').val()) {
                    $('#employee').append('<tr>' + '<td>' +
                    emply.id + '<td>' + 
                    emply.name  + '<td>' +
                    emply.email + '<td>' +
                    emply.account + '<td>' +
                    emply.level + '<td>' +
                    emply.qualif + '<td>' +
                    emply.salary + '<td>' +
                    emply.paid + '<td>' + '<button id="deletebut" >Del</button>');
                }*/
        })
    });
    
});




//***************** */\* ***************\\
//ADDING A NEW USER AND ITS VALIDATION

//hide list
$('#shortPwdErr').hide();
$('#confNewUserPassword').hide();
$('#newUserPwd').hide();
$('#addNewUser').hide();
$('#unmtPwdErr').hide();

$('#newUserEmail').keyup(function() {
    
    if ($('#newUserPwd').val().length > 6) {
        $('#newUserPwd').show();    
    }
});



$('#newUserPwd').keyup(function() {
    if ($('#newUserPwd').val() !== '') {
        if ($('#newUserPwd').val().length < 8) {
            $('#shortPwdErr').show();
        } else {
            $('#shortPwdErr').fadeOut();
            $('#confNewUserPassword').show();
        }
    } else {
        $('#addNewUser').hide();
    }
});

$('#confNewUserPassword').keyup(function() {
    if ($('#confNewUserPassword').val() !== '') {
        if ($('#newUserPwd').val() === $('#confNewUserPassword').val()) {
            $('#unmtPwdErr').fadeOut();
            $('#addNewUser').fadeIn();
        } else {
            $('#unmtPwdErr').show();
            $('#addNewUser').hide();
        }
    } else {
        $('#addNewUser').hide();
    }
})

$('#addNewUser').click(function() {
    var g = 0;
    $.get("/users", function(users) {
        $.each(users, function(i, user) {
            if (user.username === $('#newUserEmail').val()){
                g = 1;
                
            }
        });
        if (g === 1) {
            alert('User already exist');
        } else {
            $.post('/users', {
                username: $('#newUserEmail').val(),
                password: $('#confNewUserPassword').val()
            },
            function(data, status) {
                console.log(data);
                alert(status);
            })
        }
    });
});

//LOGIN FORM
$(document).ready(function() {
    $('#signIn').click(function() {
        var email = $('#inputEmail3').val();
        var password1 = $('#inputEmail3').val();
        //check blanks
        if (email == '' || password1 == '') {
            $('#inputEmail3, #inputPassword3').css("border","2px solid red");
            $('#inputEmail3, #inputPassword3').css("box-shadow","0 0 3px red");
        }
    })
});


/*
$.post('/employees', {
                name: $('#surname').val() + ' ' + $('#otherName').val(),
                email: $('#email').val(),
                account: $('#acctNum').val(),
                bank: $('#acctbank').val(),
                level: $('#level').val(),
                qualif: $('#qualification').val(),
                salary: sal,
                paid: "No"
            }, 
            function(data, status) {
                alert(data);
                /*$('#employee').append('<tr>' + '<td>' + '<td>' + 
                $('#surname').val()  + '<td>' +
                $('#email').val() + '<td>' +
                $('#acctNum').val() + '<td>' +
                $('#level').val() + '<td>' +
                $('#qualification').val() + '<td>' +
                sal + '<td>' +
                'no' + '<td>' + '<button id="deletebut" >Del</button>');
                //$('#orders').append('<li>Title: ' + $('#title').val() + ', Author: ' + $('#author').val() + '</li>');
                alert(status);
            })
        });
    });
});


$.get("/employees", function(employees){
    $.each(employees, function(i, emply){
        var search = emply[$('#searchId').val()]
        if ($('#searchId').val() === 'id'){
            if (search === parseInt($('#searchinput').val())){
                $('#employee').append('<tr class="rows">' + '<td>' +
                emply.id + '<td>' + 
                emply.name  + '<td>' +
                emply.email + '<td>' +
                emply.account + '<td>' +
                emply.level + '<td>' +
                emply.qualif + '<td>' +
                emply.salary + '<td>' +
                emply.paid + '<td>' + '<button id="deletebut" >Del</button>');
            } */