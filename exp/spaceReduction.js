/** 
 * Sort list of lists using the first column
 * helper function for sorting visual blocks using horizontal lines
 * 
 * @param  {visual block object}
 * @param  {visual block object}
 */
function compareTop(a, b) {
    if (a.top === b.top) {
        return 0;
    }
    else {
        return (a.top < b.top) ? -1 : 1;
    }
}

/**
 * Sort list of lists using the second column
 * helper function for sorting visual blocks using vertical lines
 * 
 * @param  {visual block object}
 * @param  {visual block object}
 */
function compareLeft(a, b) {
    if (a.left === b.left) {
        return 0;
    }
    else {
        return (a.left < b.left) ? -1 : 1;
    }
}

/**
 * Get vertical lines that divide the visual blocks
 *
 * @param  {Array of visual blocks objects}
 * @return {Array of vertical separators} - that divide the row into many parts
 */
function verticalSegmentation(visual_blocks){
    // you sort the blocks according to the left and right lines, so that you get all the horizontal separators
    visual_blocks.sort(compareLeft);
    /* vertical_lines 2d array - [[start1, end1], [start2, end2]]
       start1 - left and end1 - right
       start2 - left and end2 - right
    */
    var n_visual_blocks = visual_blocks.length;
    var vertical_lines = [];
    var i, size;

    for(i=0; i<n_visual_blocks; i++){

        var block = visual_blocks[i];
        var last_index = vertical_lines.length -1;

        if(last_index >= 0 && vertical_lines[last_index][0] <= block.left && block.left < vertical_lines[last_index][1]){
         //when there is a overlap between 2 visual blocks, so that we know the new right boundary of the block.
            vertical_lines[last_index][1] = Math.max(block.right, vertical_lines[last_index][1]);
        }
        else{
        //when there is no overlap, simply add the left and right boundaries of the block.
            vertical_lines.push( [block.left,block.right]);
        }
    }
    // convert vertical_lines 2d array to 1d array
    vertical_lines = [].concat.apply([], vertical_lines);
    vertical_lines = vertical_lines.filter(function(item, pos) { return vertical_lines.indexOf(item) == pos;});
    return vertical_lines;
}
 
/**
 * Get horizontal lines that divide the visual blocks
 * 
 * @param  {Array of visual blocks objects}
 * @return {Array of vertical separators} - that divide a column into many parts
 */
function horizontalSegmentation(visual_blocks){
    // you sort the blocks according to the top and bottom lines, so that you get all the horizontal separators
     visual_blocks.sort(compareTop);    
     var n_visual_blocks = visual_blocks.length;
     var horizontal_lines = [];
     var i, last_horizontal_line;
 
      /* horizontal_lines 2d array - [[start1, end1], [start2, end2]]
      start1 - top and end1 - bottom
      start2 - top and end2 - bottom
      */
     for(i=0; i<n_visual_blocks; i++) {
         var block = visual_blocks[i];
         var last_index = horizontal_lines.length-1;     
 
         if( last_index >= 0 && horizontal_lines[last_index][0] <= block.top && block.top < horizontal_lines[last_index][1]) {
          //when there is a overlap between 2 visual blocks, so that we know the new bottom boundary of the block.    
             horizontal_lines[last_index][1] = Math.max(block.bottom, horizontal_lines[last_index][1]);
         } else {
          //when there is no overlap, simply add the top and bottom boundaries of the block.
         horizontal_lines.push([block.top,block.bottom]);
         }
     }

     // convert horizontal_lines 2d array to 1d array
     horizontal_lines = [].concat.apply([], horizontal_lines);
     horizontal_lines = horizontal_lines.filter(function(item, pos) { return horizontal_lines.indexOf(item) == pos;});
     return horizontal_lines;
 }


/** 
 * Run Segmentation algorithm,
 * runs horizontal and vertical segmentation
 * on the visual_blocks to get vertical_lines and horizontal_lines
 * and then calls getBlocks() which returns list of super blocks.
 * 
 * @param  {[Array of visual blocks]}
 * @return {[List of Super blocks]}
 */
