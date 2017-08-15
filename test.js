var zoomFactor = 10, shrinkFactor = 10, shrinkInputBlock = 0.8;

// Hotel horizontal block ids
var block_id = [".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.0",
                ".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.0",
                ".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.1",
                ".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.1.0",
                ".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.1.0.1.1",
                ".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.1.0.0.0.0.0.1.0",
                ".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.1.0.0.0.0.0.1.0.1.0.0"];

function revertBack(elementId){
    var element = document.getElementById(elementId);
    element.style.cssText = element.previousCSS;
}

// reductionFactor lies between 0 and 1
// orientation=0 -> vertical
// orientation=1 -> horizontal
function removeSpace(element, mWidth, mHeight, reductionFactor, orientation){
//    var previousCSS = '';
//    for(var i = 0; i < css.length; i++){
//        previousCSS += css[i] + ':' + css.getPropertyValue(css[i]) + ';';
//    }
//    element.previousCSS = previousCSS;
//    If below declaration of previousCSS fails, go for the above
    var width, height, paddingVertical, paddingHorizontal, borderVertical, borderHorizontal,
        marginVertical, marginHorizontal, positionVertical, positionHorizontal,
        css = getComputedStyle(element);
    element.previousCSS = css.cssText;

    if(css.getPropertyValue('font-size')){
        element.style.fontSize = getFontSize(parseInt(css.getPropertyValue('font-size'))) + 'px';
    }

    width = getWidthHeight(element, css, 'width');
    height = getWidthHeight(element, css, 'height');

    if(element.tagName == "INPUT"){
        [width, height] = updateInputBlock(width, height);
    }

    width = minimizeWidthHeight(element, mWidth, width, 'width')
    height = minimizeWidthHeight(element, mHeight, height, 'height');
    updateMinimumWidthHeight(element);

    if(orientation == 1){
        element.style.height = getSize(height, false);
    }else{
        element.style.width = getSize(width , false);
    }

    [paddingVertical, paddingHorizontal] = updatePadding(element, css, reductionFactor);
    [borderVertical, borderHorizontal] = updateBorder(element, css, reductionFactor);
    [marginVertical, marginHorizontal] = updateMargin(element, css, reductionFactor);
    [positionVertical, positionHorizontal] = updatePosition(element, css, reductionFactor);

    return [paddingHorizontal+marginHorizontal+width, paddingVertical+marginVertical+height];
//    return [positionHorizontal+marginHorizontal+borderHorizontal+paddingHorizontal+width, positionVertical+marginVertical+borderVertical+paddingVertical+height];
}

function getElementsInsideContainer(container, orientation) {
    var elmWidths = [0], elmHeights = [0], elm, mWidth, mHeight, i, w, h;
//    var elms = container.getElementsByTagName("*");
    for (i = 0; i < container.childElementCount; i++) {
        elm = container.children[i];
        if (elm.id && block_id.includes(elm.id)){
            // horizontal
            [w, h] = getElementsInsideContainer(elm, 1);
        }else{
            // vertical
            [w, h] = getElementsInsideContainer(elm, 0);
        }
        elmWidths.push(w);
        elmHeights.push(h);
    }

    if (orientation == 1){
        mWidth = eval(elmWidths.join("+"));
        mHeight = Math.max.apply(null,elmHeights);
    }else{
        mWidth = Math.max.apply(null, elmWidths);
        mHeight = eval(elmHeights.join("+"));
    }

    return removeSpace(container, mWidth, mHeight, 0.3, orientation);
}

function getFontSize(size){
    if(size < 12){
        return size*1.3;
    }else if(size > 20){
        return 23;
    }else{
        return size*1.2;
    }
}

function getWidthHeight(element, css, quantity){
    var size = css.getPropertyValue(quantity);
    if(size == "auto" || size.indexOf('%') >= 0){
        return element.getBoundingClientRect()[quantity];
    }else{
        return parseInt(size);
    }
}

function updateInputBlock(width, height){
    return [shrinkInputBlock*width, shrinkInputBlock*height];
}

