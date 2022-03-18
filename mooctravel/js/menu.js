(function(){
    var banner_nav = document.getElementById('banner-nav');
    var banner_nav_ul = document.getElementById('banner-nav-ul');
    var banner_nav_ul_lis = document.querySelectorAll('#banner-nav-ul li');
    var menus = document.querySelectorAll('.menus-box .menu');

    //onmouseover冒泡 onmouseenter不冒泡
    banner_nav_ul.onmouseover = function(e){
        if(e.target.tagName.toLowerCase() == 'li'){
            var t = e.target.getAttribute('data-t');

            // var theMenu = document.querySelector('.menus-box div[data-t='+t+']');
            var theMenu = document.querySelector('.menus-box .menu[data-t='+t+']');
            
            for(var i=0; i<menus.length; i++){
                menus[i].className = 'menu';
                banner_nav_ul_lis[i].className = banner_nav_ul_lis[i].getAttribute('data-t');
            }
            e.target.className += ' current'
            theMenu.className = 'menu current';
        }
    }

    banner_nav.onmouseleave = function(){
        for(var i=0; i<banner_nav_ul_lis.length; i++){
            banner_nav_ul_lis[i].className = banner_nav_ul_lis[i].getAttribute('data-t');
            menus[i].className = 'menu';
        }
    }


})();