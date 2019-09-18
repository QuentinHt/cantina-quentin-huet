<template>
            <div class="container centered containerList">

            <h1>Liste des recettes</h1>
            <hr>
            <div class="filterContainer">
            <h2 class="testH2">Filtrer par :</h2>
            <form class="filterform">
                <div class="form-group">
                <label for="filterName">Nom :</label>
                <input type="search" id="filterName" placeholder="Titre de la recette" v-model="searchText">
                </div>
                <div class="form-group">
                <label for="filterNiveau">Niveau :</label>
                <select name="niveauFilter" id="filterNiveau" v-model="filterNiveau">
                    <option value=""></option>
                    <option value="padawan">padawan</option>
                    <option value="jedi">jedi</option>
                    <option value="maitre">maitre</option>
                </select><br>
                </div>
                <div class="form-group filterPers">
                <label for="persMin">Nombre de personnes :</label>
                <label for="persMin"> entre </label>
                <input type="number" id="persMin" v-model="minPers">
                <label for="persMax"> et </label>
                <input type="number" id="persMax" v-model="maxPers">
                <label for="persMax"> personnes</label><br>
                </div>
                <div class="form-group">
                <label for="tempsMax">Durée maximum : </label>
                <input type="number" placeholder="Temps maximum" id="tempsMax" v-model="tempsMax">
                </div>
            </form>
            </div>
            <div class="recipeList" v-if="recipesList">
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
          if(confirm("Vous allez supprimer cette recette, êtes vous sur ?")){
            UserService.deleteRecipe(recipeToDelete).then(() => {
                    let index = this.recipesList.indexOf(recipeToDelete);
                    if (index > -1){
                        this.recipesList.splice(index, 1);
                    }
})
.catch(errorMessage => alert(errorMessage))
          }
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
.recipeList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

}

.recipeList>* {
    box-sizing: border-box;
    width: calc(88%/3);
    margin: 2%;
    min-width: 300px
}

.filterform {
    margin: 2em 0
}   
.containerList {
    min-height: 80vh
}
.containerList > h1 {
    margin-top: 100px;
} 
.containerList .filterContainer {
    display: flex;
margin-left: 10%;
}
.containerList .filterContainer form {
    margin-top: 60px;
}
.containerList .filterContainer form .form-group{
    display: flex;
    justify-content: flex-start;
    text-align: left;
    margin: 10px 0;
}
.filterPers input {
    width: 30px;
    margin: 0 5px;
}
.filterform .form-group label:nth-of-type(1) {
    width: 200px
}
</style>

