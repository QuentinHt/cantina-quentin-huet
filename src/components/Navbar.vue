<template>
    <nav class="navbar">
            <div class="container">
                <img src="../assets/lightsaber.png" alt="">
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Ajouter une recette</a></li>
                </ul>
            </div>
        </nav>
</template>

<style>
.navbar {
    background-color:black;
    overflow: hidden;
    margin-bottom: 3em;
    position: absolute;
    width: 100%
}
.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%
}
.navbar>.container ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
}
.navbar .container ul li {
    list-style-type: none 
}
.navbar a:link,
.navbar a:visited {
    color: white;
    text-decoration: none;
    display: inline-block;
    padding: 0.75em 1em;
    transition: all 150ms;
    transform: scale(1);
}

.navbar a:hover {
    background-color: rgb(50,50,50);
    transform: scale(1.05);
}

.navbar a.router-link-exact-active {
    background-color: #128953;
}

.navbar a:active {
    transition: none;
    color: #128953;
    background-color: #82f9c3
}

.navbar a:last-of-type {
    margin-left: auto;
}
.navbar img {
    height: 40px
}
</style>
