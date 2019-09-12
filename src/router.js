import VueRouter from 'vue-router'
import List from './components/List.vue'
import Form from './components/Form.vue'
import Recipe from './components/Recipe.vue'
import Add from './components/Add.vue'

export default new VueRouter({
    routes : [
        {
            path: '/', component: List
        },
        {
            path: '/form', component: Form
        },
        {
            path: '/recipe/:id', component: Recipe
        },
        {
            path: '/addRecipe', component: Add
        }
    ]
})
