<template>
  <AppHeader />
  <main class="route">
    <RouterView />
  </main>
  <UserMsg />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import UserMsg from '@/components/UserMsg.vue'

export default {
  components: {
    AppHeader,
    UserMsg
  }
}

</script>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

.route {
  padding: 10px;
  min-height: calc(90vh - 4rem);
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