function runSegmentation(visual_blocks){
    var blocks, div_blocks,
        vertical_lines = verticalSegmentation(visual_blocks),
        horizontal_lines = horizontalSegmentation(visual_blocks);
         
    return getBlocks(visual_blocks, vertical_lines, horizontal_lines);
}


/** 
* top,left,bottom,right - defines the boundaries 
* of a bigger block which contains many overlapping visual blocks. 
*/
class SuperBlock{
    constructor(top,left,bottom,right){
        this.top = top;
        this.left= left;
        this.bottom = bottom;
        this.right = right;
        this.list_visualblks = [];
    }
   
    addVisualBlock(vb){
        this.list_visualblks.push(vb);
    }
}


/** 
 * All overlapping visual blocks have same top, left, bottom, and right boundaries.
 * getSuperBlockIndex method compares the top, left, bottom, and right boundaries with previous 
 * visual block boundaries, if they match it returns the same index.
 * 
 * @param  {[Array of super blocks]}
 * @param  {[Number]- top dimension of the current visual block}
 * @param  {[Number]- left dimension of the current visual block}
 * @param  {[Number]- bottom dimension of the current visual block}
 * @param  {[Number]- right dimension of the current visual block}
 * @return {[Number]- returns the index of the superblock to which the visual block belongs to,
 *                    otherwise -1}
 */
function getSuperBlockIndex(list_sb, top, left, bottom, right){
    var super_block;
    for(var i=0; i<list_sb.length; i++){
        super_block = list_sb[i];
        if(super_block.top == top && super_block.left == left && super_block.bottom == bottom && super_block.right == right){
            return i;
        }
    }
    return -1;
}

/**
 * Scans visual blocks one by one assigns then or clusters them together into super blocks
 * superblocks are - (visual blocks grouped together based on overlaps)
 *
 * @param  {[List of visual blocks]}
 * @param  {[Array of vertical separators]}
 * @param  {[Array of horizontal seperators]}
 * @return {[List of super blocks where each superblock may contain 1 or more visual blocks]}
 */
function getBlocks(visual_blocks, vertical, horizontal) {
    var left, right, top, bottom, index;
    var list_sb = [];
    var superBlk;
    for(var i = 0; i < visual_blocks.length; i++) {
        top = closestFloorNum(visual_blocks[i].top, horizontal);
        left = closestFloorNum(visual_blocks[i].left, vertical);
        bottom = closestCeilNum(visual_blocks[i].bottom, horizontal);
        right = closestCeilNum(visual_blocks[i].right, vertical);
        
        /*
        All overlapping visual blocks have same top, left, bottom, and right boundaries.
        getSuperBlockIndex method compares the top, left, bottom, and right boundaries with previous 
        visual block boundaries, if they match it returns the same index.
        */
        index = getSuperBlockIndex(list_sb, top, left, bottom, right);
        
        if(index != -1){
            superBlk = list_sb[index];
            superBlk.addVisualBlock(visual_blocks[i]);

        } else {
            var superBlk = new SuperBlock(top,left,bottom,right);
            superBlk.addVisualBlock(visual_blocks[i]);
            list_sb.push(superBlk);
        }
    }
    return list_sb;
}

/**
 * The overlaps have already been included in the array 
 * vertical_lines and horizontal_lines 
 * So overlapping visual blocks will have same top and left boundary
 * We use Floor because top and left boundaries are involved
 *
 * @param  {[Number] - top or left dimension of the visual block}
 * @param  {[Array of numbers] - this array can be horizontal separators or vertical separators}
 * @return {[Number] - floor of top or left boundary}
 */
function closestFloorNum(num, arr) {
    var len = arr.length;
    for(var i = 1; i < len; i++) {
        if(arr[i] > num && num >= arr[i-1]) {
            return arr[i-1];
        }
    }
    return arr[len-1];
}

/**
 * The overlaps have already been included in the array 
 * vertical_lines and horizontal_lines 
 * So overlapping visual blocks will have same bottom and right boundary
 * We use Ceil because bottom and right boundaries are involved
 *
 * @param  {[Number]- bottom or right dimension of the visual block}
 * @param  {[Array of numbers] - this array can be horizontal separators or vertical separators}
 * @return {[Number] - ciel of bottom or right boundary}
 */