function minimizeWidthHeight(element, minSize, size, quantity){
    if(minSize && minSize > 0 && minSize < size){
        size = minSize;
        element.style[quantity] = minSize + 'px';
    }
    return size;
}

function updateMinimumWidthHeight(element){
    element.style.minHeight = '0px';
    element.style.minWidth = '0px';
}

function getSize(size, units){
    if(units){
        return size + '%';
    }else{
        return size + 'px';
    }
}

function updatePadding(element, css, reductionFactor){
    var pb = css.getPropertyValue('padding-bottom'),
        pt = css.getPropertyValue('padding-top'),
        pr = css.getPropertyValue('padding-right'),
        pl = css.getPropertyValue('padding-left'),
        paddingBottom = parseInt(pb)*reductionFactor
        paddingTop = parseInt(pt)*reductionFactor
        paddingRight = parseInt(pr)*reductionFactor,
        paddingLeft = parseInt(pl)*reductionFactor;

    element.style.paddingBottom = getSize(paddingBottom, pb.indexOf('%') >= 0);
    element.style.paddingTop = getSize(paddingTop, pt.indexOf('%') >= 0);
    element.style.paddingRight = getSize(paddingRight, pr.indexOf('%') >= 0);
    element.style.paddingLeft = getSize(paddingLeft, pl.indexOf('%') >= 0);
    return [paddingBottom+paddingTop, paddingRight+paddingLeft];
}

function updateBorder(element, css, reductionFactor){
    var bb = css.getPropertyValue('border-bottom-width'),
        bt = css.getPropertyValue('border-top-width'),
        br = css.getPropertyValue('border-right-width'),
        bl = css.getPropertyValue('border-left-width'),
        borderBottom = parseInt(bb)*reductionFactor,
        borderTop = parseInt(bt)*reductionFactor,
        borderRight = parseInt(br)*reductionFactor,
        borderLeft = parseInt(bl)*reductionFactor;

    element.style.borderBottomWidth = getSize(borderBottom, bb.indexOf('%') >= 0);
    element.style.borderTopWidth = getSize(borderTop, bt.indexOf('%') >= 0);
    element.style.borderRightWidth = getSize(borderRight, br.indexOf('%') >= 0);
    element.style.borderLeftWidth = getSize(borderLeft, bl.indexOf('%') >= 0);
    return [borderBottom+borderTop, borderRight+borderLeft];
}

function updateMargin(element, css, reductionFactor){
    var mb = css.getPropertyValue('margin-bottom'),
        mt = css.getPropertyValue('margin-top'),
        mr = css.getPropertyValue('margin-right'),
        ml = css.getPropertyValue('margin-left'),
        marginBottom = parseInt(mb)*reductionFactor
        marginTop = parseInt(mt)*reductionFactor
        marginRight = parseInt(mr)*reductionFactor,
        marginLeft = parseInt(ml)*reductionFactor;

    element.style.marginBottom = getSize(marginBottom, mb.indexOf('%') >= 0);
    element.style.marginTop = getSize(marginTop, mt.indexOf('%') >= 0);
    element.style.marginRight = getSize(marginRight, mr.indexOf('%') >= 0);
    element.style.marginLeft = getSize(marginLeft, ml.indexOf('%') >= 0);
    return [marginBottom+marginTop, marginRight+marginLeft];
}

function updatePosition(element, css, reductionFactor){
    var b = css.getPropertyValue('bottom'),
        t = css.getPropertyValue('top'),
        r = css.getPropertyValue('right'),
        l = css.getPropertyValue('left'),
        bottom = parseInt(b)*reductionFactor,
        top = parseInt(t)*reductionFactor,
        right = parseInt(r)*reductionFactor,
        left = parseInt(l)*reductionFactor;

    element.style.bottom = getSize(bottom, b.indexOf('%') >= 0);
    element.style.top = getSize(top, t.indexOf('%') >= 0);
    element.style.right = getSize(right, r.indexOf('%') >= 0);
    element.style.left = getSize(left, l.indexOf('%') >= 0);
    return [bottom+top, right+left];
}