$(document).ready(function() {
    //alert('game on');
})


$.get("http://localhost:3000/users", function(admins){
    alert('ies')
    //COLLECT INFORMATIONS OF THE ADMIN
    $.each(admins, function(i, admin){
        $('#admins').append('<tr>' + 
        '<td>' + admin.id + 
        '<td>' + admin.surname + ' ' + admin.othername +
        '<td>' + admin.username + 
        '<td>' + admin.auth + 
        '<td>' + admin.password +
        '<td>' + admin.email +
        '<td>' + admin.phone +
        '<td>' + admin.staffid +
        '<td><button >Edit</button><button >Del</button>'
        )
    })
})