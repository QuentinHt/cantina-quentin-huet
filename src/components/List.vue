<template>
            <div class="container centered">

            <h1>Liste des recettes</h1>
            <hr>
            <div class="userlist" v-if="recipesList">
                <Recipecard v-for="recipe in recipesList" :recipe="recipe" :key="recipe.id" @delete='deleteRecipe'/>
            </div>

        </div>
</template>

<script>

import UserService from '../services/UserService.js'
import Recipecard from './Recipecard.vue'

export default {
    name: 'List',
    components : {
        Recipecard
    },
  methods: {
      deleteRecipe: function(recipeToDelete){
            UserService.deleteRecipe(recipeToDelete).then(res => {
                    let index = this.recipesList.indexOf(recipeToDelete);
                    if (index > -1){
                        this.recipesList.splice(index, 1);
                    }
})
.catch(errorMessage => alert(errorMessage))
        }
  },
    data: function() {
        return {
            recipesList: null,
            searchText: '',
            filterValue: 'name'
        }
    },                             
    created: function(){
        UserService
        .fetchAll()
        .then(recipesList => {
            this.recipesList = recipesList;
            console.log(recipesList)
        })
    }
}
</script>

<style>
.userlist {
    display: flex;
    flex-wrap: wrap;
}

.userlist>* {
    box-sizing: border-box;
    width: calc(94%/3);
    margin: 1%;
}

.filterform {
    margin: 2em 0
}    

</style>

