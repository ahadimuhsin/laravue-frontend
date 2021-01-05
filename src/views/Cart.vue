<template>
    <div>
    <my-header></my-header>
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                        <span>Shopping Cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->
    <!-- Flash Message -->
    <FlashMessage :position="'right top'"></FlashMessage>
    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th class="p-name text-center">Product Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="cart in carts" :key="cart.id">
                                            <td class="cart-pic first-row">
                                                <img :src="cart.photo" />
                                            </td>
                                            <td class="cart-title first-row text-center">
                                                <h5>{{cart.name}}</h5>
                                            </td>
                                            <td class="p-price first-row">Rp {{cart.price.toLocaleString('id-ID')}}</td>
                                            <td class="delete-item" @click="removeItem(cart.index)"><a href="#"><i class="material-icons">
                                              close
                                              </i></a></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <h4 class="mb-4 text-left">
                                Informasi Pembeli:
                            </h4>
                            <div class="user-checkout text-left">
                                <form>
                                    <div class="form-group">
                                        <label for="namaLengkap">Nama lengkap</label>
                                        <input required type="text" class="form-control" v-model="customerInfo.name" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">Email Address</label>
                                        <input required type="email" class="form-control" v-model="customerInfo.email" id="emailAddress" aria-describedby="emailHelp" placeholder="Masukan Email">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">No. HP</label>
                                        <input type="text" class="form-control" id="noHP" v-model="customerInfo.number" aria-describedby="noHPHelp" placeholder="Masukan No. HP">
                                    </div>
                                    <div class="form-group">
                                        <label for="alamatLengkap">Alamat Lengkap</label>
                                        <textarea class="form-control" id="alamatLengkap" 
                                        v-model="customerInfo.address" rows="3" required></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="proceed-checkout text-left">
                                <ul>
                                    <li class="subtotal">ID Transaction <span>#SH12000</span></li>
                                    <li class="subtotal mt-3">Subtotal <span>Rp {{totalPrice.toLocaleString('id-ID')}}</span></li>
                                    <li class="subtotal mt-3">Pajak <span>10%</span></li>
                                    <li class="subtotal mt-3">Total Biaya <span>Rp {{feeTotal.toLocaleString('id-ID')}}</span></li>
                                    <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
                                    <li class="subtotal mt-3">No. Rekening <span>2208 1996 1403</span></li>
                                    <li class="subtotal mt-3">Nama Penerima <span>Shayna</span></li>
                                </ul>
                                <a @click="checkout" href="#" class="proceed-btn">I ALREADY PAID</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shopping Cart Section End -->
    <my-footer></my-footer>
    </div>
</template>

<script>
import MyHeader from '@/components/Home/Header'
import MyFooter from '@/components/Home/Footer'
import axios from 'axios'
export default {
    name: 'cart',
    data() {
        return {
            carts: [],
            customerInfo: {
                name: '',
                email: '',
                number: '',
                address: ''
            }
        }
    },
    components: {
        MyHeader,
        MyFooter
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
        removeItem(index){
            this.carts.splice(index,1)
            const parsed = JSON.stringify(this.carts)
            localStorage.setItem('carts', parsed)
        },
        //memproses checkout
        checkout(){
            //gunakan map untuk melooping carts untuk dijadikan array
            let products = this.carts.map(function(product){
                return product.id
            })

            let checkOutData = {
                'name': this.customerInfo.name,
                'email': this.customerInfo.email,
                'number': this.customerInfo.number,
                'address': this.customerInfo.address,
                'transaction_total': this.feeTotal,
                'transaction_status': 'PENDING',
                'transaction_details': products
            }

            axios.post(
                "http://localhost/laravue-backend/public/api/checkout",
                checkOutData)
            .then(() => {
                this.$router.push("success")
                window.localStorage.clear()
                })
            .catch((error) => {
                if(error.response.data.errors.email){
                    this.flashMessage.error({
                    title: 'Terjadi Error',
                    message: error.response.data.errors.email,
                    icon: 'img/warning.png'
                });
                }
                if(error.response.data.errors.name){
                    this.flashMessage.error({
                    title: 'Terjadi Error',
                    message: error.response.data.errors.name,
                    icon: 'img/warning.png'
                });
                }
                if(error.response.data.errors.number){
                    this.flashMessage.error({
                    title: 'Terjadi Error',
                    message: error.response.data.errors.number,
                    icon: 'img/warning.png'
                });
                }
                if(error.response.data.errors.address){
                    this.flashMessage.error({
                    title: 'Terjadi Error',
                    message: error.response.data.errors.address,
                    icon: 'img/warning.png'
                });
                }

                
                console.log(error.response.data.errors.error)
            })

        }
    },
    computed: {
        totalPrice(){
        //   console.log(this.carts)
        let total=0
          this.carts.forEach(cart => {
            //   console.log(cart)
              total += cart.price
          });
          return total
      },
      feeTotal(){
          return this.totalPrice + ((this.totalPrice * 10) /100 )
      }
    }
    
}
</script>