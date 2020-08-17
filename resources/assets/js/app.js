import SearchComponent from "./components/SearchComponent";
import VueRouter from "vue-router";
import {routes} from "./routes";
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode:'history'
})
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */



Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app',
    router,
    components:{
        SearchComponent
    }
});
