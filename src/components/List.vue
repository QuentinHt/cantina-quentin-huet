<template>
            <div class="container centered">

            <h1>Liste des recettes</h1>
            <hr>
            <form class="filterform">
                <input type="search" placeholder="Tapez un nom ou un lieu ..." v-model="searchText">
                <select name="niveauFilter" id="" v-model="filterNiveau">
                    <option value="padawan">padawan</option>
                    <option value="jedi">jedi</option>
                    <option value="maitre">maitre</option>
                </select>
                <label for="filter">Filtrer par :</label>

            </form>
            <div class="userlist" v-if="recipesList">
                <Recipecard v-for="recipe in filteredList" :recipe="recipe" :key="recipe.id" @delete='deleteRecipe'/>
            </div>

        </div>
</template>

<script>

import UserService from '../services/UserService.js'
import Recipecard from './Recipecard.vue'

export default {
    name: 'List',
    components : {
        Recipecard,
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
            filterNiveau: '',
            filterValue: 'name'
        }
    },     
              computed: {
    filteredList: function() {
      return this.recipesList.filter(({ titre, niveau }) => {
        let searchText = this.searchText.toLowerCase();
        let filterNiveau = this.filterNiveau;
        titre = titre.toLowerCase();

        return this.filterValue === "name"
          ? titre.includes(searchText) && niveau.includes(filterNiveau)
          : niveau.includes(filterNiveau);
      });
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

