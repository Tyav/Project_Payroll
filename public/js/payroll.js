$(document).ready(function() {
    //alert('good to goo')
    $('#searchtable').hide();
});

var mainTable = '<thead ><col width="40px" /><col width="140px" /><col width="140px" /><col width="140px" /><col width="140px" /><col width="80px" /><col width="80px" /><col width="40px" /><tr id="thead"><th>ID</th><th>NAME</th><th>EMAIL</th><th>ACCOUNT</th><th>LEVEL</th><th>SALARY</th><th>PAYMENT STATUS</th><th></th></tr></thead>'
var mintable = '<thead ><col width="40px" /><col width="140px" /><col width="140px" /><col width="80px" /><col width="80px" /><col width="40px" /><tr id="thead"><th>ID</th><th>NAME</th><th>ACCOUNT</th><th>SALARY</th><th>PAYMENT STATUS</th><th></th></tr></thead>'

$('#showUpdate').hide();

$('#updatestaff').click(function() {
});


//HERE WE COLLECT INFO FOR THE FULL DISPLAY
$.get("http://localhost:3000/employees", function(employees) {
    $.each(employees, function(i, emply) {
        $('#employee').append('<tr class="rows">' + '<td>' +
        emply.id + '<td>' + 
        emply.surname + ' ' + emply.othername  + '<td>' +
        emply.email + '<td>' +
        emply.account + '<td>' +
        emply.level + '<td>' +
        emply.salary + '<td>' +
        emply.paid + '<td><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleModal" onclick="edits(this.id)">edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button>');
    });
    $('.delbut').click(function() {
        var staffid = this.id;
        alert(staffid)
        $.ajax({
            url: `/employees/${staffid}`,
            method: 'delete',
            success: function(response) {
                window.location.replace("http://localhost:3000");
            } 
        
        });
    });
    //TO PAY STAFF
    $('.paybut').click(function() {
        var payId = this.id.split('p').join('');
        $.get('/employees/' + payId, function(emply) {
            var staffid = emply.id;
            var surname = emply.surname;
            var othername = emply.othername;
            var emails = emply.email;
            var account = emply.account;
            var accttype = emply.accttype;
            var levels = emply.level;
            var qual = emply.qualif;
            var salarys = emply.salary;
            var bank = emply.bank;

            $.ajax({
                url: `/employees/${payId}`,
                method: 'PUT',
                data: {
                    id: parseInt(staffid),
                    surname: surname,
                    othername: othername,
                    email: emails,
                    account: account,
                    bank: bank,
                    accttype: accttype,
                    level: levels,
                    qualif: qual,
                    salary: salarys,
                    paid: "Yes"     
                },
                success: function(response) {
                    window.location.replace("http://localhost:3000");
                }
            });
        });

    });       
});

//DELETE EMPLOYEE <a href="http://localhost:3000/employees/?id=${emply.id}"></a>

function edits(x) {
    var stafid = x.split('e').join('');
    $.get('employees/' + stafid, function(data){
        $('#surname').val(data.surname);
            $('#otherName').val(data.othername);
            $('#email').val(data.email);
            $('#acctNum').val(data.account);
            $('#acctbank').val(data.bank);
            $('#accttype').val(data.accttype);
            $('#level').val(data.level);
            $('#qualification').val(data.qualif);
            $('#paid').val(data.paid);
            $('#updateId').val(data.id);
    })
}



//ADDING AN EMPLOYEE

