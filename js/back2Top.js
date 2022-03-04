(function(){
    var back2Top = document.getElementById('backtotop');

    var timer;
    back2Top.onclick = function(){
        clearInterval(timer);
        timer = setInterval(function(){
            document.documentElement.scrollTop -= 150;
            if(document.documentElement.scrollTop<=0){
                clearInterval(timer);
            }
        },20);
    };

    window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop || window.scrollY;
        if(scrollTop == 0){
            back2Top.style.display = 'none';
        }else{
            back2Top.style.display = 'block';
        }
    };

})();