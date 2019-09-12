<template>
    <div>
        <h1>{{recipe.titre}}</h1>
        <p>{{recipe.description}}</p>
        <img :src="recipe.photo" alt="">
        <p>{{recipe.niveau}}</p>
        <p>{{recipe.tempsPreparation}}</p>
        <p>{{recipe.personnes}}</p>
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
            recipe: null,
            id: 3
        }
    },                             
    created: function(){
        UserService
        .fetchOne(this.$route.params.id)
        .then(recipe => {
            this.recipe = recipe;
            console.log(this.recipe)
        })
    }
}
</script>