function closestCeilNum(num, arr) {
    var len = arr.length;
    for(var i = 0; i < len-1; i++) {
        if(arr[i+1] > num && num >= arr[i]) {
            return arr[i+1];
        }
    }
    return arr[len-1];
}

/**
 * A single atomic block containing the dimensions of the div/button
 */
class visualBlock {
    constructor(top,left,bottom,right,div) {
              this.top = top;
              this.left = left;
              this.bottom = bottom;
              this.right = right;
              this.div = div;
    }
}

/**
 * returning an array of of objects of class visualBlock
 * 
 * @param  {HTML DOM object}
 * @return {[list of visual block class objects]}
 */
function getVisualBlocks(container) {
    var elm, position, visual_block, visual_blocks = [];
    for (var i = 0; i < container.childElementCount; i++) {
        elm = container.children[i];
        if(isVisible(elm) && elm.tagName != "BR") {
            position = elm.getBoundingClientRect();
            visual_block = new visualBlock(Math.floor(position.top + window.pageYOffset),
                            Math.floor(position.left + window.pageXOffset),
                            Math.floor(position.bottom + window.pageYOffset),
                            Math.floor(position.right + window.pageXOffset),
                            elm);
            visual_blocks.push(visual_block);
        } else {
            console.log('Not Visible: ', elm);
        }
    }
    return visual_blocks;
}

/**
 * The first method that gets called when parsing the tree recursively,
 * returns the minimum width and height of the DOM container, which can accommodate 
 * all the text and buttons, so that reduce space function can be applied on this
 * minimum width and height thus obtained.
 * Segments the element and gets the minimum width and height of the element.
 *
 * @param  {HTML DOM element}
 * @param  {[Number]- elmWidth of the DOM element}
 * @param  {[Number]- elmHeight of the DOM element}
 * @return {[minimum Width and minimum Height of wrap all the contents of the div]}
 */
function getMinimumWidthHeight(container, elmWidths, elmHeights){
    var  mWidth, mHeight;
    var  visual_blocks = getVisualBlocks(container);
    var list_superBlks = runSegmentation(visual_blocks);

    var alignment = getAlignment(list_superBlks);  
    
    var widthHeight = getElementWidthHeight(alignment, elmWidths, elmHeights);
    mWidth = widthHeight[0];
    mHeight = widthHeight[1];
    return [mWidth, mHeight];
}


/**
 * Get alignment of immediate children, [1,2] represents 1, 2 are horizontal to each other
 *   [[1],
 *   [2]
 *   ] represents 1,2 are vertical to each other
 *
 *    alignment is a 2D representation of the div blocks
 * |.......[  ] .....[ ] .....|
 * |.......[  ] .....[ ] .....|
 * |...........      [ ] .....|
 * alignment - contains index of super blocks grouped together.
 * 
 * @param  {[list of super block objects]}
 * @return {[2-D array of alignment of these super blocks]}
 */
