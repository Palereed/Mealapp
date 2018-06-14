<template>
	<div class="cartcontrol">
    <transition name="translate">
  		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart">
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="increaseCart"></div>
	</div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props:{
      food :{
      	type: Object
      }
    },
    methods: {
      increaseCart () {
      	if ( !this.food.count ) {
          Vue.set(this.food, 'count', 1)
     		} else {
      	  this.food.count ++
      	}
        this.$emit('add', event.target);
      },
      decreaseCart () {
        if ( this.food.count ) {
          this.food.count --
        }
      }
    }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      vertical-align: top
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transform: translateX(0) rotate(0)
      &.translate-enter-active, &.translate-leave-active
        transition: all 0.2s linear
      &.translate-enter, &.translate-leave-to
        opacity: 0
        transform: translateX(24px) rotate(180deg)
     .count
      display: inline-block
      vertical-align: top
      padding-top: 6px
      width: 12px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-increase
      display: inline-block
      vertical-align: top
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)  
</style>