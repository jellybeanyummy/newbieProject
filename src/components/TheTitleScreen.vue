<template>
  <transition name="fade">
    <div class="title-screen">
      <img src="../../public/blackjack.svg" class="img">
      <div class="line">
      <button class="butt" onClick="click();">Login</button>
      </div>
    </div>
  </transition>
</template>

<script>
import GameLogo from './GameLogo'
function click() {
  this.$router.push('/login');
}
export default {
  components: {
    GameLogo
  }, 
  mounted () {
    setTimeout(() => { this.$store.dispatch('startNewGame') }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.title-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
  transition: all 0.2s;
  z-index: 200;
  background: $secondary-color;
  color: $gold;
}
.img {
  -webkit-filter: invert(1);
  filter: invert(1);
  height: 50%;
  width: 50%;
}
.line {
  padding: 2em;
}
button,
button::after {
  -webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
  -o-transition: all 0.3s;
	transition: all 0.3s;
}
button {
  background: none;
  border: 3px solid #fff;
  border-radius: 5px;
  color: #fff;
  display: block;
  font-size: 1em auto;
  font-weight: bold;
  //margin: 1em auto;
  padding: 1em 2em;
  position: relative;
  text-transform: uppercase;
}

button::before,
button::after {
  background: #fff;
  content: '';
  position: absolute;
  z-index: -1;
}

button:hover {
  color: $secondary-color;
}
.butt::after {
  height: 0;
  left: 0;
  top: 0;
  width: 100%;
}

.butt:hover:after {
  height: 100%;
}
@media (max-width: 1023px) {
  #logo {
    width: 90%;
  }
}
#logo {
  width: 45%;
}
@media (max-width: 1023px) {
  #orbits {
    width: 40%;
  }
}
#orbits {
  width: 20%;
  opacity: 0.25;
  margin: 2rem;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
