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
                <input type="number" v-model="minPers">
                <input type="number" v-model="maxPers">
                <input type="number" v-model="tempsMax">
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
            minPers:'',
            maxPers:'',
            tempsMax:'',
            filterValue: 'name',
        }
    },     
              computed: {
    filteredList: function() {
      return this.recipesList.filter(({ titre, niveau, personnes, tempsPreparation }) => {
          let filterValue = ''
        let searchText = this.searchText.toLowerCase();
        let filterNiveau = this.filterNiveau;
        let filterminPers = this.minPers === '' ? 0 : this.minPers
        let filtermaxPers = this.maxPers === '' ? 10000 : this.maxPers
        let filterTemps = this.tempsMax === '' ? 10000 : this.tempsMax
        titre = titre.toLowerCase();

          filterValue = titre.includes(searchText) && niveau.includes(filterNiveau) && personnes >= filterminPers && personnes <= filtermaxPers && tempsPreparation <= filterTemps
          return filterValue
      });
    }
  },                        
    created: function(){
        UserService
        .fetchAll()
        .then(recipesList => {
            this.recipesList = recipesList;
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

