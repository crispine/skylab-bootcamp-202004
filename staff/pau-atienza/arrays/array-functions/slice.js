'use strict';
function slice(array,begin = 0, end = array.length) {//arguments
    
    var result = [];

    if (begin > array.length) {
        return result;
    }

    for (begin; begin< end; begin++) {
        result[result.length] = array[begin];
    }

    return result;
};