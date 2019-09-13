<template>
    <div class="container centered">

            <h1>Modifier un collaborateur</h1>
            <hr>
            <Form :recipe='recipe' v-if='recipe' @send='update'/>
        </div>
</template>
<script>
import Form from "./Form.vue"
import UserService from "../services/UserService"
export default {
    name: 'Edit',
    data: function(){
        return {
            recipe: null
        }
    },
    components: {
        Form
    },
    created: function(){
        UserService
        .fetchOne(this.$route.params.id)
        .then(recipe => {
            this.recipe = recipe
        })
        .catch(({message}) => alert(message))
    },
    methods: {
        update: function(user){
            UserService.updateRecipe(this.recipe).then(res => {
                if (res.success === 1 ) {
                    return this.$router.replace('/list')
                }
                else{
                    alert(res.message)
                }
            })
        }
    }
}
</script>
<style>

</style>
