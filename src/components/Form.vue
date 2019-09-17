<template>
    <form class="recipeForm" @submit.prevent="onSubmit">

        <div class="form-group">
            <label for="titre">Titre de la recette :</label>
            <input type="text" id="titre" v-model="$v.recipe.titre.$model">
            <span v-if="$v.recipe.titre.$dirty && !$v.recipe.titre.required">Le champs est requis</span>
            <span v-if="!$v.recipe.titre.minLength">Le champs nécessite 3 caractères minimum</span>
        </div>

        <div class="form-group">
            <label for="description">Description courte de la recette</label>
            <input type="text" id="description" v-model="$v.recipe.description.$model">
            <span v-if="$v.recipe.description.$dirty && !$v.recipe.description.required">Le champs est requis</span>
            <span v-if="!$v.recipe.description.minLength">Le champs nécessite 5 caractères minimum</span>
        </div>

        <div class="form-group">
            <label for="niveau">Niveau : </label>
            <select name="niveau" id="niveau" v-model="$v.recipe.niveau.$model">
                <option value="padawan">padawan</option>
                <option value="jedi">jedi</option>
                <option value="maitre">maitre</option>
            </select>
            <span v-if="$v.recipe.niveau.$dirty && !$v.recipe.niveau.required">Le champs est requis</span>
            <span v-if="!$v.recipe.niveau.minValue">La valeur doit être supérieure à 0</span>
        </div>

        <div class="form-group">
            <label for="nbrPers">Nombre de personnes</label>
            <input type="number" id="nbrPers" v-model.number="$v.recipe.personnes.$model">
            <span v-if="$v.recipe.personnes.$dirty && !$v.recipe.personnes.required">Le champs est requis</span>
            <span v-if="!$v.recipe.personnes.minValue">La valeur doit être supérieure à 0</span>
        </div>

        <div class="form-group">
            <label for="tmpsPrep">Temps de préparation ( en minutes )</label>
            <input type="number" id="tmpsPrep" v-model.number="$v.recipe.tempsPreparation.$model">
            <span v-if="$v.recipe.tempsPreparation.$dirty && !$v.recipe.tempsPreparation.required">Le champs est requis</span>
        </div>

        <div class="form-group">
            <label for="ingredients" class="labelIngr">Ingrédients : </label>
            <div id="form-ingredients">

                <formIngredient v-for="(ingredient, index) in recipe.ingredients" :key="index" v-on:emitIndex="findIndexIngredient(index)" :index="index" :recipe="recipe" v-on:emitIngredient="changeData"/>
            </div>
            <input type="button" value="Ajouter un ingrédient" @click.prevent="addIngredient">
        </div>

        <div class="form-group">
            <label class="labelEtape" for="etape">Liste des étapes :</label>
            <div class="form-etapes">
                <ul>
                    <li v-for="(etape, index) in recipe.etapes" :key="index">
                        <textarea name="etape" id="etape" cols="90" rows="5" v-model="recipe.etapes[index]" ></textarea>
                        <button @click.prevent="supprEtape(index)">supprimer</button>
                    </li>
                </ul>
            
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
import { required, alpha, url, numeric, alphaNum, minLength ,minValue } from "vuelidate/lib/validators";
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
          ingredients: ["",""],
          photo: "",
        };
      }
    }
  },
  validations: {
      recipe: {
          titre: {required, minLength: minLength(3)},
          description: {required, minLength: minLength(5)},
          niveau: {required, minValue: minValue(1)},
          personnes: {required, numeric, minValue: minValue(1)},
          tempsPreparation: {required, numeric},
          photo:{url},
          etapes: {minLength: minLength(1)}
      }
  },
    components: {
        formIngredient
    },
    methods: {
        addIngredient: function(){
            this.recipe.ingredients.push(["",""]);
        },
        addEtape: function(){
            this.recipe.etapes.push("")
        },
        onSubmit: function() {
        if(this.$v.recipe.$invalid){
        alert('Certains champs sont mal remplis ou sont manquants')
        return this.$v.recipe.$touch();
        }
        if(this.recipe.photo === ""){
            this.recipe.photo = "../assets/assietteBase.png"
        }
        this.$emit('send', this.recipe)
        },
        findIndexIngredient: function(value){
            this.indexIngredient = value
        },
        changeData: function(value){
            this.recipe.ingredients[this.indexIngredient] = value;
        },
        supprEtape: function(index){
            this.recipe.etapes.splice(index,1)
        }
    }
}
</script>

<style>
    .recipeForm {
        text-align: left;
        padding: 0 20%;
        margin-top: 50px;

    }
    .form-group {
        margin: 10px 0
    }
    .form-group label {
        width: 300px;
        display: inline-block;
    }
    .form-group input {
        height: 20px;
        padding: 2px;
    }
    .form-group ul li {
        list-style-type: none;
        display: flex;
        align-items: center;
        margin: 10px
    }
    .form-etapes ul li button {
        margin-left: 10px;
        width: 100px
    }
    .labelEtape, .labelIngr {
        font-weight: 800
    }
</style>