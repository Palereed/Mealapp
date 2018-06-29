<template>
  <div class="ratingselect">
    <div class="rating-type">
     <span @click="select(2)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleConent" class="switch" :class="{'active':onlyContent === true}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<!-- <script type="text/ecmascript-6"> -->
<script>
	const ALL = 2;
  const NEGATIVE = 1;
  const POSITIVE = 0;
  export default{
  	props:{
  		ratings: {
  			type: Array,
  			default() {
  				return []
  			}
  		},
  		selectType: {
  			type: Number,
  			default: ALL
  		},
  		onlyContent: {
  			type: Boolean,
  			default: false
  		},
  		desc: {
  			type: Object,
  			default (){
  				return {
  					all: "全部",
  					positive: "满意",
  					negative: "不满意"
  				}
  			}
  		}
  	},
  	computed: {
  		positives () {
        return this.ratings.filter( (rating) => {
        	return rating.rateType === POSITIVE 
        })
  		},
  		negatives () {
        return this.ratings.filter( (rating) =>{
          return rating.rateType === NEGATIVE
        })
  		}
  	},
  	methods:{
  		select (type) {
  			this.$emit('select', type);
  		},
  		toggleConent (){
  			this.$emit('toggle');
  		}
  	}
  }
</script>
<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px( rgba(7, 17, 27, 0.1) )
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        color: rgb(77, 80, 93)
        font-size: 12px
        line-height: 16px
        &.active
          color: #fff
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 80, 93, 0.2) 
          &.active
            background: rgb(77, 80, 93)
        .count
          margin-left: 2px 
          font-size: 8px
    .switch
      padding: 12px 18px
      color: rgb(147, 153, 159)
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.2)
      display: flex
      &.active
        .icon-check_circle
          color: #00c835
      .icon-check_circle
        font-size: 24px
        item-align: center
        margin-right: 4px
      .text
        font-size: 12px
        item-align: center
</style>