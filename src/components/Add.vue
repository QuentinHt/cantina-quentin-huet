<template>
    <div class="container centered">

            <h1>Ajouter une recette</h1>
            <hr>
            <Form @send='addRecipe'/>
        </div>
</template>
<script>
import Form from "./Form.vue"
import UserService from "../services/UserService"
export default {
    name: 'Add',
    components: {
        Form
    },
    methods: {
        addRecipe: function(recipe){
            UserService.addRecipe(recipe).then(() => {
                    this.$router.replace('/list')
            }).catch(({message}) => alert(message))
        }
    }
}
</script>
<style>

</style>
