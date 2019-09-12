<template>
    <form class="userform" @submit.prevent="onSubmit">

        <div class="form-group">
            <label for="titre">Titre de la recette :</label>
            <input type="text" id="titre" v-model="recipe.titre">
        </div>

        <div class="form-group">
            <label for="description">Description courte de la recette</label>
            <input type="text" id="description" v-model="recipe.description">
        </div>

        <div class="form-group">
            <label for="niveau">Niveau : </label>
            <select name="niveau" id="niveau" v-model="recipe.niveau">
                <option value="padawan">padawan</option>
                <option value="jedi">jedi</option>
                <option value="maitre">maitre</option>
            </select>
        </div>

        <div class="form-group">
            <label for="nbrPers">Nombre de personnes</label>
            <input type="number" id="nbrPers" v-model.number="recipe.personnes">
        </div>

        <div class="form-group">
            <label for="tmpsPrep">Temps de préparation ( en minutes )</label>
            <input type="number" id="tmpsPrep" v-model.number="recipe.tempsPreparation">
        </div>

        <div class="form-group">
            <label for="ingredients">Ingrédients : </label>
            <div id="form-ingredients">
                <formIngredient v-for="(ingredient, index) in ingredientsBase" :key="ingredient.id" v-on:emitIndex="findIndexIngredient(index)" v-on:emitIngredient="changeData"/>
            </div>
            <input type="button" value="Ajouter un ingrédient" @click.prevent="addIngredient">
        </div>

        <div class="form-group">
            <label for="etape">Liste des étapes</label>
            <div class="form-etapes">
            <textarea name="etape" id="etape" cols="30" rows="10" v-for="(etape, index) in etapesBase" :key="etape.id" v-model="recipe.etapes[index]"></textarea>
            </div>
            <input type="button" value="Ajouter une étape" @click.prevent="addEtape">
        </div>
        <div class="form-group">
            <label for="photo">Url de la photo</label>
            <input type="url" id="photo" v-model="recipe.photo">
        </div>

        <input type="submit" value="Envoyer">
    </form>
</template>

<script>
import formIngredient from './FormIngredient.vue'
export default {
    data: function() {
        return {
            nbIngredient : [0,0,0],
            etapesBase: ["",""],
            newEtapes: [""],
            ingredientsBase:[["",""],["",""]],
            newIngredient: [""],
            indexIngredient: null,
        }
    },
    props: {
    recipe: {
      type: Object,
      default: function() {
        return {
          id: null,
          titre: "",
          description: "",
          niveau: "",
          personnes: "",
          tempsPreparation: "",
          etapes: [""],
          ingredients: [""],
          photo: ""
        };
      }
    }
  },
    components: {
        formIngredient
    },
    methods: {
        addIngredient: function(){
            this.ingredientsBase.push(["",""]);
        },
        addEtape: function(){
            this.etapesBase.push("")
        },
        onSubmit: function() {
            console.log(this.recipe)
        this.$emit('send', this.recipe)
        },
        findIndexIngredient: function(value){
            this.indexIngredient = value
        },
        changeData: function(value){
            console.log(this.indexIngredient)
            this.recipe.ingredients[this.indexIngredient] = value;
        }
    }
}
</script>

<style>

</style>