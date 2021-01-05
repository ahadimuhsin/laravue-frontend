<template>
<div>
    <!-- Header Section Begin -->
    <header class="header-section">
        <div class="header-top">
            <div class="container">
                <div class="ht-left">
                    <div class="mail-service">
                        <i class=" fa fa-envelope"></i> hello.shayna@gmail.com
                    </div>
                    <div class="phone-service">
                        <i class=" fa fa-phone"></i> +628 22081996
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="inner-header">
                <div class="row">
                    <div class="col-lg-2 col-md-2">
                        <div class="logo">
                            <router-link to="/">
                                <img src="img/logo_website_shayna.png" alt="" />
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-7"></div>
                    <div class="col-lg-3 text-right col-md-3">
                        <ul class="nav-right" v-if="this.$route.name != 'cart'">
                            <li class="cart-icon">
                                Keranjang Belanja &nbsp;
                                <a href="#">
                                    <i class="icon_bag_alt"></i>
                                    <span>{{cartsLength}}</span>
                                </a>
                                <div class="cart-hover">
                                    <div class="select-items">
                                        <table>
                                            <tbody v-if="carts.length > 0">
                                                <tr v-for="cart in carts" :key="cart.id">
                                                    <td class="si-pic">
                                                        <img  class="photo-item" :src="cart.photo" alt="" />
                                                    </td>
                                                    <td class="si-text">
                                                        <div class="product-selected">
                                                            <p>Rp {{cart.price.toLocaleString('id-ID')}}x 1</p>
                                                            <h6>{{cart.name}}</h6>
                                                        </div>
                                                    </td>
                                                    <td class="si-close" @click="removeItem(cart.id)">
                                                        <i class="ti-close" ></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td>
                                                        Keranjang Kosong
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="select-total" v-if="carts.length>0">
                                        <span>total:</span>
                                        <h5>Rp {{ totalPrice.toLocaleString('id-ID') }}</h5>
                                    </div>
                                    <div class="select-button" v-if="carts.length > 0">
                                        <router-link to="/cart" class="primary-btn view-card">VIEW CARTS</router-link>
                                        <a href="#" class="primary-btn checkout-btn">CHECK OUT</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->
    </div>
</template>

<script>
export default {
    name: 'Header-LaraVue',
    data() {
      return{
      carts: [],
      }
  },
  mounted() {
      if (localStorage.getItem('carts')) {
            try {
                this.carts = JSON.parse(localStorage.getItem('carts'));
            } catch(e) {
                localStorage.removeItem('carts');
            }
        }
  },
  methods: {
      //hapus item kemudian simpan lagi ke localstorage
      removeItem(index)
      {
        // cari id dari item yang akan dihapus
        let cartStorage = JSON.parse(localStorage.getItem("carts"))
        let item = cartStorage.map(item => item.id)
        //cocokkan idx item dengan id yg ada di storage
        let idx = item.findIndex(id => id == index)
        this.carts.splice(idx,1)
        //refresh storage
        const parsed = JSON.stringify(this.carts)
        localStorage.setItem('carts', parsed)
        window.location.reload()
      }
  },
  computed: {
      cartsLength: function(){
          return this.carts.length
      },
      totalPrice(){
        //   console.log(this.carts)
        let total=0
          this.carts.forEach(cart => {
            //   console.log(cart)
              total += cart.price
          });
          return total
      }
  }
}
</script>

<style scoped>
.photo-item{
    width: 120px;
    height: 120px;
}
</style>