import VueRouter from 'vue-router'
import List from './components/List.vue'
import Recipe from './components/Recipe.vue'
import Add from './components/Add.vue'
import Edit from './components/Edit.vue'
import Home from './components/Home.vue'

export default new VueRouter({
    routes : [
        {
            path: '/', component: Home
        },
        {
            path: '/list', component: List
        },
        {
            path: '/recipe/:id', component: Recipe
        },
        {
            path: '/addRecipe', component: Add
        },
        {
            path: '/edit/:id', component: Edit
        }
    ],
    scrollBehavior(){
        return {x: 0, y:0}
    }
})
