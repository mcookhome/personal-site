$(document).ready(function(){
    $('.big-circle-text').textfill({});
    $('.big-circle-text').css({marginTop: '-=15px'});    

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
             $('html, body').animate({scrollTop: $('#About').offset().top }, 'slow');
             return false;
         });
     });

     $(function() {
         $('.removable').click (function() {
             $('html, body').animate({scrollTop: $('#' + $(this).text()).offset().top }, 'slow');
             return false;
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
        time = 200 * (i+1);
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
            small_circle.className = 'small-circle removable';
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
            $('html, body').animate({scrollTop: $('#' + $(this).text()).offset().top }, 'slow');
            return false;
        });
    });
}
 
