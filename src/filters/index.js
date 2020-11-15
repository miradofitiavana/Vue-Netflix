import Vue from "vue";

Vue.filter('truncate', function (value) {
    if (value && value.length > 120) {
        value = value.substring(0, 120) + '...';
    }
    return value
});

Vue.filter('yearOnly', function (value) {
    if (value) {
        value = value.substring(0, 4);
    }
    return value;
});