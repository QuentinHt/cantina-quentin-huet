import VueRouter from 'vue-router'
import List from './components/List.vue'
import Form from './components/Form.vue'

export default new VueRouter({
    routes : [
        {
            path: '/List', component: List
        },
        {
            path: '/', component: Form
        }
    ]
})
