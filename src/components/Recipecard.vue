<template>
    <article class="recipecard" :style="'background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),url('+recipe.photo+'); background-size: cover; background-position: center'">
            <div class="row1" @click.prevent="checkRecipe">
            <p>{{tempsPrep}}</p>
            <p>{{recipe.personnes}}<img src="../assets/avatar.png"></p>
            </div>
            <div class="rowCenter" @click.prevent="checkRecipe"><h1>{{recipe.titre}}</h1>
            <p>Niveau : {{recipe.niveau}}</p>
            </div>
        <div class="rowButton">
            <img src="../assets/writing.png" alt="" @click.prevent="onEdit">
            <img src="../assets/delete.png" alt="" @click.prevent="onDelete">
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
            this.$emit('edit', this.recipe);
            this.$router.replace(`/edit/${this.recipe.id}`)
        },
        checkRecipe: function(){
            this.$router.replace(`/recipe/${this.recipe.id}`)
        }
    }
}
</script>
<style>
    .recipecard {
        border: 1px solid black;
        height: 500px;
        color: white;
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .recipecard .row1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
.recipecard > div {
    padding: 20px
}
    .recipecard .row1 p {
        margin: 0
    }
    .recipecard .row1 > p img {
        height: 24px
    }
.recipecard .rowButton{
    display: flex;
    justify-content: space-around;
}
.recipecard .rowButton img {
    height: 42px;
    cursor: pointer
}
</style>
