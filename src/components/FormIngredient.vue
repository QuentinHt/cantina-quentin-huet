<template>
    <form class="form-ingredient">
                <input type="number" v-model="ingredientNumber" v-on:keyup="emitIngredient">
                <select name="" id="" v-model="ingredientType" v-on:click="emitIngredient">
                    <option value=""></option>
                    <option value="ml">ml</option>
                    <option value="cl">cl</option>
                    <option value="l">l</option>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                </select>
                <input type="text" v-on:keyup="emitIngredient" v-model="ingredientName">
    </form>
</template>

<script>
export default {
    name: 'formIngredient',
    data: function() {
        return {
            test: 'test',
            ingredientNumber: this.recupNumber(),
            ingredientType: this.recupType(),
            ingredientName: this.recipe.ingredients[this.index][1],
        }
    },
    props : {
        recipe : {
            type: Object,
            required: true
        },
        index: {
            type: Number,
        }
    },
    computed: {

        ingredient: function(){
            console.log(this.recupType)
            if(this.recupType != undefined){
                console.log(this.recupNumber + this.recupType, this.ingredientName)
                return [this.ingredientNumber + this.ingredientType, this.ingredientName]
            }
            else {
                return [this.recupNumber, this.ingredientName]
            }
        },

    },
    methods: {
        emitIndex (){
            this.$emit('emitIndex')
        },
        emitIngredient (event, indexIngredient){
            this.$emit('emitIndex', indexIngredient)
            this.$emit('emitIngredient', this.ingredient);
            console.log(this.recipe.ingredients[this.index][0])
        },
        supprIngr (){
            console.log(this.index)
            console.log(this.recipe.ingredients[this.index])
            this.recipe.ingredients.splice(this.index,1)
        },
            recupNumber: function(){
            if(this.recipe.description != ''){
                            var ingr = this.recipe.ingredients[this.index][0]
            ingr = ingr.split('');
            var number = '';
            for(var i=0;i<ingr.length;i++){
                if(isNaN(ingr[i]) === false){
                    number = number + ingr[i]
                }
            }
            return (number)
            }
            else {
                return ''
            }
        },
        recupType: function(){
            if(this.recipe.description != ''){
            var ingr = this.recipe.ingredients[this.index][0]
            ingr = ingr.split('');
            var type = '';
            for(var i=0;i<ingr.length;i++){
                if(isNaN(ingr[i]) === true){
                    type = type + ingr[i]
                }
            }
            return (type)
            }
            else {
                return ''
            }
        },
    }
}
</script>