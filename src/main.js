import { createApp } from "vue";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
import "milligram";

//Create our Router
const router = createRouter({
  // Create a web history
  history: createWebHistory(),
  // inject our routes
  routes,
});

//Create our vue application
const app = createApp(App);

// inject our router into our app
app.use(router);

// Mount our App to the DOM
app.mount("#app");