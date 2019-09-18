<template>
    <form class="recipeForm" @submit.prevent="onSubmit">

        <div class="form-group">
                    <h1 class="labelIngr">Informations générales : </h1>

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
            <span v-if="!$v.recipe.tempsPreparation.minValue">La valeur doit être supérieure à 0</span>
        </div>

        <div class="form-group">
            <label for="photo">Url de la photo</label>
            <input type="url" placeholder='url' id="photo" v-model="recipe.photo">
        </div>

        <div class="form-group">
            <h1 class="labelIngr">Ingrédients : </h1>
            <div id="form-ingredients">

                <formIngredient v-for="(ingredient, index) in recipe.ingredients" :key="index" v-on:emitIndex="findIndexIngredient(index)" :index="index" :recipe="recipe" v-on:emitIngredient="changeData"/>
            </div>
            <input type="button" value="Ajouter un ingrédient" @click.prevent="addIngredient">
        </div>

        <div class="form-group">
            <h1 class="labelEtape">Liste des étapes :</h1>
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

        <input type="submit" value="Envoyer" class="inputSubmit">

    </form>
</template>

<script>
import formIngredient from './FormIngredient.vue'
import { required, numeric, minLength ,minValue } from "vuelidate/lib/validators";
export default {
    data: function() {
        return {
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
          photo: "",
        };
      }
    }
  },
  validations: {
      recipe: {
          titre: {required, minLength: minLength(3)},
          description: {required, minLength: minLength(5)},
          niveau: {required},
          personnes: {required, numeric, minValue: minValue(1)},
          tempsPreparation: {required, numeric, minValue: minValue(1)},
          etapes: {required, minLength: minLength(1)},
          ingredients: {required, minLength: minLength(1)},
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
            this.recipe.photo = "https://cdn-media.rtl.fr/cache/Jy-PbLy706HiAsJZQK0OYQ/880v587-0/online/image/2016/1214/7786282730_l-etoile-noire-super-arme-destructrice-de-l-empire-galactique.PNG"
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
        padding: 0 10%;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center
    }
    .recipeForm .form-group {
        margin: 10px 0;
        text-align: left;
        width: 460px
    }
    .recipeForm .form-group h1 {
        margin-top: 30px;
    }
    .recipeForm .form-group label {
        width: 300px;
        display: inline-block;
    }
    .recipeForm .form-group input {
        height: 20px;
        padding: 2px;
        width: 150px
    }
    .recipeForm .form-group select {
        widows: 150px;
        height: 20px
    }
    .recipeForm .form-group ul li {
        list-style-type: none;
        display: flex;
        align-items: center;
        margin: 10px 10px 10px 0
    }
    .recipeForm .form-etapes ul li button {
        margin-left: 10px;
        width: 100px
    }
    .recipeForm .form-etapes ul {
        padding: 0
    }
    .recipeForm .labelEtape, .labelIngr {
        font-weight: 800
    }
    .recipeForm .inputSubmit {
        width: 100px;
    }
    .recipeForm span {
        color: red
    }
</style>