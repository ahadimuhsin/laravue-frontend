<template>
  <div class="home">
    <MyHeader></MyHeader>
    <MyCarousel></MyCarousel>
    <WomanCarousel></WomanCarousel>
    <GalleryInstagram></GalleryInstagram>
    <partner-logo></partner-logo>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from '@/components/Home/Header'
import MyCarousel from '@/components/Home/Carousel'
import WomanCarousel from '@/components/Home/Carousel-Women'
import GalleryInstagram from '@/components/Home/Gallery'
import PartnerLogo from '@/components/Home/PartnerLogo'
import MyFooter from '@/components/Home/Footer'
export default {
  name: 'Home',
  components: {
    MyHeader,
    MyCarousel,
    WomanCarousel,
    GalleryInstagram,
    PartnerLogo,
    MyFooter
  }
}
</script>
