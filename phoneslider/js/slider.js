function Slider(el,option){
    const defaults = {
        initIndex : 0,
        speed:300,
        hasIndicator:false
    };
    this.option = {...defaults, ...option};
    this.el = el;
    this.itemContainer = el.querySelector('.slider-item-container')
    this.items = this.itemContainer.children;
    this.distancePerSlider = this.items[0].offsetWidth;

    this.minIndex = 0;
    this.maxIndex = this.items.length-1;
    this.index = this._adjustIndex(this.option.initIndex);

    this.move(this.getDistanceByIndex(this.index));

    if(this.option.hasIndicator){
        this._createIndicators();
        this._setIndicatorActive(this.index);
    }
}
Slider.prototype.to = function (index, cb){
    this.index = this._adjustIndex(index);
    //加个速度就有动画效果了 css中写的transition: transform 0;
    //但考虑到要根据手指移动，如果这里设置了速度就会导致动画延迟于手指
    this._setTransitionSpeed(this.option.speed);
    this.move(this.getDistanceByIndex(this.index))

    //动画完了后 清除速度
    var self = this;
    this.itemContainer.addEventListener('transitionend', function(){
        self._setTransitionSpeed(0);
        if(typeof cb === 'function'){
            cb();
        }
    }, false);
    if(this.option.hasIndicator){
        this._setIndicatorActive(this.index);
    }
}
Slider.prototype._setTransitionSpeed = function (speed){
    this.itemContainer.style.transitionDuration = speed+'ms';
}
Slider.prototype.prev = function (cb){
    this.to(this.index-1, cb);
}
Slider.prototype.next = function (cb){
    this.to(this.index+1, cb);
}
Slider.prototype._adjustIndex = function (index){
    if(index<this.minIndex){
        index = this.minIndex;
    }else if(index>this.maxIndex){
        index = this.maxIndex;
    }
    return index;
}
Slider.prototype.move = function (distance){
    this.itemContainer.style.transform = 'translate3d('+distance+'px, 0,0)';
}
Slider.prototype.getDistanceByIndex = function (index){
    return -index*this.distancePerSlider;
}
Slider.prototype._createIndicators = function (){
    var indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'slider-indicator-container';

    var html='';
    for(var i=0; i<=this.maxIndex; i++){
        html += '<span class="slider-indicator"></span>';
    }
    indicatorContainer.innerHTML = html;

    this.el.appendChild(indicatorContainer);
}
Slider.prototype._setIndicatorActive = function (index){
    this.indicators = this.indicators || this.el.querySelectorAll('.slider-indicator');
    for(var i=0; i<this.indicators.length; i++){
        this.indicators[i].classList.remove('slider-indicator-active');
    }
    this.indicators[index].classList.add('slider-indicator-active');
}
Slider.prototype.getItemContainer = function (){
    return this.itemContainer;
}
Slider.prototype.getIndex = function (){
    return this.index;
}
Slider.prototype.getMaxIndex = function (){
    return this.maxIndex;
}
Slider.prototype.getDistancePerSlider = function (){
    return this.distancePerSlider;
}

        