function getAlignment(list_sb) {
    var alignment = [[0]], i, j, k, db, b;
    var myMap = new Map(); 

    if(list_sb.length == 1){
        var superBlk = list_sb[0];
        var list_visualblks = superBlk.list_visualblks;
        myMap.set([list_visualblks[0].top,list_visualblks[0].bottom].join(),[0]);
                                 
        for(i=1; i<list_visualblks.length; i++) {
            var key = [list_visualblks[i].top,list_visualblks[i].bottom].join();
            var val = myMap.get(key);
            if(val != undefined){
                var list = myMap.get(key);
                list.push(i);
                myMap.set(key,list);
                alignment[alignment.length-1].push(i);
            } else{
                // add a new entry to map
                myMap.set(key,[i]);
                alignment.push([i]);
            } 
        }
    } else {    
        myMap.set([list_sb[0].top,list_sb[0].bottom].join(),[0]);

        for(i=1; i<list_sb.length; i++) {
            var key = [list_sb[i].top,list_sb[i].bottom].join();
            var val = myMap.get(key);
            if(val != undefined){
                var list = myMap.get(key);
                list.push(i);
                myMap.set(key,list);
                alignment[alignment.length-1].push(i);
            } else {
                // add a new entry to map
                myMap.set(key,[i]);
                alignment.push([i]);
            }
        }
    }

    /*
    Code for assigning the div blocks to alignment, but we need numbers in alignment not div blocks
    for( row=0; row < alignment.length; row++){
        for(col=0; col<alignment[row].length; col++){

            k = alignment[row][col];
            var list_visualblks = list_sb[k].list_visualblks;
            // so , basically div_blocks[k] represents the list_visualblks,, so div_blocks[k] is replaced by list_visualblks, belonging to a super block
            if(list_sb.length > 1 && list_visualblks.length > 1){
                // If blocks has more that one html element, segment the block and get alignment
                var list_superBlks = runSegmentation(list_visualblks);
                alignment[row][col] = getAlignment(list_superBlks);
            }else if(list_sb.length == 1){
                alignment[row][col] = list_sb[0].list_visualblks[k].div;
            }else{
                alignment[row][col] = list_sb[k].list_visualblks[0].div;
            }
        }
    }
    */
    return alignment;
}


/**
 * Get minimum height and width of parent, given alignment of children
 * For a single row - add the width's row wise and keeps the max height for a single row.
 * When iterating row's add the height of each row and get the max width out of all the rows.
 *  
 * @param  {2-D array of numbers} - alignment of super blocks
 * @param  {[type]} - array of element widths
 * @param  {[type]} - array of element heights
 * @return {[mWidth,]}
 */
function getElementWidthHeight(alignment, elmWidths, elmHeights) {
    var pw, ph, pWidth = 0, pHeight = 0;
    for(var i=0; i<alignment.length; i++) {
        if(alignment[i][0] && alignment[i][0] instanceof Array) {
            var pWH = getElementWidthHeight(alignment[i][0], elmWidths, elmHeights);
            pw = pWH[0];
            ph = pWH[1];
            // vertical elements
            pWidth = Math.max(pw, pWidth);
            pHeight += ph;
        } else if(alignment[i] && alignment[i] instanceof Array) {
            var w = 0, h = 0;
            for(var j=0; j<alignment[i].length; j++){
                // horizontal elements
                w += elmWidths[alignment[i][j]];
                h = Math.max(elmHeights[alignment[i][j]], h);

            }
            pWidth = Math.max(w, pWidth);
            pHeight += h;
        } else {
            pWidth += elmWidths[alignment[i]];
            pHeight = Math.max(elmHeights[alignment[i]], pHeight);
        }
    }
    return [pWidth, pHeight];
}

/**
 * Revert back the changes made to CSS
 * @param  {JS Object}
 */
function revertBack(element) {
    element.style.cssText = element.previousCSS;
}


