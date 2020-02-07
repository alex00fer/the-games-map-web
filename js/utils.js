
function arrayToStringJSONValue(array, value, separator = ", ") {
    var text = "";
    if (!array) return "-";
    array.forEach(function(i, idx, array){
        text += resolve(value, i);
        if (idx !== array.length - 1){ 
            text+=separator;
        }
    });
    return text;

}

// find objects inside objects on multiple levels dynamically
function resolve(path, obj) {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}
