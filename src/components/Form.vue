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

                <formIngredient v-for="(ingredient, index) in recipe.ingredients" :key="ingredient.id" v-on:emitIndex="findIndexIngredient(index)" :index="index" :recipe="recipe" v-on:emitIngredient="changeData"/>

            <!--    <ul>
                    <li v-for="(ingredient, index) in recipe.ingredients" :key="ingredient.id" :index="index">
                        <input type="number" v-model="recupNumber">
                        <select name="" v-model="recupType" id="">
                        <option value=""></option>
                        <option value="ml">ml</option>
                        <option value="cl">cl</option>
                        <option value="l">l</option>
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        </select>
                        <input type="text" v-model="recipe.ingredients[index][1]">
                    </li>
                </ul>-->
            </div>
            <input type="button" value="Ajouter un ingrédient" @click.prevent="addIngredient">
        </div>

        <div class="form-group">
            <label for="etape">Liste des étapes</label>
            <div class="form-etapes">
            <textarea name="etape" id="etape" cols="30" rows="10" v-for="(etape, index) in recipe.etapes" :key="etape.id" v-model="recipe.etapes[index]"></textarea>
            </div>
            <input type="button" value="Ajouter une étape" @click.prevent="addEtape">
        </div>
        <div class="form-group">
            <label for="photo">Url de la photo</label>
            <input type="url" id="photo" v-model="recipe.photo">
        </div>

        <input type="submit" value="Envoyer">

        <p>{{recipe.ingredients}}</p>
    </form>
</template>

<script>
import formIngredient from './FormIngredient.vue'
import { required, alpha, url, numeric, alphaNum } from "vuelidate/lib/validators";
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
      titre: "",
          description: {required, alpha},
          niveau: {required, numeric},
          personnes: {required, numeric},
          tempsPreparation: {required, numeric},
          etapes: {required, alpha},
          ingredients: {required, alphaNum},
          photo: {url},
  },
      computed: {
        /*recupNumber: function(){
            var ingr = this.recipe.ingredients[3][0]
            var number = 12;
            ingr = ingr.split('');
            for(var i=0;i<ingr.length;i++){
                if(isNaN(ingr[i]) === false){
                    number = number + ingr[i]
                }
            }
console.log(ingr)
            return (ingr)
        },
        recupType: function(){
           /* var ingr = this.recipe.ingredients[this.index][0]
            ingr = ingr.split('');
            var type = '';
            for(var i=0;i<ingr.length;i++){
                if(isNaN(ingr[i]) === true){
                    type = type + ingr[i]
                }
            }
            return (type)
        },*/
        
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
        this.$emit('send', this.recipe)
        },
        findIndexIngredient: function(value){
            this.indexIngredient = value
        },
        changeData: function(value){
            this.recipe.ingredients[this.indexIngredient] = value;
        }
    }
}
</script>

<style>

</style>