/**
 * Reduce Space of an element based on minimum height, width.
 * Update padding, margin, position, border of element
 * Update font size
 * Variable reductionFactor lies between 0 and 1
 * 
 * @param  {Object} - Html DOM element 
 * @param  {mWidth} - mWidth of the element which accommodates all the contents of the element.
 * @param  {mHeight} -mHeight of the element which accommodates all the contents of the element.
 * @param  {Number} - Reduction factor - 0.9
 * @return {[type]}
*/
function reduceSpace(element, mWidth, mHeight, reductionFactor) {
/*  var previousCSS = '';
    for(var i = 0; i < css.length; i++){
        previousCSS += css[i] + ':' + css.getPropertyValue(css[i]) + ';';
    }
    If below declaration of previousCSS fails, go for the above   
    if(!$(element).is(':visible') || $(element).css('display') == 'none' || $(element).css('visibility') == 'hidden')
*/        
    console.log(element);
    
    var css = getComputedStyle(element),
        width = parseInt(css.getPropertyValue('width'))+1, // Handle non int values by adding 1
        height = parseInt(css.getPropertyValue('height'))+1;

    element.previousCSS = css.cssText;
    // Handle auto
    if(css.getPropertyValue('width') == 'auto'){
        width = element.getBoundingClientRect().width;
    }

    if(css.getPropertyValue('height') == 'auto'){
        height = element.getBoundingClientRect().height;
    }

    if(element.tagName == 'INPUT' || element.tagName == 'SELECT'){
        // Reduce input and select elements by atleast 0.1
        width *= 0.9;
        height *= 0.9;
    }

        //element.style.height = height + 'px';
    element.style.width = width + 'px';

    width = minimizeWidthHeight(element, mWidth, width, 'width')
    height = minimizeWidthHeight(element, mHeight, height, 'height');

    updateMinimumWidthHeight(element);

    var padding = updatePadding(element, css, reductionFactor);
    paddingVertical = padding[0];
    paddingHorizontal = padding[1];

    var margin = updateMargin(element, css, reductionFactor);
    marginVertical = margin[0];
    marginHorizontal = margin[1];

    var position = updatePosition(element, css, reductionFactor);
    positionVertical = position[0];
    positionHorizontal = position[1];

    var border = updateBorder(element, css, reductionFactor);
    borderVertical = border[0];
    borderHorizontal = border[1];

    // Set font size and width of text
    if(element.innerText && element.innerText.replace(/\s/g,'') != '' && css.getPropertyValue('font-size')){
        if(element.firstChild && element.firstChild.nodeValue && element.firstChild.nodeValue.replace(/\s/g,'') != '' ){
            element.style.fontSize = getFontSize(parseInt(css.getPropertyValue('font-size'))) + 'px';
            css = getComputedStyle(element);
            // TODO: If get text width function is reliable(which is not reliable now), the space reduction algorithm will be more effective
            // var wh = getTextWidth(element.firstChild.nodeValue, css.getPropertyValue('font'));
            // width = wh[0];
            // height = wh[1];
            var wh = measureText(element.firstChild.nodeValue, css.getPropertyValue('font-size'), element.style);
            width = wh.width;
            // Hardcoded: Adding 40px
            element.style.width = width + 40 + 'px';
               // element.style.height = height + 'px';
            css = getComputedStyle(element);
            width = parseInt(css.getPropertyValue('width'))+1;
                //height = parseInt(css.getPropertyValue('height'))+1;
        }
    }

    return [paddingHorizontal+marginHorizontal+width, paddingVertical+marginVertical+height];
}

/**
 * Start of algorithm (Begin here)
 * @param  {div id} - id of the div over which you apply spaceReduction algo 
 */
function spaceReduction(query){
  //  var container = document.querySelector(query);
    var container = document.getElementById(query);

    if(container){
        if(container.id && container.id == 'navbar'){
            // Hardcoded: Condition id nav bar for amazon
            return 'Space reduction algorithm run successful';
        }
        getWidthHeightContainer(container);
        return 'Space reduction algorithm run successful';
    }
    return 'Space reduction algorithm run failed';
}

/**
 * Get width height of the updated container
 * 
 * @param  {JS DOM Object}
 * @return {[type]}
 */
function getWidthHeightContainer(container) {
    var elmWidths = {}, elmHeights = {},
        w, h, mWidth, mHeight, elm, css, count = 0;
//    var elms = container.getElementsByTagName('*');

    for (var i = 0; i < container.childElementCount; i++) {
        elm = container.children[i];
        if(isVisible(elm)){
            var wh = getWidthHeightContainer(elm);
            w = wh[0];
            h = wh[1];
            elmWidths[count] = w;
            elmHeights[count] = h;
            count++;
        }
    }

    if(!isVisible(container) || count == 0 || container.tagName == 'SELECT'){
        // Set by default
        mWidth = 0;
        mHeight = 0;
    }else if(count == 1){
        // Don't perform segmentation if there is only one child element
        css = getComputedStyle(container.children[0]);
        mWidth = parseInt(css.getPropertyValue('width'))+1;
        mHeight = parseInt(css.getPropertyValue('height'))+1;
    }else{
        // Start segmentation algorithm and get minimum height, width
        var widthHeight = getMinimumWidthHeight(container, elmWidths, elmHeights);
        mWidth = widthHeight[0];
        mHeight = widthHeight[1];
    }
    console.log([elmWidths,elmHeights]);

    if(container.className == 'VacationPackagesSearchForm__flight-passengers mobile-seti'){
        // Hardcoded: Condition for priceline packages page
        css = getComputedStyle(container);
        mHeight = css.getPropertyValue('height');
    }

    // Reduce space of current container by using the min height, width obtained
    var widthHeight = reduceSpace(container, mWidth, mHeight, 0.3);
    return [widthHeight[0], widthHeight[1]];
}


