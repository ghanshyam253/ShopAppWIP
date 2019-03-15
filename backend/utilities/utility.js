let _isArray = (req, res) => {
    var toString = Object.prototype.toString;
    var nativeIsArray = Array.isArray;
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };
}
module.exports._isArray = _isArray