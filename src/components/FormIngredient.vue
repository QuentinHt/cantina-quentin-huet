<template>
    <form class="form-ingredient">
                <input type="number" v-model="ingredientNumber" :parentData='"salut à tous"' v-on:keyup="emitIngredient">
                <select name="" id="" v-model="ingredientType" v-on:click="emitIngredient">
                    <option value=""></option>
                    <option value="ml">ml</option>
                    <option value="cl">cl</option>
                    <option value="l">l</option>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                </select>
                <input type="text" v-model="ingredientName" v-on:keyup="emitIngredient">
    </form>
</template>

<script>
export default {
    name: 'formIngredient',
    data: function() {
        return {
            ingredientNumber: 0,
            ingredientType: '',
            ingredientName: '',
        }
    },
    computed: {
        ingredient: function(){
            return [this.ingredientNumber + this.ingredientType, this.ingredientName]
        }
    },
    methods: {
        emitIndex (){
            this.$emit('emitIndex')
        },
        emitIngredient (event, indexIngredient){
            this.$emit('emitIndex')
            this.$emit('emitIngredient', this.ingredient);
        },
    }
}
</script>