/**
 * Get increased font size based on current font
 * 
 * @param  {Number} - font size
 * @return {Number} - enhanced font size
 */
function getFontSize(size){
    if(size < 12){
        return size*1.3;
    }else if(size > 20){
        return 23;
    }else{
        return size*1.2;
    }
}

/**
 * Get size of width/height, irrespective of % or px value
 * 
 * @param  {Number} - font size
 * @param  {String} - unit of font size
 * @return {concatenated number with unit}
 */
function getSize(size, units){
    if(units){
        return size + '%';
    }else{
        return size + 'px';
    }
}

/**
 * Set width/height to minSize if the condition is satisfied
 * 
 * @param  {Object} - Html object 
 * @param  {Number} - minsize of the object
 * @param  {Number} - size of the object
 * @param  {Number} - quantity css property
 * @return {[type]}
 */
function minimizeWidthHeight(element, minSize, size, quantity){
    if(minSize && minSize > 0 && minSize < size){
        size = minSize;
        element.style[quantity] = minSize + 'px';
    }
    return size;
}

/**
 * Set min-height, min-width to 0px
 * @param  {Object} - Html div object
 */
function updateMinimumWidthHeight(element){
    element.style.minHeight = '0px';
    element.style.minWidth = '0px';
}

/** 
 * Update padding of an element
 * @param  {DOM Object} - dom element object
 * @param  {CSS Object} - css of the dom element object
 * @param  {Number} - hardcoded to 0.9
 * @return {[Number] - updated border length}
 */
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

/**
 * Update margin of an element
 * @param  {DOM Object} - dom element object
 * @param  {CSS Object} - css of the dom element object
 * @param  {Number} - hardcoded to 0.9
 * @return {[Number] - updated border length}
 */
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

/**
 * Update position of an element
 * @param  {DOM Object} - dom element object
 * @param  {CSS Object} - css of the dom element object
 * @param  {Number} - hardcoded to 0.9
 * @return {[Number] - updated border length}
 */
function updatePosition(element, css, reductionFactor){
    // Hardcoded reduction factor
    reductionFactor = 0.9;
    if(element.className == 'global-header-nav-product-list'){
        reductionFactor = 1.2;
    }
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

/** 
 * Update border of an element
 * @param  {DOM Object} - dom element object
 * @param  {CSS Object} - css of the dom element object
 * @param  {Number} - hardcoded to 0.9
 * @return {[Number] - updated border length}
 */
function updateBorder(element, css, reductionFactor){
    // Hardcoded reduction factor
    reductionFactor = 0.9;
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

/** 
 * Check if a html element is visible or not
 * 
 * @param  {[Object] - DOM object}
 * @return {Boolean}
 */
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
//    TODO: Check below line
//    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
//    var pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
//    do {
//        if (pointContainer === elem) return true;
//    } while (pointContainer = pointContainer.parentNode);
//    return false;
    return true;
}


/** 
 * Get width of text based on text content and font
 * Works in Chrome
 * 
 * @param  {String} - text
 * @param  {font} - font of div
 * @return {[metrics.width, metrics.height]}
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    var context = canvas.getContext('2d');
    context.font = font;
    var metrics = context.measureText(text);
    return [metrics.width, metrics.height];
}


/** 
 * Works in IE
 * @param  {Number}
 * @param  {Number}
 * @param  {Number}
 * @return {[div.width, div.height]}
 */
function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = '' + pFontSize + 'px';
    lDiv.style.position = 'absolute';
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}