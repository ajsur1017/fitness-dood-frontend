<template>
  <div class="app">
    <h1 id="title">fitness<span id="titleSpan">DOOD</span></h1>
    <div class="menu-wrap">
      <input type="checkbox" class="toggler" />
      <div class="hamburger"><div></div></div>
      <div class="menu">
        <div>
          <div>
            <ul>
              <li><a href="http://localhost:8080/">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <header class="showcase">
      <div class="container showcase-inner">
        
        <div id="heading">
          
          <router-view :posts="posts" :url="url" :getPosts="getPosts" />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"; // Import Composition API Hooks
// ref hook allows use to create reactive variables
// onMounted let's us execute code when component mounts

export default {
  name: "App",
  // Setup property allows us to use new composition api to define properties/methods
  // Returns an object with any properties/methods the component should have
  setup(props) {
    // variable with base url for API calls
    // const url = "https://fitness-dood.herokuapp.com/notes/";
    const url = "https://to-do-ga.herokuapp.com/todos/";
    // ref for holding all the posts
    const posts = ref([]);
    // method for getting posts
    const getPosts = async () => {
      const response = await fetch(url);
      const data = await response.json();
      posts.value = await data;
    };
    //run getPosts once when component loads
    onMounted(() => getPosts());
    // return component properties and methods
    return {
      posts,
      getPosts,
      url,
      ...props,
    };
  },
};
</script>

<style>
.app {
  text-align: center;
}

#title {
  font-size: 70px;
  background-color: black;
  font-family: cursive;
  height: 120px;
  padding: 10px;
  margin: 0 auto;
}
#titleSpan {
  font-size: 50px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: white;
}

/* HAMBURGER */
:root {
  --primary-color: rgba(114, 134, 141, 0.7);
  --overlay-color: rgba(24, 39, 51, 0.85);
  --menu-speed: 0.75s;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  line-height: 1.4;
}
.container {
  max-width: 960px;
  margin: auto;
  overflow: hidden;
  padding: 0 3rem;
}
.showcase {
  background-color: var(--primary-color);
  color: white;
  height: 100vh;
  position: relative;
}
.showcase:before {
  content: "";
  background: url("./assets/267434.jpeg") no-repeat center center/cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.showcase .showcase-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}
.showcase h1 {
  font-size: 5rem;
}
.showcase p {
  font-size: 1.8rem;
}
.btn {
  display: inline-block;
  border: none;
  background-color: var(--primary-color);
  color: #fff;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  text-decoration: none;
  transition: opacity 1s ease-in;
}
.btn:hover {
  opacity: 0.7;
}
/* MENU */
.menu-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.menu-wrap .toggler {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  width: 50px;
  height: 50px;
  opacity: 0;
}
.menu-wrap .hamburger {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 60px;
  height: 60px;
  padding: 1rem;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* MENU LINES */
.menu-wrap .hamburger > div {
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}
.menu-wrap .hamburger > div:before,
.menu-wrap .hamburger > div:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: -10px;
  width: 100%;
  height: 2px;
  background: inherit;
}
.menu-wrap .hamburger > div:after {
  top: 10px;
}
/* TOGGLE ANIMATION */
.menu-wrap .toggler:checked + .hamburger > div {
  transform: rotate(135deg);
}
.menu-wrap .toggler:checked + .hamburger > div:before,
.menu-wrap .toggler:checked + .hamburger > div:after {
  top: 0;
  transform: rotate(90deg);
}
/* rotate on hover when checked */
.menu-wrap .toggler:checked:hover + .hamburger > div {
  transform: rotate(225deg);
}
/* show menu */
.menu-wrap .toggler:checked ~ .menu {
  visibility: visible;
}
.menu-wrap .toggler:checked ~ .menu > div {
  transform: scale(1);
  transition: var(--menu-speed);
}
.menu-wrap .toggler:checked ~ .menu > div > div {
  opacity: 1;
  transition: opacity 0.4s ease;
}
.menu-wrap .menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-wrap .menu > div {
  background: var(--overlay-color);
  border-radius: 20%;
  width: 200vw;
  height: 200vw;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: all 0.4s ease;
}
.menu-wrap .menu > div > div {
  text-align: center;
  max-width: 90vw;
  max-height: 100vh;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.menu-wrap .menu > div > div > ul > li {
  list-style: none;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem;
}
.menu-wrap .menu > div > div > ul > li > a {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.4s ease;
}
</style>