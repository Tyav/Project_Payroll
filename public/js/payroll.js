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
    let total = 0;
    $.each(employees, function(i, emply) {
        $('#employee').append('<tr class="rows">' + '<td data-label="ID">' +
        emply.id + '<td class="employee-info" id="' + emply.id + 'em" data-label="NAME" data-toggle="modal" data-target="#exampleModals">' + 
        emply.surname + ' ' + emply.othername  + '<td data-label="EMAIL">' +
        emply.email + '<td data-label="ACCOUNT">' +
        emply.account + '<td data-label="LEVEL">' +
        emply.level + '<td data-label="SALARY">' + '<span>&#8358;</span>' +
        emply.salary + '<td data-label="PAYMENT STATUS">' +
        emply.paid + '<td data-label=""><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleMod" onclick="edits(this.id)">Edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button>');
        total += parseInt(emply.salary);
        if (emply.paid === "Yes"){
            $('#' + emply.id + 'p').prop("disabled", true)
        }

        //alert(total)
        // alert(emply.salary.split(₦).join(','))
        //alert('&#8358')

    });
    $('#employee').append('<tr class="rows">' + '<td>' + '<td>' + '<td>' + '<td>' +
    '<td>' + '<span id="totals">Total</span>' + '<td>' + '<span>&#8358;</span>' + total + '<td>' + '<td>' )
    $('.delbut').click(function() {
        var staffid = this.id;
        // alert(staffid)
        $.ajax({
            url: `http://localhost:3000/employees/${staffid}`,
            method: 'delete',
            success: function(response) {
                window.location.replace("http://localhost:3000/payroll.html");
            } 
        
        });
    });

    //TO VIEW FULL DATA OF EMPLOYEE 
    $('.employee-info').click(function(){
        var did = this.id.split('em').join('');
        $.get('http://localhost:3000/employees/' + did, function(emply) {
            $('#emply-info').empty()
            $('#emply-info').append('<div class="empinfo">' + 'ID: ' + emply.id + 
                '<div class="empinfo">' + 'Surname: ' + emply.surname + 
                '<div class="empinfo">' + 'Other Name: ' + emply.othername +
                '<div class="empinfo">' + 'Email: ' + emply.email +
                '<div class="empinfo">' + 'Account Number: ' + emply.account +
                '<div class="empinfo">' + 'Bank: ' + emply.bank +
                '<div class="empinfo">' + 'Account Type: ' + emply.accttype  +
                '<div class="empinfo">' + 'Level: ' + emply.level +
                '<div class="empinfo">' + 'Qualification: ' + emply.qualif +
                '<div class="empinfo">' + 'Salary: ' + emply.salary +
                '<div class="empinfo">' + 'Payment status: ' + emply.paid  +
                '<div class="empinfo">' + 'Date of last payment: ' + emply.paymentdate
            )

             

        });
    })
    
    
    //TO PAY STAFF
    $('.paybut').click(function() {
        var payDate = new Date();
        var datePaid = payDate.getDate() + "/" + (payDate.getMonth() + 1) + "/" + payDate.getFullYear();
        alert(datePaid);

        var payId = this.id.split('p').join('');
        $.get('http://localhost:3000/employees/' + payId, function(emply) {
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
                url: `http://localhost:3000/employees/${payId}`,
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
                    paid: "Yes",
                    paymentdate: datePaid    
                },
                success: function(response) {
                    window.location.replace("http://localhost:3000/payroll.html");
                }
            });
        });

    }); 
    $('.edit').click(function() {
        //alert(this.id)
        var stafid = this.id.split('e').join('');
        $.get('http://localhost:3000/employees/' + stafid, function(data){
            $('#surname1').val(data.surname);
            $('#otherName1').val(data.othername);
            $('#email1').val(data.email);
            $('#acctNum1').val(data.account);
            $('#acctbank1').val(data.bank);
            $('#accttype1').val(data.accttype);
            $('#level1').val(data.level);
            $('#qualification1').val(data.qualif);
            $('#paid1').val(data.paid);
            $('#updateId').val(data.id);
        });
    });     
});

