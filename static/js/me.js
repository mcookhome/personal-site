$(document).ready(function(){
    
    function timed_fade(query) {
        setTimeout(function(){
            $(query).fadeIn();
        }, 300);
    };

    function make_satellites(div_name, satellites) {
        var circle_divs = document.getElementsByClassName(div_name);
        var div = 360 / satellites.length;
        var radius = $('.' + div_name).height();
        for (var div_num = 0; div_num < circle_divs.length; div_num++) {
            circle_div = circle_divs[div_num];
            var offset_parent = parseInt(circle_div.offsetWidth / 2);
            var offset_child = $('#reference').height() / 2;
            console.log(offset_child);
            var total_offset = offset_parent - offset_child;
            console.log(total_offset);
            
            for (var i = 1; i <= satellites.length; ++i) {
                var small_circle = document.createElement('div');
                small_circle.className = 'small-circle';
                small_circle.style.position = 'absolute';
                var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
                var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
                small_circle.style.top = (y + total_offset).toString() + "px";
                small_circle.style.left = (x + total_offset).toString() + "px";
                small_circle.style.display = 'none';
                new_id = "" + div_num + "-" + i;
                small_circle.id = new_id;
                console.log(new_id);
                var child = circle_div.appendChild(small_circle);
                timed_fade('#' + new_id);
            }
        }
    };


        

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

 
});