$('#addBut1').click(function() {
    
    
//HERE WE COMPUTE FOR THE SALARY OF THE EMPLOYEE
    
    $.get("/salaries", function(salaries) {
        $.each(salaries, function(i, salar){
            console.log(salar[$('#level').val()]);
            var sal = salar[$('#level').val()];
            
            $.post('/employees', {
                surname: $('#surname').val(),
                othername: $('#otherName').val(),
                email: $('#email').val(),
                account: $('#acctNum').val(),
                bank: $('#acctbank').val(),
                accttype: $('#accttype').val(),
                level: $('#level').val(),
                qualif: $('#qualification').val(),
                salary: sal,
                paid: "No"
            }, 
            function(data, status) {
                alert(status)
                window.location.replace("http://localhost:3000");
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
            var search = emply['id']
            /*if ($('#searchId').val() === 'id'){*/
            if (search === parseInt($('#searchinput').val())){
                $('#employee').append('<tr class="rows">' + '<td>' +
        emply.id + '<td>' + 
        emply.surname + ' ' + emply.othername  + '<td>' +
        emply.email + '<td>' +
        emply.account + '<td>' +
        emply.level + '<td>' +
        emply.salary + '<td>' +
        emply.paid + '<td><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleModal" onclick="edits(this.id)">edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button>');
            } 
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
                } 
            } else {
                if (emply[$('#deleteId').val()] === $('#deleteinput').val()){
                    delete emply;
                } 
            }
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
    
    if ($('#newUserEmail').val().length > 6) {
        $('#newUserPwd').show();    
    }
});



$('#newUserPwd').keyup(function() {
    if ($('#newUserPwd').val().length > 7) {
        $('#shortPwdErr').fadeOut();
        $('#confNewUserPassword').show();
        $('#newUserPwd').css("border","2px solid green");
        $('#newUserPwd').css("box-shadow","0 0 3px green");
    } else {
        $('#shortPwdErr').show();
        $('#confNewUserPassword').hide();
        $('#addNewUser').hide();
        $('#newUserPwd').css("border","2px solid red");
        $('#newUserPwd').css("box-shadow","0 0 3px red");
        $('#unmtPwdErr').fadeOut();
    }
    if ($('#newUserPwd').val() !== $('#confNewUserPassword').val()) {
        $('#addNewUser').hide();


    }
});

$('#confNewUserPassword').keyup(function() {
    if ($('#newUserPwd').val() === $('#confNewUserPassword').val()) {
        $('#unmtPwdErr').fadeOut();
        $('#addNewUser').fadeIn();
        $('#confNewUserPassword').css("border","2px solid green");
        $('#confNewUserPassword').css("box-shadow","0 0 3px green");
    } else {
        $('#unmtPwdErr').show();
        $('#addNewUser').hide();
        $('#confNewUserPassword').css("border","2px solid red");
        $('#confNewUserPassword').css("box-shadow","0 0 3px red");       
    }
});

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
$('#inputEmail3, #inputPassword3').keyup(function(){
    $('#inputEmail3, #inputPassword3').css("border","2px solid green");
    $('#inputEmail3, #inputPassword3').css("box-shadow","0 0 3px green");
});
$('#signIn').click(function() {
    var userName = $('#inputEmail3').val();
    var password1 = $('#inputPassword3').val();
    //check blanks
    if (userName == '' || password1 == '') {
        $('#inputEmail3, #inputPassword3').css("border","2px solid red");
        $('#inputEmail3, #inputPassword3').css("box-shadow","0 0 3px red");
    } else {
        $.get('http://localhost:3000/users', function(users) {
            $.each(users, function(i, user){
                if (user.username === userName && user.password === password1) {
                    alert('corret');
                    window.location.replace("http://localhost:3000");
                } else {
                    alert('invalid user');
                }
            })
        })
    }
})

//TO UPDATE STAFF
$('#updateBut').click(function() {
    if ($('#updateId').val() === '') {
        alert('Please input Id');
    } else if (isNaN($('#updateId').val()) !== false) {
        alert('Invalid Id')
    } else {
        var staffid = $('#updateId').val();

        $.get('/employees/' + staffid, function(employees) {
            alert('start')
            var pay = employees.paid;
            var sal = employees.salary
            $.ajax({
                url: '/employees/' + staffid,
                method: 'PUT',
                data: {
                    id: parseInt(staffid),
                    surname: $('#surname').val(),
                    othername: $('#otherName').val(),
                    email: $('#email').val(),
                    account: $('#acctNum').val(),
                    accttype: $('#accttype').val(),
                    bank: $('#acctbank').val(),
                    level: $('#level').val(),
                    qualif: $('#qualification').val(),
                    salary: sal,
                    paid: pay


                    // emply.id + '<td>' + 
                    // emply.surname + ' ' + emply.othername  + '<td>' +
                    // emply.email + '<td>' +
                    // emply.account + '<td>' +
                    // emply.level + '<td>' +
                    // emply.salary + '<td>' +
                    // emply.paid + '<td><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleModal" onclick="edits(this.id)">edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button>');
            
                },
                success: function(response) {
                    alert('Done');
                    
                }
            });
        });
    }
});




//TO DELETE STAFF
$('#deletebut').click(function() {
    
    if ($('#deleteId').val() === '') {
        alert('Please input Id');
    } else if (isNaN($('#deleteId').val()) !== false) {
        alert('Invalid Id')
    } else {
        var staffid = $('#deleteId').val();
        $.ajax({
            url: '/employees/' + staffid,
            method: 'delete',
            success: function(response) {
                alert('success');
            }
        })
    }
})





//PAY ALL
$('#payallbut').click(function() {
    
    alert('game');
    
    $.get('http://localhost:3000/employees', function(employees) {
        $.each(employees, function(i, emply) {

            var staffid = emply.id;
            var surname = emply.surname;
            var othername = emply.othername;
            var emails = emply.email;
            var account = emply.account;
            var accttype = emply.accttype;
            var levels = emply.level;
            var qual = emply.qualif;
            var salarys = emply.salary;
            var bank = emply.bank;

            $.ajax({
                url: `/employees/${staffid}`,
                method: 'PUT',
                data: {
                    id: parseInt(staffid),
                    surname: surname,
                    othername: othername,
                    email: emails,
                    account: account,
                    bank: bank,
                    accttype: accttype,
                    level: levels,
                    qualif: qual,
                    salary: salarys,
                    paid: "Yes"     
                },
                success: function(response) {
                    alert(response);
                }
            });
        });
    })
});




