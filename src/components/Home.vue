<template>
<section>
    <header>
        <h1>Cantina</h1>
        <h2>Le site qui vous donnera la force de concocter des bons petits plats</h2>
        <a href="#homeDiv"><img src="../assets/down-arrow.png" alt=""></a>
    </header>
    <div class="homeDiv" id="homeDiv">
        <h1>Qu'est ce que Cantina ?</h1>
        <div>
            <p>Vous êtes sur le site de cuisine directement inspiré de la culture geek dans le sens large du terme. Apprenez à créer les recettes de vos films et séries préférées. Et soyez sur que toutes les recettes ont obtenu 5 étoiles noires au guide du patrouilleur.</p>
            <div v-on:click='goToList'><h1>Consulter la liste des recettes</h1></div>
        </div>
        <div>
            <div v-on:click='goToAdd'><h1>Créer une recette</h1></div>
            <p>Mais vous pouvez également créer vous même vos propres recettes ! Réveillez le pouvoir de la cuisine qui sommeille en vous et libérer votre créativité !</p>
        </div>
    </div>
    <footer>
        Contact : 0600000000<br>Mail : cantina@gmail.com
    </footer>
    </section>
</template>

<script>

export default {
    name: 'home',
  methods: {
      goToList: function(){
          this.$router.replace('/list')
      },
      goToAdd: function(){
          this.$router.replace('/addRecipe')
      }
  }
}
</script>

<style>
    header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('../assets/starwars-etoilenoire.jpg');
    background-size: cover;
    background-position: center
}
header h1, header h2 {
    margin: 0;
        margin-bottom: 50px;
        color: white;
        text-shadow: 1px 1px 1px black

}
header h1 {
    padding-top: 40vh
}
header img {
    height: 80px;
}
header a { 
    margin-top: auto;
    padding-bottom: 40px;
}
.homeDiv {
    padding: 0 10%
}
.homeDiv > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center
}
.homeDiv > div:nth-of-type(1) div {
    background: 
    linear-gradient(
 rgba(0, 0, 0, 0.45), 
 rgba(0, 0, 0, 0.45)
 ),url('http://localhost:9000/images/galacticake.jpg');
    color: white;
    text-shadow: 1px 1px 1px black;
    height: 300px;
    width: 1000px;
    margin-left: 50px;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center
}
.homeDiv > div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center
}
.homeDiv > div:nth-of-type(2) div {
    background: 
    linear-gradient(
 rgba(0, 0, 0, 0.45), 
 rgba(0, 0, 0, 0.45)
 ),url('http://localhost:9000/images/the-organique-naboo.jpg');
    color: white;
    text-shadow: 1px 1px 1px black;
    height: 300px;
    width: 1000px;
    margin-right: 50px;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center
}
footer {
    background-color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: rgb(200,200,200);
    height: 100px;
    margin-top: 100px;
    padding: 0 10%
}

</style>