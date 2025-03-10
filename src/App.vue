<template>
  <main>
    <RouterView />
  </main>
</template>
<script>

export default {
  name: 'App',
}
</script>

<style>
:root {
  --rosewater: #f5e0dc;
  --flamingo: #f2cdcd;
  --pink: #f5c2e7;
  --mauve: #cba6f7;
  --red: #f38ba8;
  --maroon: #eba0ac;
  --peach: #fab387;
  --yellow: #f9e2af;
  --green: #a6e3a1;
  --teal: #94e2d5;
  --sky: #89dceb;
  --sapphire: #74c7ec;
  --blue: #89b4fa;
  --lavender: #b4befe;
  --text: #cdd6f4;
  --subtext-1: #bac2de;
  --subtext-0: #a6adc8;
  --overlay-2: #9399b2;
  --overlay-1: #7f849c;
  --overlay-0: #6c7086;
  --surface-2: #585b70;
  --surface-1: #45475a;
  --surface-0: #313244;
  --base: #1e1e2e;
  --mantle: #181825;
  --crust: #11111b;

  background: var(--base);
  color: var(--mauve);
}
input {
  all: unset;
}
select {
  all: unset;
}
option {
  all: unset;
}
a {
  color: var(--blue);
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0
}
nav {
  display: flex;
  flex-direction: column;
}
.nav-container {
  display: grid;
  gap: 1rem;
}
</style>
