$(document).ready(function(){
    $('.data').DataTable();

    var error_msg = ' <div class="alert alert-danger alert-dismissable fade show" role="alert">\
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
           <span aria-hidden="true">&times;</span>\
           </button>';
    var success_msg = ' <div class="alert alert-success alert-dismissable fade show" role="alert">\
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
           <span aria-hidden="true">&times;</span>\
           </button>';

    $('#component').change(function(){
        var selected = $('#component').find(":selected").text();
        console.log(selected);
        if (selected=== "webapp" || selected === "all") {
            $('#queue').removeAttr("disabled");
        }
        else {
            $('#queue').prop('checked', false);
            $('#queue').attr("disabled", true);
        }
    });

    $('#form-toggle').click(function(){
        $('#form-content').toggle();
    });

    $('#msvc-toggle').click(function(){
        $('#msvc-content').toggle();
    });
    
    $('#webapp-toggle').click(function(){
        $('#webapp-content').toggle();
    });

    $('#top-form').submit(function(event){
        var failed = false;
        if ($('#region').find(":selected").text() === "Region") {
            $('#errors').append(error_msg + "Region not specified.</div>");
            failed = true;
        }
        if ($('#component').find(":selected").text() === "Component") {
            $('#errors').append(error_msg + "Component not specified.</div>");
            failed = true;
        }
        if (failed) {
            event.preventDefault();
        }
        else {
            $('#errors').append(success_msg + "<strong>Success!</strong> Processing... </div>");
        }
    });  
});

