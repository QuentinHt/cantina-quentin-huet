<template>
    <div class="container centered">

            <h1>Ajouter une recette</h1>
            <hr>
            <Form @send='addUser'/>
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
        addUser: function(recipe){

 
            UserService.addUser(recipe).then(res => {
                    this.$router.replace('/list')
            }).catch(({message}) => alert(message))
        }
    }
}
</script>
<style>

</style>
