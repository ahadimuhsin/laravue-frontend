<template>
  <div class="product">
    <MyHeader></MyHeader>
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more text-left">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                        <span>Detail</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-pic-zoom">
                                <img class="product-big-img" :src="gambar_default" alt=""/>
                            </div>
                            <div class="product-thumbs" v-if="productDetails.product_galleries.length > 0   ">
                                <carousel class="product-thumbs-track ps-slider" :dots="false" :nav="false">
                                    <div v-for="item in productDetails.product_galleries"
                                    :key="item.id" class="pt" @click="changeImage(item.photo)"
                                    :class="item.photo == gambar_default ? 'active' : ''">
                                        <img :src="item.photo" alt="">
                                    </div>
                                </carousel>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details text-left">
                                <div class="pd-title">
                                    <span>{{productDetails.type}}</span>
                                    <h3>{{productDetails.name}}</h3>
                                </div>
                                <div class="pd-desc">
                                    <p v-html="productDetails.description"></p>
                                    
                                    <h4>Rp {{productDetails.price.toLocaleString('id-ID')}}</h4>
                                </div>
                                <div class="quantity">
                                    <!-- <router-link to="/cart" class="primary-btn pd-cart">Add To Cart</router-link> -->
                                    <!-- <router-link to="/cart"> -->
                                        <a href="#" @click="saveCarts(productDetails.id, productDetails.name, productDetails.product_galleries[0].photo, productDetails.price)" class="primary-btn pd-cart">Add To Cart</a>
                                    <!-- </router-link> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Shop Section End -->
    <related-product></related-product>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from '@/components/Home/Header'
import RelatedProduct from '@/components/Product/RelatedProduct'
import MyFooter from '@/components/Home/Footer'
import carousel from 'vue-owl-carousel'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    MyHeader,
    MyFooter,
    carousel,
    RelatedProduct
  },
  data() {
      return{
      gambar_default: '',
      carts: [],
      productDetails: []
      }
  },
  mounted(){
       if (localStorage.getItem('carts')) {
            try {
                this.carts = JSON.parse(localStorage.getItem('carts'));
            } catch(e) {
                localStorage.removeItem('carts');
            }
        }
        axios.get("http://localhost/laravue-backend/public/api/products", {params: {
            id: this.$route.params.id
        }})
        .then((response) => {
            // this.productDetails = response.data.data
            this.setDefaultImage(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
 },
  methods: {
      changeImage(imageUrl){
          this.gambar_default = imageUrl
      },
      setDefaultImage(data){
          //ganti objek productDetails dengan data dari API
          this.productDetails = data
          //set data photo dari API
          this.gambar_default = data.product_galleries[0].photo
      },
      saveCarts(idProduct, productName, productPhoto, productPrice){

          let productStored = {
              "id": idProduct,
              "name": productName,
              "photo": productPhoto,
              "price": productPrice
          }
          this.carts.push(productStored)
          const parsed = JSON.stringify(this.carts)
          localStorage.setItem('carts', parsed)
          window.location.reload()
      }
  }
}
</script>

<style scoped>
.product-thumbs .pt{
    margin-right: 10px;
}
</style>