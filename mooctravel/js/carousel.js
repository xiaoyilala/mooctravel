/**
 * 轮播图
 * 通栏轮播图拉动translateX属性
 * 固定宽度轮播图拉动left属性
 */
(function(){
    var carousel_list = document.getElementById('carousel_list');
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var circle_ol = document.getElementById('circle_ol');
    var circle_lis = circle_ol.getElementsByTagName('li');
    var banner = document.getElementById('banner');

    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    carousel_list.appendChild(clone_li);

    //节流锁 默认打开
    var lock = true;
    var idx = 0;

    right_btn.onclick = right_btn_handler;

    function right_btn_handler(){
        if(!lock) return;
        lock = false;
        carousel_list.style.transition = 'transform .5s ease 0s';
        idx++;
        carousel_list.style.transform = 'translateX('+ -16.66*idx+'%)';
        //到了最后一张图（克隆的第一张）就要瞬间回来
        if(idx>4){
            setTimeout(function(){
                carousel_list.style.transition = 'none';
                carousel_list.style.transform = 'none';
                idx = 0;
            },500);

        }
        setCircle();

        //动画结束后开锁
        setTimeout(function(){
            lock = true;
        },500);
    };

    left_btn.onclick = function(){
        if(!lock) return;
        lock = false;
        if(idx == 0){
            //用clone图替换真图，然后再过渡到最后一张图
            carousel_list.style.transition = 'none';
            carousel_list.style.transform = 'translateX('+ -16.66*5+'%)';

            idx = 4;
            setTimeout(function(){
                carousel_list.style.transition = 'transform .5s ease 0s';
                carousel_list.style.transform = 'translateX('+ -16.66*4+'%)';
            },0)
        }else{
            idx--;
            carousel_list.style.transform = 'translateX('+ -16.66*idx+'%)';
        }
        setCircle();
        //动画结束后开锁
        setTimeout(function(){
            lock = true;
        },500);
    };

    function setCircle(){
        for(var i=0; i<=4; i++){
            if(i==idx % 5){
                circle_lis[i].className = 'current';
            }else{
                circle_lis[i].className = '';
            }
        }
    };

    //小圆点
    circle_ol.onclick = function(e){
        carousel_list.style.transition = 'transform .5s ease 0s';
        if(e.target.tagName.toLowerCase() == 'li'){
            var n = Number(e.target.getAttribute('data-n'));
            idx = n;
            carousel_list.style.transform = 'translateX('+ -16.66*idx+'%)';
            setCircle();
        }
    }

    var timer = setInterval(right_btn_handler, 2000);

    banner.onmouseenter = function(){
        clearInterval(timer);
    }

    banner.onmouseleave = function(){
        clearInterval(timer);
        timer = setInterval(right_btn_handler, 2000);
    }
})();