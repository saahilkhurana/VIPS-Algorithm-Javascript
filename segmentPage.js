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
        if(size != 0 && vertical_lines[size-1][0] <= visual_blocks[i][1] && visual_blocks[i][1] <= vertical_lines[size-1][1]){
            vertical_lines[size-1][1] = Math.max(visual_blocks[i][3], vertical_lines[size-1][1]);
        }
        else{
            vertical_lines.push([visual_blocks[i][1],visual_blocks[i][3]]);
        }
    }
    return [].concat.apply([], vertical_lines);
}


function horizontalSegmentation(visual_blocks){
    visual_blocks.sort(compareFirstColumn);
    var n_visual_blocks = visual_blocks.length, horizontal_lines = [], i, size;
    for(i=0; i<n_visual_blocks; i++){
        size = horizontal_lines.length;
        if(size != 0 && horizontal_lines[size-1][0] <= visual_blocks[i][0] && visual_blocks[i][0] <= horizontal_lines[size-1][1]){
            horizontal_lines[size-1][1] = Math.max(visual_blocks[i][2], horizontal_lines[size-1][1]);
        }
        else{
            horizontal_lines.push([visual_blocks[i][0],visual_blocks[i][2]]);
        }
    }
    return [].concat.apply([], horizontal_lines)
}

function runSegmentation(visual_blocks){
//    visual_blocks = [[2, 3, 4, 5], [6, 9, 9, 11], [3, 7, 5, 9], [6, 4, 8, 6], [3, 3, 5, 5]];
    var vertical_lines = verticalSegmentation(visual_blocks),
        horizontal_lines = horizontalSegmentation(visual_blocks),
        blocks, div_blocks;
    [blocks, div_blocks] = getBlocks(visual_blocks, vertical_lines, horizontal_lines);
    return [blocks, div_blocks];
}

function getBlocks(visual_blocks, vertical, horizontal){
    var blocks = [], div_blocks = {}, h, v, index;
    for(var i = 0; i < visual_blocks.length; i++) {
        v = closestNum(visual_blocks[i][0], horizontal);
        h = closestNum(visual_blocks[i][1], vertical);
        index = blocks.findIndex(x => x[0]==v && x[1]==h);
        if(index != -1){
            div_blocks[index].push(visual_blocks[i]);
        }else{
            blocks.push([v,h]);
            div_blocks[blocks.findIndex(x => x[0]==v && x[1]==h)] = [visual_blocks[i]];
        }
    }
    return [blocks, div_blocks];
}

function closestNum(num, arr){
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] > num){
            return arr[i-1];
        }
    }
    return arr[arr.length-1];
}

function getChildrenDimensions(container){
    var elm, position, visual_block, visual_blocks = [];
    for (var i = 0; i < container.childElementCount; i++) {
        elm = container.children[i];
        position = elm.getBoundingClientRect();

        visual_block = [Math.floor(position.top + window.pageYOffset), Math.floor(position.left + window.pageXOffset),
                Math.floor(position.bottom + window.pageYOffset), Math.floor(position.right + window.pageXOffset),
                elm.id];
        visual_blocks.push(visual_block);
    }
    return visual_blocks;
}

function run(container){
    var blocks, div_blocks,
        visual_blocks = getChildrenDimensions(container);
    [blocks, div_blocks] = runSegmentation(visual_blocks);
}