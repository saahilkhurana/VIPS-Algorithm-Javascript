// ------- old
// Get vertical lines that divide the visual blocks
function verticalSegmentation(visual_blocks){
    visual_blocks.sort(compareSecondColumn);
    // vertical_lines 2d array - [[start1, end1], [start2, end2]]
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
    // convert vertical_lines 2d array to 1d array
    vertical_lines = [].concat.apply([], vertical_lines);
    vertical_lines = vertical_lines.filter(function(item, pos) { return vertical_lines.indexOf(item) == pos;});
    return vertical_lines;
}

//---------- new
// Get vertical lines that divide the visual blocks
function verticalSegmentation(visual_blocks){
    //visual_blocks.sort(compareSecondColumn);
    visual_blocks.sort(compareLeft);
    // vertical_lines 2d array - [[start1, end1], [start2, end2]]
    var n_visual_blocks = visual_blocks.length;
    var vertical_lines = [];
    var i, size;

    for(i=0; i<n_visual_blocks; i++){

        //size = vertical_lines.length;
        var block = visual_blocks[i];
        var last_index = vertical_lines.length -1;

        if(last_index >= 0 && vertical_lines[last_index][0] <= block.left && block.left < vertical_lines[last_index][1]){
         //   vertical_lines[size-1][1] = Math.max(visual_blocks[i][3], vertical_lines[size-1][1]);
            vertical_lines[last_index][1] = Math.max(block.right, vertical_lines[last_index][1]);
        }
        else{
        //    vertical_lines.push([visual_blocks[i][1],visual_blocks[i][3]]);
            vertical_lines.push( [block.left,block.right]);
        }
    }
    // convert vertical_lines 2d array to 1d array
    vertical_lines = [].concat.apply([], vertical_lines);
    vertical_lines = vertical_lines.filter(function(item, pos) { return vertical_lines.indexOf(item) == pos;});
    return vertical_lines;
}

//------------old
// Get horizontal lines that divide the visual blocks
function horizontalSegmentation(visual_blocks){
    visual_blocks.sort(compareFirstColumn);
    var n_visual_blocks = visual_blocks.length, horizontal_lines = [], i, size;
     // horizontal_lines 2d array - [[start1, end1], [start2, end2]]
    for(i=0; i<n_visual_blocks; i++){
        size = horizontal_lines.length;
        if(size != 0 && horizontal_lines[size-1][0] <= visual_blocks[i][0] && visual_blocks[i][0] < horizontal_lines[size-1][1]){
            horizontal_lines[size-1][1] = Math.max(visual_blocks[i][2], horizontal_lines[size-1][1]);
        }
        else{
            horizontal_lines.push([visual_blocks[i][0],visual_blocks[i][2]]);
        }
    }
    // convert horizontal_lines 2d array to 1d array
    horizontal_lines = [].concat.apply([], horizontal_lines);
    horizontal_lines = horizontal_lines.filter(function(item, pos) { return horizontal_lines.indexOf(item) == pos;});
    return horizontal_lines;
}

//-----------------new 
// Get horizontal lines that divide the visual blocks
function horizontalSegmentation(visual_blocks){
    // visual_blocks.sort(compareFirstColumn);
    // you sort the blocks according to the top length
     visual_blocks.sort(compareTop);    
     var n_visual_blocks = visual_blocks.length;
     var horizontal_lines = [];
     var i, last_horizontal_line;
 
      // horizontal_lines 2d array - [[start1, end1], [start2, end2]]
     for(i=0; i<n_visual_blocks; i++){
         var block = visual_blocks[i];
         var last_index = horizontal_lines.length-1;     
 
             if( last_index >= 0 && horizontal_lines[last_index][0] <= block.top && block.top < horizontal_lines[last_index][1]){
                 horizontal_lines[last_index][1] = Math.max(block.bottom, horizontal_lines[last_index][1]);
             }
             else{
             horizontal_lines.push([block.top,block.bottom]);
             }
     }
     // convert horizontal_lines 2d array to 1d array
     horizontal_lines = [].concat.apply([], horizontal_lines);
     horizontal_lines = horizontal_lines.filter(function(item, pos) { return horizontal_lines.indexOf(item) == pos;});
     return horizontal_lines;
 }
