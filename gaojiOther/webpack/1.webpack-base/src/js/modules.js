const $ = require('jquery');

module.exports = function() {
    $('.ctrlSnowGirl').on('click', function() {
        $(this).parent().next().toggle(300);
    });
}