//DELETE EMPLOYEE <a href="http://localhost:3000/employees/?id=${emply.id}"></a>

// function edits(x) {
//     var stafid = x.split('e').join('');
//     $.get('employees/' + stafid, function(data){
//         $('#surname1').val(data.surname);
//         $('#otherName1').val(data.othername);
//         $('#email1').val(data.email);
//         $('#acctNum1').val(data.account);
//         $('#acctbank1').val(data.bank);
//         $('#accttype1').val(data.accttype);
//         $('#level1').val(data.level);
//         $('#qualification1').val(data.qualif);
//         $('#paid1').val(data.paid);
//         $('#updateId').val(data.id);
//     })
// }



//ADDING AN EMPLOYEE

//HERE WE CHECK IF THE EMAIL AND ACCOUNT NUMBER HAS NOT BEEN REGISTERED OR IS NOT TIED TO AN EMPLOYEE

$.get("http://localhost:3000/employees", function(employees){
    $('#email').keyup(function(){
        $('#addBut1').prop("disabled", true);
    
        var g = 0;
        $.each(employees, function(i, emply){
            if (emply.email === $('#email').val()){
                g = 1;
            }
            if (g === 0) {
                $('#addBut1').removeAttr("disabled");
                    // alert('disabled')  
            }
        })
    })
});

// $('#acctNum1').keyup(function(){
//     $('#addBut1').prop("disabled", true);

//     $.get("http://localhost:3000//employees", function(employees){
//         var g = 0;
//         $.each(employees, function(i, emply){
//             if (emply.account === $('#acctNum1').val()){
//                 g = 1;
//             }
//         })
//         if (g === 0) {
//             $('#addBut1').removeAttr("disabled");
//             // alert('disabled')  
//         }
//     })
// });

$('#acctNum').keyup(function(){
    $('#addBut1').removeAttr("disabled");
    $.get("http://localhost:3000/employees", function(employees){
        var g = 0;
        $.each(employees, function(i, emply){
            if (emply.account === $('#acctNum').val()){
                $('#addBut1').prop("disabled", true);
            }
        })
        if (g === 0) {
            // alert('disabled')  
        }
    })
});

// $('#email1').keyup(function(){
//     $('#addBut1').prop("disabled", true);

//     $.get("http://localhost:3000//employees", function(employees){
//         var g = 0;
//         $.each(employees, function(i, emply){
//             if (emply.email === $('#email1').val()){
//                 g = 1;
//             }
//         })
//         if (g === 0) {
//             $('#addBut1').removeAttr("disabled");
//             // alert('disabled')  
//         }
//     })
// });

