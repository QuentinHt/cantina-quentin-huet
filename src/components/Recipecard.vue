<template>
    <article class="recipecard">
        <div class="row1">
            <h1>{{recipe.titre}}</h1>
            <p>{{recipe.personnes}}<img src="../assets/avatar.png"></p>
        </div>
        <img :src="recipe.photo" alt="">
        <p>Difficulté : {{recipe.niveau}}</p>
        <p>Temps de préparation : {{tempsPrep}}</p>
        <div class="rowButton">
            <router-link :to="`/edit/${recipe.id}`" class="btn btn-small" @click.prevent="onEdit">Modifier</router-link>
            <a href="#" class="btn btn-small" @click.prevent="onDelete">Supprimer</a>
        </div>
            </article>
</template>
<script>
export default {
    name: 'Recipecard',

    props : {
        recipe : {
            type: Object,
            required: true
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
        }
    },
    methods: {
        onDelete : function(){
            this.$emit('delete', this.recipe)
        },
        onEdit: function(){
            this.$emit('edit', this.recipe)
        }
    }
}
</script>
<style>
    .recipecard {
        border: 1px solid black;
    }
    .recipecard .row1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px
    }
    .recipecard .row1 h1 {
        margin: 0
    }
    .recipecard .row1 p {
        margin: 0
    }
    .recipecard .row1 > p img {
        height: 24px
    }
    .recipecard > img {
        height: 400px
    }
</style>
