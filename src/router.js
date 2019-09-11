import VueRouter from 'vue-router'
import List from './components/List.vue'
import Form from './components/Form.vue'
import Recipe from './components/Recipe.vue'

export default new VueRouter({
    routes : [
        {
            path: '/', component: List
        },
        {
            path: '/form', component: Form
        },
        {
            path: '/recipe', component: Recipe
        }
    ]
})
