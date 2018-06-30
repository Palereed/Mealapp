<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
        <div class="favorite" @click="addFavorite">
          <span class="icon-favorite" :class="{'active':this.favorite}"></span>
          <span class="text">{{isfavorite}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li v-show="seller.supports" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="description">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li v-for="info in seller.infos" class="info-item">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- <script type="text/ecmascript-6"> -->
<script>
  import BScroll from "better-scroll"
  import {saveToLocal,loadFormLocal} from "@/common/js/store"
  import star from "@/components/star/star"
  import split from '@/components/split/split'

  export default {
    data (){
      return {
        favorite: (() => {
          return loadFormLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed:{
      isfavorite(){
        return this.favorite ? "已收藏" : "收藏"
      }
    },
    props:{
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch:{
      'seller'(){
        this.$nextTick(()=>{
          this._initScroll()
          this._initPic()
        })
       }
    },
    mounted(){
      this.$nextTick(()=>{
        this._initScroll()
        this._initPic()
      })
    },
    methods:{
      _initScroll(){
        if( !this.scroll ) {
          this.scroll = new BScroll(this.$refs.seller,{
            click:true
          })
        }
      },
      _initPic() {
        if ( this.seller.pics ){
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick( ()=>{
            if ( !this.picScroll ){
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh()
            }
          })
        } 
      },
      addFavorite(){
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      positon: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .text
          display: inline-block
          margin-right: 12px
          color: rgb(77, 85, 93)
          vertical-align: top
          line-height: 18px
          font-size: 10px
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
    .bulletin 
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)  
      .supports
        li
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &:last-child
            border-none()
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .description
          vertical-align: top
          font-size: 12px
          line-height: 12px
    .pics
      padding: 18px
      .title 
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .pic-wrapper
        width: 100%
        overflow: hidden
        background-repeat: no-repeat
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin-right: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 14px
      .info-item
        padding: 16px 12px
        line-height: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
        &:last-child
          border-none()
    .favorite
      position: absolute
      top: 18px
      right: 11px
      text-align: center
      width: 50px
      .icon-favorite
        display: block
        font-size: 24px
        line-height: 24px
        margin-bottom: 4px
        color: #d4d6d9
        &.active
          color: rgb(240, 20, 20)
      .text
        font-size: 10px
        color: rgb(77, 85, 93)
        line-height: 10px
</style>
