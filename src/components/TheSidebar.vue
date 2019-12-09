<template>
  <aside class="sidebar" :class="{ 'open': showDrawer }">
    <img src="../../public/blackjack.svg" class="img">
    <div class="footer">
      <p>
        <a
          href="https://github.com/jellybeanyummy/newbieProject"
          title="GitHub page"
          target="_blank"
        >
          GitHub page
        </a>
      </p>
    </div>
  </aside>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import GameLogo from './GameLogo'
export default {
  components: {
    GameLogo
  },
  computed: {
    ...mapState({
      showDrawer: state => state.showDrawer,
      showBasicStrategy: state => state.settings.showBasicStrategy
    })
  },
  methods: {
    closeDrawer () {
      this.$store.commit('toggleDrawer', { show: false })
    },
    ...mapMutations([ 'toggleBasicStrategy' ])
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex !important;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  font-size: 1rem;
  color: $white;
  z-index: 100;
  background: $secondary-color;
  height: 100%;
  transition: transform 0.2s ease-in;
}
.img {
  -webkit-filter: invert(1);
  filter: invert(1);
  height: 50%;
  width: 50%;
}
@media (max-width: 1199px) {
  .sidebar {
    position: absolute;
    transform: translateX(-320px);
  }
  .sidebar.open {
    transform: translateX(0px);
  }
}
.tagline {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
.sidebar #logo {
  width: 85%;
}
.sidebar p {
  margin: 1rem 0;
  text-align: center;
}
.sidebar p a {
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.sidebar p a:hover {
  border-color: $white;
}
.toggle {
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  color: #fff;
  cursor: pointer;
  padding: 1rem;
  opacity: 0.85;
  font-size: 1.2rem;
}
.toggle:hover {
  opacity: 1;
}
.toggle svg {
  height: 24px;
  width: 24px;
  padding-right: 8px;
}
.footer {
  position: absolute;
  bottom: 0;
  opacity: 0.85;
  font-size: 1.5em;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
}
</style>
