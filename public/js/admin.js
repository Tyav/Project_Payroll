$(document).ready(function() {
    //alert('game on');
})


$.get("http://localhost:3000/users", function(users){
    alert('ies')
    //COLLECT INFORMATIONS OF THE ADMIN
    $.each(users, function(i, admin){
        $('#admins').append('<tr>' + 
        '<td>' + admin.id + 
        '<td id="' + admin.id + 's" class="admin-info" >' + admin.surname + ' ' + admin.othername +
        '<td>' + admin.username + 
        '<td>' + admin.auth + 
        '<td>' + admin.password +
        '<td>' + admin.email +
        '<td>' + admin.phone +
        '<td>' + admin.staffid +
        '<td><button class="ed">Edit</button><button >Del</button>'
        )
    });

    //THIS POPS THE FULL INFORMATION OF THE ADMIN
    $('.admin-info').click(function() {
        // prompt('game over')
        if (confirm('do you want to continue?')){
            alert ('continue')
        }
        var mainId = this.id.split('s').join('');
        // alert(mainId);
        // $.get("http://localhost:3000/users" + mainId, function(admin){

        //     $('#admin-name').append('Admin Name: ' + admin.surname + ' ' + admin.othername)
        //     $('#admin-username').append('Admin Username: ' + admin.username)
        //     $('#admin-type').append('Authentication type: ' + admin.auth)

 //data-toggle="modal" data-target="#exampleModal"

        // })
    });
})
