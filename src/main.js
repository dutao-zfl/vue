import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import 'jquery'
import 'underscore';
import 'backbone';
import './config/jqueryConfig'

import Home from './pages/home.vue';
import LeftMenu from './pages/leftMenu.vue';
import RightBody from './pages/rightBody.vue';
import Breadcrumb from './pages/Breadcrumb.vue';


Vue.use(VueRouter);
const Foo = {template: '<div>foo<router-view></router-view></div>'};
const Bar = {template: '<div>{{this.$route.params.key}}</div>'};
const routes = [
    {
        path: '/',
        name:'one',
        component: Home,
        children: [{
            path: ':id',
            name:'two',
            component: LeftMenu,
            children: [
                {
                    path: ':key',
                    name: 'three',
                    components: {
                        Breadcrumb,
                        RightBody
                    }
                }
            ]
        }]
    }
];

const router = new VueRouter({
    //mode: 'history',
    routes
});


const app = new Vue({
    store,
    router,
    el: '#app'
});