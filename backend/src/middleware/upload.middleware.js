const productUpload = require('../config/multer');

function checkFileUpload(req, res, next) {
    
    return productUpload.array('files')(req, res, next); // 'files' là trường trong formData của client
}

module.exports = checkFileUpload;
