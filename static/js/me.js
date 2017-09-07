$(document).ready(function(){
    $('.big-circle-text').textfill({});
    $('.big-circle-text').css({marginTop: '-=15px'});    
    $('.container').css({marginTop: '+=40px'});    

    var success_msg = ' <div class="alert alert-success alert-dismissable fade show"  role="alert">\
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
           <span aria-hidden="true">&times;</span>\
           </button>';

    $(function() {
        $(window).scroll(function() {
            var trigger_height = 100;
            if ($(this).scrollTop() > trigger_height) {
                $('.navbar').fadeIn();
            }
            else {
                $('.navbar').fadeOut();
            }
        });
    });

     $(function() {
         $('.scroll-down').click (function() {
             $('html, body').animate({scrollTop: $('#About').offset().top - 30}, 'slow');
             return false;
         });
     });

     $(function() {
         $('.removable').click (function() {
             $('html, body').animate({scrollTop: $('#' + $(this).text()).offset().top - 30}, 'slow');
             return false;
         });
     });

     $(function() {
         $('.animate').click (function() {
             console.log($('#' + $(this).text().replace(/ /g, '-').split('\n')[0]).offset().top);
             $('html, body').animate({scrollTop: $('#' + $(this).text().replace(/ /g, '-').split('\n')[0]).offset().top - 30}, 'slow');
             return false;
         });
     });


     $(function() {
         $('#contact-form').submit(function(event) {
             event.preventDefault();
             var url = $(this).attr('action');
             var params = {};
             params["name"] = $("#name").val();
             params["email"] = $("#email").val();
             params["message"] = $("#message").val();
             $('#send').hide();
             $('.cssload-container').show(); 
             $.ajax({
                 type: 'POST',
                 url: url,
                 data: JSON.stringify(params, null, '\t'),
                 contentType:'application/json;charset=UTF-8',
                 success: function(result) {
                     $('#contact-form').trigger('reset');
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

function timeout(cur_id, time) {
    setTimeout(function(){
        $(cur_id).fadeIn();
        $(cur_id + 'text').textfill({
        });
    }, time);
}


function timed_fade(id_list) {
    for (i = 0; i < id_list.length; i++) {
        time = 150 * (i+1);
        cur_id = id_list[i]; 
        timeout(cur_id, time);
    };
};
        

function make_satellites(div_name, satellites) {
    var circle_divs = document.getElementsByClassName(div_name);
    var div = 360 / satellites.length;
    var radius = $('.' + div_name).height();
    for (var div_num = 0; div_num < circle_divs.length; div_num++) {
        circle_div = circle_divs[div_num];
        var offset_parent = parseInt(circle_div.offsetWidth / 2);
        var offset_child = $('#reference').height() / 2;
        var total_offset = offset_parent - offset_child;
        var result = [];
        for (var i = 1; i <= satellites.length; ++i) {
            var small_circle = document.createElement('div');
            small_circle.className = 'clickable small-circle removable';
            small_circle.style.position = 'absolute';
            var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
            var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
            small_circle.style.top = (y + total_offset).toString() + "px";
            small_circle.style.left = (x + total_offset).toString() + "px";
            small_circle.style.display = 'none';
            new_id = "" + div_num + "-" + i;
            small_circle.id = new_id;
            small_circle.innerHTML = "<span>" + satellites[i - 1] + "</span>";
            var child = circle_div.appendChild(small_circle);
            jquery_id = '#' + new_id;

            //timed_fade(jquery_id);
            //var size_ratio = $(jquery_id).height() / $('.big-circle').height();
            //var grad_loc = radius * 0.375 * size_ratio;
            //background = "radial-gradient(circle at " + grad_loc + "px " + grad_loc + "px, #5cabff" + ", #000)"; 
//            $(jquery_id).css("background", background);
            result.push(jquery_id); 
        }
        timed_fade(result);
    }
};

function remake_satellites(div_name, satellites) {
    $(".removable").remove();
    make_satellites('big-circle', satellites);
    $(function() {
        $('.removable').click (function() {
            $('html, body').animate({scrollTop: $('#' + $(this).text()).offset().top - 30}, 'slow');
            return false;
        });
    });
}
 
