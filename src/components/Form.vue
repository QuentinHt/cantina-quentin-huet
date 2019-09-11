<template>
    <form class="userform" @submit.prevent="onSubmit">

        <div class="form-group">
            <label for="titre">Titre de la recette :</label>
            <input type="text" id="titre">
        </div>

        <div class="form-group">
            <label for="description">Description courte de la recette</label>
            <input type="text" id="description">
        </div>

        <div class="form-group">
            <label for="niveau">Niveau : </label>
            <select name="niveau" id="niveau">
                <option value="padawan">padawan</option>
                <option value="jedi">jedi</option>
                <option value="maitre">maitre</option>
            </select>
        </div>

        <div class="form-group">
            <label for="nbrPers">Nombre de personnes</label>
            <input type="number" id="nbrPers">
        </div>

        <div class="form-group">
            <label for="tmpsPrep">Temps de préparation ( en minutes )</label>
            <input type="number" id="tmpsPrep">
        </div>

        <div class="form-group">
            <label for="ingredients">Ingrédients : </label>
            <div id="form-ingredients">
                <formIngredient v-for="ingredient in nbIngredient" :key="ingredient.id"/>
            </div>
            <input type="button" value="Ajouter un ingrédient" @click.prevent="addIngredient">
        </div>

        <div class="form-group">
            <label for="etape">Liste des étapes</label>
            <div class="form-etapes">
            <textarea name="etape" id="etape" cols="30" rows="10" v-for="etape in nbEtape" :key="etape.id"></textarea>
            </div>
            <input type="button" value="Ajouter une étape" @click.prevent="addEtape">
        </div>
    </form>
</template>

<script>
import formIngredient from './FormIngredient.vue'
export default {
    data: function() {
        return {
            nbIngredient : [0,0,0],
            nbEtape : [0,0]
        }
    },
    components: {
        formIngredient
    },
    methods: {
        addIngredient: function(){
            this.nbIngredient.push(0)
        },
        addEtape: function(){
            this.nbEtape.push(0)
        }
    }
}
</script>

<style>

</style>