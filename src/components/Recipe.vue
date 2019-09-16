<template>
    <div>
        <h1>{{recipe.titre}}</h1>
        <p>{{recipe.description}}</p>
        <img :src="recipe.photo" alt="">
        <p>{{recipe.niveau}}</p>
        <p>{{tempsPrep}}</p>
        <p>{{nbPersonne}}</p>
        <h2>Ingrédients : </h2>
        <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">{{ingredient[0]}} {{ingredient[1]}}</li>
        </ul>
        <h2>Etapes : </h2>
        <ul>
            <li v-for="etape in recipe.etapes" :key="etape.id">{{etape}}</li>
        </ul>
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
    }
}
</script>