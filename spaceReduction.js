var zoomFactor = 10, shrinkFactor = 10;

function compareFirstColumn(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function verticalSegmentation(visual_blocks){
    visual_blocks.sort(compareSecondColumn);
    var n_visual_blocks = visual_blocks.length, vertical_lines = [], i, size;
    for(i=0; i<n_visual_blocks; i++){
        size = vertical_lines.length;
        if(size != 0 && vertical_lines[size-1][0] <= visual_blocks[i][1] && visual_blocks[i][1] < vertical_lines[size-1][1]){
            vertical_lines[size-1][1] = Math.max(visual_blocks[i][3], vertical_lines[size-1][1]);
        }
        else{
            vertical_lines.push([visual_blocks[i][1],visual_blocks[i][3]]);
        }
    }
    vertical_lines = [].concat.apply([], vertical_lines);
    vertical_lines = vertical_lines.filter(function(item, pos) { return vertical_lines.indexOf(item) == pos;});
    return vertical_lines;
}


function horizontalSegmentation(visual_blocks){
    visual_blocks.sort(compareFirstColumn);
    var n_visual_blocks = visual_blocks.length, horizontal_lines = [], i, size;
    for(i=0; i<n_visual_blocks; i++){
        size = horizontal_lines.length;
        if(size != 0 && horizontal_lines[size-1][0] <= visual_blocks[i][0] && visual_blocks[i][0] < horizontal_lines[size-1][1]){
            horizontal_lines[size-1][1] = Math.max(visual_blocks[i][2], horizontal_lines[size-1][1]);
        }
        else{
            horizontal_lines.push([visual_blocks[i][0],visual_blocks[i][2]]);
        }
    }
    horizontal_lines = [].concat.apply([], horizontal_lines);
    horizontal_lines = horizontal_lines.filter(function(item, pos) { return horizontal_lines.indexOf(item) == pos;});
    return horizontal_lines;
}

function runSegmentation(visual_blocks){
    var vertical_lines = verticalSegmentation(visual_blocks),
        horizontal_lines = horizontalSegmentation(visual_blocks);
    var [blocks, div_blocks] = getBlocks(visual_blocks, vertical_lines, horizontal_lines);
    return [blocks, div_blocks];
}

function run(container, elmWidths, elmHeights){
//    visual_blocks = [[2, 3, 4, 5], [6, 9, 9, 11], [3, 7, 5, 9], [6, 4, 8, 6], [3, 3, 5, 5]];
    var visual_blocks = getChildrenDimensions(container);
    var [blocks, div_blocks] = runSegmentation(visual_blocks);
    var alignment = getAlignment(blocks, div_blocks);
    var [mWidth, mHeight] = getParentWidthHeight(alignment, elmWidths, elmHeights);
    return [mWidth, mHeight];
}

function getBlocks(visual_blocks, vertical, horizontal){
    var blocks = [], div_blocks = {}, h1, h2, v1, v2, index;
    for(var i = 0; i < visual_blocks.length; i++) {
        v1 = closestFloorNum(visual_blocks[i][0], horizontal);
        h1 = closestFloorNum(visual_blocks[i][1], vertical);
        v2 = closestCeilNum(visual_blocks[i][2], horizontal);
        h2 = closestCeilNum(visual_blocks[i][3], vertical);
        index = blocks.findIndex(x => x[0]==v1 && x[1]==h1 && x[2]==v2 && x[3]==h2);
        if(index != -1){
            div_blocks[index].push(visual_blocks[i]);
        }else{
            blocks.push([v1,h1,v2,h2]);
            div_blocks[blocks.findIndex(x => x[0]==v1 && x[1]==h1 && x[2]==v2 && x[3]==h2)] = [visual_blocks[i]];
        }
    }
    return [blocks, div_blocks];
}

function closestFloorNum(num, arr){
    var len = arr.length;
    for(var i = 1; i < len; i++) {
        if(arr[i] > num && num >= arr[i-1]){
            return arr[i-1];
        }
    }
    return arr[len-1];
}

function closestCeilNum(num, arr){
    var len = arr.length;
    for(var i = 0; i < len-1; i++) {
        if(arr[i+1] > num && num >= arr[i]){
            return arr[i+1];
        }
    }
    return arr[len-1];
}

function getChildrenDimensions(container){
    var elm, position, visual_block, visual_blocks = [];
    for (var i = 0; i < container.childElementCount; i++) {
        elm = container.children[i];
        if(isVisible(elm)){
            position = elm.getBoundingClientRect();
            visual_block = [Math.floor(position.top), //+ window.pageYOffset),
                            Math.floor(position.left), // + window.pageXOffset),
                            Math.floor(position.bottom), // + window.pageYOffset),
                            Math.floor(position.right), // + window.pageXOffset),
                            elm];
            visual_blocks.push(visual_block);
        }else{
            console.log("Not Visible: ", elm);
        }
    }
    return visual_blocks;
}

function getAlignment(blocks, div_blocks){
    var alignment = [[0]], i, j, k, db, b;
    if(blocks.length == 1){
        for(i=1; i<div_blocks[0].length; i++){
            if(div_blocks[0][i-1][1] == div_blocks[0][i][1] && div_blocks[0][i-1][3] == div_blocks[0][i][3]){
                alignment.push([i]);
            }else{
                alignment[alignment.length-1].push(i);
            }
        }
    }else{
        for(i=1; i<blocks.length; i++){
            if(blocks[i-1][1] == blocks[i][1] && blocks[i-1][3] == blocks[i][3]){
                alignment.push([i]);
            }else{
                alignment[alignment.length-1].push(i);
            }
        }
    }

    for(i=0; i<alignment.length; i++){
        for(j=0; j<alignment[i].length; j++){
            k = alignment[i][j];
            if(blocks.length > 1 && div_blocks[k].length > 1){
                [b, db] = runSegmentation(div_blocks[k])
                alignment[i][j] = getAlignment(b, db);
            }else if(blocks.length == 1){
                alignment[i][j] = div_blocks[0][k][4];
            }else{
                alignment[i][j] = div_blocks[k][0][4];
            }
        }
    }

    return alignment;
}

function getParentWidthHeight(alignment, elmWidths, elmHeights){
    var pWidth = 0, pHeight = 0;
    for(var i=0; i<alignment.length; i++){
        if(alignment[i][0] && alignment[i][0] instanceof Array){
            [pw, ph] = getParentWidthHeight(alignment[i][0], elmWidths, elmHeights);
            pWidth = Math.max(pw, pWidth);
            pHeight += ph;
        }else if(alignment[i] && alignment[i] instanceof Array){
            var w = 0, h = 0;
            for(var j=0; j<alignment[i].length; j++){
                w += elmWidths[alignment[i][j]];
                h = Math.max(elmHeights[alignment[i][j]], h);

            }
            pWidth = Math.max(w, pWidth);
            pHeight += h;
        }else{
            pWidth += elmWidths[alignment[i]];
            pHeight = Math.max(elmHeights[alignment[i]], pHeight);
        }
    }
    return [pWidth, pHeight];
}

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