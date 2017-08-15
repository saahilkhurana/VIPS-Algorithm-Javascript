var zoomFactor = 10, shrinkFactor = 10;

function revertBack(element){
    element.style.cssText = element.previousCSS;
}

//variable reductionFactor lies between 0 and 1
function removeSpace(element, mWidth, mHeight, reductionFactor){
//    var previousCSS = '';
//    for(var i = 0; i < css.length; i++){
//        previousCSS += css[i] + ':' + css.getPropertyValue(css[i]) + ';';
//    }
//    If below declaration of previousCSS fails, go for the above
//    if(!$(element).is(":visible") || $(element).css('display') == 'none' || $(element).css("visibility") == "hidden"){
    console.log(element);
    var css = getComputedStyle(element),
        width = parseInt(css.getPropertyValue('width'))+1,
        height = parseInt(css.getPropertyValue('height'))+1;

    element.previousCSS = css.cssText;
    if(css.getPropertyValue('width') == "auto"){
        width = element.getBoundingClientRect().width;
    }

    if(css.getPropertyValue('height') == "auto"){
        height = element.getBoundingClientRect().height;
    }
    if(element.tagName == "INPUT" || element.tagName == "SELECT"){
        width *= 0.8;
        height *= 0.8;
    }

//    element.style.height = height + 'px';
    element.style.width = width + 'px';

    if(mWidth && mWidth > 0 && mWidth < width){
        width = mWidth;
        element.style.width = mWidth + 'px';
    }

    if(mHeight && mHeight > 0 && mHeight < height){
        height = mHeight;
        element.style.height = mHeight + 'px';
    }

    updateMinimumWidthHeight(element);
    [paddingVertical, paddingHorizontal] = updatePadding(element, css, reductionFactor);
    [marginVertical, marginHorizontal] = updateMargin(element, css, reductionFactor);

    if(element.childElementCount == 0 && element.innerText && css.getPropertyValue('font-size')){
        element.style.fontSize = getFontSize(parseInt(css.getPropertyValue('font-size'))) + 'px';
        css = getComputedStyle(element);
        [width, height] = getTextWidth(element.innerText, css.getPropertyValue('font'));
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        css = getComputedStyle(element);
        width = parseInt(css.getPropertyValue('width'))+1;
        height = parseInt(css.getPropertyValue('height'))+1;
    }
    return [paddingHorizontal+marginHorizontal+width, paddingVertical+marginVertical+height];
}

function getElementsInsideContainer(container) {
    var elmWidths = {}, elmHeights = {},
        w, h, mWidth, mHeight, elm, css, count = 0;
//    var elms = container.getElementsByTagName("*");

    for (var i = 0; i < container.childElementCount; i++) {
        elm = container.children[i];
        if(isVisible(elm)){
            [w, h] = getElementsInsideContainer(elm);
            elmWidths[count] = w;
            elmHeights[count] = h;
            count++;
        }
    }

    if(!isVisible(container) || count == 0 || container.tagName == "SELECT"){
        mWidth = 0;
        mHeight = 0;
    }else if(count == 1){
        css = getComputedStyle(container.children[0]);
        mWidth = parseInt(css.getPropertyValue('width'))+1;
        mHeight = parseInt(css.getPropertyValue('height'))+1;
    }else{
        [mWidth, mHeight] = run(container, elmWidths, elmHeights);
    }
    console.log([elmWidths,elmHeights]);
    return removeSpace(container, mWidth, mHeight, 0.3);
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

function getSize(size, units){
    if(units){
        return size + '%';
    }else{
        return size + 'px';
    }
}

function updateMinimumWidthHeight(element){
    element.style.minHeight = '0px';
    element.style.minWidth = '0px';
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

function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    var style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    var elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
//    var pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
//    do {
//        if (pointContainer === elem) return true;
//    } while (pointContainer = pointContainer.parentNode);
//    return false;
    return true;
}


function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return [metrics.width, metrics.height];
}

function getWidthOfText(txt, fontname, fontsize){
  // Create a dummy canvas (render invisible with css)
  var c=document.createElement('canvas');
  document.body.appendChild(c);

  // Get the context of the dummy canvas
  var ctx=c.getContext('2d');
  // Set the context.font to the font that you are using
  ctx.font = fontsize + ' ' + fontname;
  // Measure the string
  // !!! <CRUCIAL>  !!!
  var length = ctx.measureText(txt).width;
  document.body.removeChild(c);
  // !!! </CRUCIAL> !!!
  c = null;
  // Return width
  return length;
}

function fnCalculate(){
    var TextDiv = document.getElementById(".1deop2fudcq.0.0.0.0.1.0.0.1.$0__view.$hotel.1.0.0.0.0");
    TextDiv.innerHTML = "Where are you going?";
    TextDiv.style.fontSize = "16.8px";
   	var txtHeight = (TextDiv.clientHeight + 1) ;
	var txtWidth = (TextDiv.clientWidth + 1) ;
  	var ResultDiv = document.getElementById("divResult");
//  	ResultDiv.innerHTML = "<br><br><br><b> Text Height  : " + txtHeight + "px </b>"
//  	ResultDiv.innerHTML  = ResultDiv.innerHTML  + "<br><b> Text Width : " + txtWidth + "px </b>"
}

function textLength(element){
    // Create dummy span
    var elm = document.createElement('span'),
    css = getComputedStyle(element);
    // Set font-size
    elm.style.font = css.getPropertyValue('font');
    elm.style.fontDisplay = css.getPropertyValue('font-display');
    elm.style.fontFamily = css.getPropertyValue('font-family');
    elm.style.fontFeatureSettings = css.getPropertyValue('font-feature-settings');
    elm.style.fontKerning = css.getPropertyValue('font-kerning');
    elm.style.fontSize = css.getPropertyValue('font-size');
    elm.style.fontStretch = css.getPropertyValue('font-stretch');
    elm.style.fontStyle = css.getPropertyValue('font-style');
    elm.style.fontVariant = css.getPropertyValue('font-variant');
    elm.style.fontVariantCaps = css.getPropertyValue('font-variant-caps');
    elm.style.fontVariantLigatures = css.getPropertyValue('font-variant-ligatures');
    elm.style.fontVariantNumeric = css.getPropertyValue('font-variant-numeric');
    elm.style.fontWeight = css.getPropertyValue('font-weight');

    elm.innerHTML = element.innerText;
    document.body.appendChild(elm);
    // Get width NOW, since the dummy span is about to be removed from the document
    var w = elm.offsetWidth,
        h = elm.offsetHeight;
    // Cleanup
    document.body.removeChild(elm);
    // All right, we're done
    return [w+1, h+1];
}