<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="item in goods" class="menu-item">
    			<span class="text border-1px">
    			  <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
    	<ul>
    		<li v-for="item in goods" class="food-list">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
	    			<li v-for="food in item.foods" class="food-item border-1px">
	    				<div class="icon">
	    					<img :src="food.icon" width="57" height="57">
	    				</div>
	    				<div class="content">
	    					<h1 class="name">{{food.name}}</h1>
	    					<p class="description">{{food.description}}</p>
	    					<div class="extra">
	    						<span class="sellcount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
	    					</div>
	    					<div class="price">
	    						<span class="now">￥{{food.price}}</span>
	    						<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
	    					</div>
	    				</div>
	    			</li>
    		  </ul>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<!-- <script type="text/ecmascript-6"> -->
<script>
	import BScroll from 'better-scroll';
	const ERR_OK = 0

  export default {
	  props: {
		  seller: {
		    type: Object
		   }
		},
		data () {
			return {
				goods : []
			};
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];

			this.$http.get('api/goods').then(response => {
				response = response.body
				if( response.errno === ERR_OK ){
					this.goods = response.data
					this.$nextTick(() => {
						this._initScroll();
					})
				};
			})
		},
		methods: {
			_initScroll() {
			  this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
			  this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {})
			}
		}
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.goods
		display: flex
		position: absolute
		width: 100%
		top: 174px
		bottom: 46px
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				line-height: 14px
				padding: 0 12px
				&:last-child
					.text
						border-none()
				.text
					display: table-cell
					vertical-align: middle
					font-size: 12px
					border-1px(rgba(7,17,27,0.1))
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 2px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.special
							bg-image('special_3')
						&.invoice
							bg-image('invoice_3')
						&.guarantee
							bg-image('guarantee_3')
		.foods-wrapper
			flex: 1	
			height:100%
			background: #fff
			color: rgb(147, 153, 159)
			.title
				padding-left:14px
				height: 26px
				line-height: 26px
				font-size: 12px
				border-left:2px solid #d9dde1
				background: #f3f5f7
			.food-item
				display:flex
				margin: 18px
				padding-bottom: 18px
				font-size: 10px
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					font-size: 10px
					line-height: 10px
					.name
						margin:2px 0 8px 0
						height: 14px
						line-height: 14px
						font-size: 14px
						color: rgb(7, 17, 27)
					.description
						margin-bottom: 8px
						line-height: 12px
					.extra
						.sellcount
							margin-right:12px
					.price
						font-weight: 700
						line-height: 24px
						margin-left: -2px
						.now
							font-size: 14px
							margin-right: 8px
							color:rgb(240, 20, 20)
						.old
							font-size:10px
							text-decoration:line-through			
							color:rgb(147, 153, 159)
</style>
