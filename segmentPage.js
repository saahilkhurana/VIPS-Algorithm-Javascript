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