<template>
    <div>
            <!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mt-5" v-if="products.length > 0">
                    <carousel class="product-slider" :nav="false" :items="3" :autoplay="true">
                        <div class="product-item" v-for="item in products" :key="item.id">
                            <div class="pi-pic">
                                <img :src="item.product_galleries[0].photo" alt="" />
                                <ul>
                                    <li class="w-icon active" @click="saveCarts(item.id, item.name, item.product_galleries[0].photo, item.price)">
                                        <a href="#"><i class="icon_bag_alt"></i></a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link :to="'/product/'+item.id">+ Quick view</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{item.type}}</div>
                                <router-link to="/product">
                                <a href="#">
                                    <h5>{{ item.name }}</h5>
                                </a>
                                </router-link>
                                <div class="product-price">
                                    Rp {{ item.price.toLocaleString('id-ID') }}
                                    <!-- <span>$35.00</span> -->
                                </div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-lg-12" v-else>
                    <p>
                        Produk tidak tersedia
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import axios from 'axios'
export default {
    name: 'carousel-woman',
    components: {
        carousel
    },
    data(){
        return{
            products: [],
            carts: []
        }
    },
    mounted(){
        axios.get("http://localhost/laravue-backend/public/api/products")
        .then((response) => {
            this.products = response.data.data.data
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {
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
.product-item{
    margin-right: 25px;
}
img{
    height: 450.88px;
    width: 321.88px;
}
</style>