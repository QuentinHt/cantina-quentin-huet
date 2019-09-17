<template>
    <div class="recipeSolo">
        <h1>{{recipe.titre}}</h1>
        <p>{{recipe.description}}</p>
        <p> Niveau : {{recipe.niveau}}</p>
        <div class="containerTempsPers"><p>{{tempsPrep}}</p><p>{{nbPersonne}}</p></div>
        <div class="containerImageIngr">
            <div :style="'background-image: url('+recipe.photo+'); background-size: cover; background-position: center'"></div>
        <ul>
            <h1>Ingrédients : </h1>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">{{ingredient[0]}} {{ingredient[1]}}</li>
        </ul>
        </div>        
        <h2>Etapes : </h2>
        <ul>
            <li v-for="etape in recipe.etapes" :key="etape.id">{{etape}}</li>
        </ul>
        <div class="rowButton">
            <img src="../assets/writing-black.png" alt="" @click.prevent="onEdit">
            <img src="../assets/delete-black.png" alt="" @click.prevent="deleteRecipe">
        </div>
    </div>
</template>

<script>

import UserService from '../services/UserService.js'

export default {
    name: 'Recipe',
    data: function() {
        return {
            recipe: '',
        }
    },
    computed: {
        tempsPrep: function(){
            let tempsMinute = this.recipe.tempsPreparation
            if (tempsMinute >= 60){
                var nbHour = parseInt(tempsMinute / 60);
			    var nbminuteRestante = (tempsMinute % 60);
                let tempsHeureMinute = nbHour + 'h' + nbminuteRestante
                return tempsHeureMinute
            }
            else {
                return (tempsMinute + ' minutes')
            }
        },
        nbPersonne: function(){
            let nbPersonne = this.recipe.personnes
            if(nbPersonne > 1){
                return (nbPersonne + ' personnes')
            }
            else {
                return (nbPersonne + ' personne')
            }
        }
    },                             
    created: function(){
        UserService
        .fetchOne(this.$route.params.id)
        .then(recipe => {
            this.recipe = recipe;
        })
    },
    methods: {
                deleteRecipe: function(recipeToDelete){
                    console.log(recipeToDelete)
                  recipeToDelete = this.recipe
                    UserService.deleteRecipe(recipeToDelete).then(res => {
                    let index = recipeToDelete.id;
                    if (index > -1){
                        this.recipesList.splice(index, 1);
                        this.$router.replace(`/list`)
                    }
                })
            .catch(errorMessage => alert(errorMessage))
        },
        onEdit: function(){
            this.$emit('edit', this.recipe);
            this.$router.replace(`/edit/${this.recipe.id}`)
        },
    }
}
</script>

<style>
.recipeSolo h1 {
    margin-top: 100px;
}
.recipeSolo > div {
    display: flex;
    justify-content: space-around
}
.recipeSolo .containerTempsPers {
    width: 40%;
    display: flex;
    justify-content: space-between;
    margin-left: 5%
}
.recipeSolo > .containerImageIngr >div, .recipeSolo > .containerImageIngr ul {
    width: 40%;
}
.recipeSolo > .containerImageIngr >div{
    height: 550px
}
.recipeSolo > .containerImageIngr ul {
    text-align: left
}
.recipeSolo > .containerImageIngr ul li {
    list-style-type: none;
    text-align: left
}
.recipeSolo > ul li {
    list-style-type: 'square';
    padding: 10px 0
}
.recipeSolo > ul {
    width: 50%;
    margin-left: 25%;
    padding: 0
}
.recipeSolo .rowButton{
    display: flex;
    justify-content: space-around;
    margin-top: 50px
}
.recipeSolo .rowButton img {
    height: 64px;
    cursor: pointer
}
</style>