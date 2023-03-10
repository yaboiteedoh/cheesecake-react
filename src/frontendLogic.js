
// query for multiple elements via param (#, .)
// returns an array including all objects meeting param
export function es$(param){
    var array = document.querySelectorAll(param);
    return array;
}

// query for a single element via param (#, .)
// returns an element
export function e$(param){
    var element = document.querySelectorAll(param);
    return element[0];
}