//hasher.js
(function (hasher) {
    
    var crypto = require('crypto');
    
    hasher.createSalt = function () {
        var length = 8;
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length);
    };
    hasher.computeHash = function (source, salt) {
        //encr. algorithm
        var hmac = crypto.createHmac("sha1", salt);
        var hash = hmac.update(source);
        return hash.digest("hex");
    };
    
    
})(module.exports);
