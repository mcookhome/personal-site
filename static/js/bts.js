$(document).ready(function(){

    success_msg = ' <div class="alert alert-success alert-dismissable fade show" style="margin-right:20px;"  role="alert">\
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
           <span aria-hidden="true">&times;</span>\
           </button>';

     $(function() {
         $('#bts-form').submit(function(event) {
             event.preventDefault();
             var url = $(this).attr('action');
             var params = {};
             params["date"] = $("#date").val();
             params["chart"] = $("#chart").val();
             $('#send').hide();
             $('.cssload-container').show();
             $('#notifs').append(success_msg + "Please wait, this may take a minute or two...  </div>");

             $.ajax({
                 type: 'POST',
                 url: url,
                 data: JSON.stringify(params, null, '\t'),
                 contentType:'application/json;charset=UTF-8',
                 success: function(result) {
                     $('#bts-form').trigger('reset');
                     $('#notifs').append(success_msg + "<strong>Sent!</strong> I'll respond at the email you provided.  </div>");
                     $('.cssload-container').hide();
                     $('#send').show();

                 },
                 error: function(error) {
                     console.log(error);
                 }
             });
         });
     });

});