$('#addBut1').click(function() {
    
    
    
//HERE WE COMPUTE FOR THE SALARY OF THE EMPLOYEE
    
    $.get("http://localhost:3000/salaries", function(salaries) {
        $.each(salaries, function(i, salar){
            console.log(salar[$('#level').val()]);
            var sal = salar[$('#level').val()];
            
            $.post('http://localhost:3000/employees', {
                surname: $('#surname').val(),
                othername: $('#otherName').val(),
                email: $('#email').val(),
                account: $('#acctNum').val(),
                bank: $('#acctbank').val(),
                accttype: $('#accttype').val(),
                level: $('#level').val(),
                qualif: $('#qualification').val(),
                salary: sal,
                paid: "No",
                paymentdate: "Never paid"
            }, 
            function(data, status) {
                //alert(status)
                window.location.replace("http://localhost:3000/payroll.html");
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
    $.get("http://localhost:3000/employees", function(employees){
        $.each(employees, function(i, emply){
            var search = emply.id
            /*if ($('#searchId').val() === 'id'){*/
            if (search === parseInt($('#searchinput').val())){
                $('#employee').append('<tr class="rows">' + '<td data-label="ID">' +
                emply.id + '<td class="employee-info" id="' + emply.id + 'em" data-label="NAME" data-toggle="modal" data-target="#exampleModals">' + 
                emply.surname + ' ' + emply.othername  + '<td data-label="EMAIL">' +
                emply.email + '<td data-label="ACCOUNT">' +
                emply.account + '<td data-label="LEVEL">' +
                emply.level + '<td data-label="SALARY">' + '<span>&#8358;</span>' +
                emply.salary + '<td data-label="PAYMENT STATUS">' +
                emply.paid + '<td data-label=""><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleMod" onclick="edits(this.id)">Edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button><button type="button" class="resetbut" id="' + emply.id + 'r">ResetPay</button>');
                if (emply.paid === "Yes"){
                    $('#' + emply.id + 'p').hide();
                    //prop("disabled", true)
                }
                if (emply.paid === "No"){
                    $('#' + emply.id + 'r').hide();
                    //prop("disabled", true)
                }
            } else if (Object.values(emply).includes($('#searchinput').val())){
                //alert('Yes')
                $('#employee').append('<tr class="rows">' + '<td data-label="ID">' +
                emply.id + '<td data-label="NAME">' + 
                emply.surname + ' ' + emply.othername  + '<td data-label="EMAIL">' +
                emply.email + '<td data-label="ACCOUNT">' +
                emply.account + '<td data-label="LEVEL">' +
                emply.level + '<td data-label="SALARY">' + '<span>&#8358;</span>' +
                emply.salary + '<td data-label="PAYMENT STATUS">' +
                emply.paid + '<td data-label=""><button class="paybut" id="' + emply.id + 'p">Pay</button><button type="button" class="edit" id="' + emply.id + 'e" data-toggle="modal" data-target="#exampleMod" onclick="edits(this.id)">Edit</button><button type="button" class="delbut" id="' + emply.id + '">Del</button><button type="button" class="resetbut" id="' + emply.id + 'r">ResetPay</button>');
                if (emply.paid === "Yes"){
                    $('#' + emply.id + 'p').hide();
                    //prop("disabled", true)
                }
                if (emply.paid === "No"){
                    $('#' + emply.id + 'r').hide();
                    //prop("disabled", true)
                }
            } 
        })
        $('.edit').click(function() {
            // alert(this.id)
            var stafid = this.id.split('e').join('');
            $.get('http://localhost:3000/employees/' + stafid, function(data){
                $('#surname1').val(data.surname);
                $('#otherName1').val(data.othername);
                $('#email1').val(data.email);
                $('#acctNum1').val(data.account);
                $('#acctbank1').val(data.bank);
                $('#accttype1').val(data.accttype);
                $('#level1').val(data.level);
                $('#qualification1').val(data.qualif);
                $('#paid1').val(data.paid);
                $('#updateId').val(data.id);
            });
        });
        $('.delbut').click(function() {
            var staffid = this.id;
            // alert(staffid)
            $.ajax({
                url: `http://localhost:3000/employees/${staffid}`,
                method: 'delete',
                success: function(response) {
                    alert('deleted')
                    window.location.replace("http://localhost:3000/payroll.html");
                } 
            
            });
        });
        
        //TO VIEW EMPLOYEE INFO
        $('.employee-info').click(function(){
            var did = this.id.split('em').join('');
            $.get('http://localhost:3000/employees/' + did, function(emply) {
                $('#emply-info').empty()
                $('#emply-info').append('<div class="empinfo">' + 'ID: ' + emply.id + 
                    '<div class="empinfo">' + 'Surname: ' + emply.surname + 
                    '<div class="empinfo">' + 'Other Name: ' + emply.othername +
                    '<div class="empinfo">' + 'Email: ' + emply.email +
                    '<div class="empinfo">' + 'Account Number: ' + emply.account +
                    '<div class="empinfo">' + 'Bank: ' + emply.bank +
                    '<div class="empinfo">' + 'Account Type: ' + emply.accttype  +
                    '<div class="empinfo">' + 'Level: ' + emply.level +
                    '<div class="empinfo">' + 'Qualification: ' + emply.qualif +
                    '<div class="empinfo">' + 'Salary: ' + emply.salary +
                    '<div class="empinfo">' + 'Payment status: ' + emply.paid  +
                    '<div class="empinfo">' + 'Date of last payment: ' + emply.paymentdate
                )
    
                 
    
            });
        })

        
        //TO PAY STAFF
        $('.paybut').click(function() {
            var payDate = new Date();
            var datePaid = payDate.getDate() + "/" + (payDate.getMonth() + 1) + "/" + payDate.getFullYear();
            alert(datePaid);
            var payId = this.id.split('p').join('');
            $.get('http://localhost:3000/employees/' + payId, function(emply) {
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
                    url: `http://localhost:3000/employees/${payId}`,
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
                        paid: "Yes",
                        paymentdate: datePaid     
                    },
                    success: function(response) {
                        // window.location.replace("http://localhost:3000/payroll.html");
                        alert('Successful')
                    }
                });
            });
    
        });
                //TO RESET STAFF PAYMENT
        $('.resetbut').click(function() {
            var payId = this.id.split('r').join('');
            $.get('http://localhost:3000/employees/' + payId, function(emply) {
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
                var datePaid = emply.paymentdate;
    
                $.ajax({
                    url: `http://localhost:3000/employees/${payId}`,
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
                        paid: "No", 
                        paymentdate: datePaid    
                    },
                    success: function(response) {
                        // window.location.replace("http://localhost:3000/payroll.html");
                        alert('Successful')
                    }
                });
            });
    
        }); 

    });
    
});


//TO DELETE FROM THE DATA
$('#deletebutton').click(function() {
    //if ($('#searchinput').val() !== " " && $('#searchinput') !== ""){
    $.delete("http://localhost:3000/employees", function(employees){
        //alert('gotten');
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
    $.get("http://localhost:3000/users", function(users) {
        $.each(users, function(i, user) {
            if (user.username === $('#newUserEmail').val()){
                g = 1;
                
            }
        });
        if (g === 1) {
            alert('User already exist');
        } else {
            $.post('http://localhost:3000/users', {
                username: $('#newUserEmail').val(),
                password: $('#confNewUserPassword').val()
            },
            function(data, status) {
                //console.log(data);
                //alert(status);
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
            var g = 0
            $.each(users, function(i, user){
                if (user.username === userName && user.password === password1) {
                    //alert('corret');
                    g = 1;
                    
                    window.location.replace("public/payroll.html");
                } else {
                    //alert('invalid user');
                }
            });
            if (g !== 1){
                alert("You are not an Admin");
            }
        });
        
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

        $.get('http://localhost:3000/employees/' + staffid, function(employees) {
            //alert('start')
            var pay = employees.paid;
            var sal = employees.salary;
            var datePaid = emply.paymentdate;
            $.ajax({
                url: 'http://localhost:3000/employees/' + staffid,
                method: 'PUT',
                data: {
                    id: parseInt(staffid),
                    surname: $('#surname1').val(),
                    othername: $('#otherName1').val(),
                    email: $('#email1').val(),
                    account: $('#acctNum1').val(),
                    accttype: $('#accttype1').val(),
                    bank: $('#acctbank1').val(),
                    level: $('#level1').val(),
                    qualif: $('#qualification1').val(),
                    salary: sal,
                    paid: pay,
                    paymentdate: datePaid

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
                    window.location.replace("http://localhost:3000/payroll.html");
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
            url: 'http://localhost:3000/employees/' + staffid,
            method: 'delete',
            success: function(response) {
                alert('successfully deleted');
            }
        })
    }
})





//PAY ALL
$('#payallbut').click(function() {
    var payDate = new Date();
    var datePaid = payDate.getDate() + "/" + (payDate.getMonth() + 1) + "/" + payDate.getFullYear();
    alert(datePaid);

    
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
                url: `http://localhost:3000/employees/${staffid}`,
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
                    paid: "Yes",
                    paymentdate: datePaid     
                },
                success: function(response) {
                    window.location.replace("http://localhost:3000/payroll.html");
                }
            });
        });
    })
});

//rESET ALL PAYMENT
$('#resetallbut').click(function() {
    
    
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
            var dateofpay = emply.paymentdate;    


            $.ajax({
                url: `http://localhost:3000/employees/${staffid}`,
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
                    paid: "No",
                    paymentdate: dateofpay
                },
                success: function(response) {
                    window.location.replace("http://localhost:3000/payroll.html");
                }
            });
        });
    })
});


