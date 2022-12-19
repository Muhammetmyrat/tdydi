const { createApp } = Vue;
createApp({
  data() {
    return {
      items: [
        { title: "Dolandyryş" },
        { title: "Bilim guramasy barada maglumat" },
        { title: "Fakultetler we bölümler" },
        { title: "Jemgyýetçilik işi" },
        { title: "Resminamalar" },
        { title: "Soraglar we jogaplar" },
      ],
    };
  },
  mounted() {
    //===========main-page=========
    var swiperMainMini = new Swiper(".main__mini-swiper", {
      slidesPerView: 4,
      spaceBetween: 50,
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        270: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
    });

    var swiperMainBig = new Swiper(".main__swiper", {
      effect: "fade",
      speed: 2000,
      autoplay: {
        delay: 2000,
      },
      thumbs: {
        swiper: swiperMainMini,
      },
    });
    //========================Partners Swiper===========================
    var swiper = new Swiper(".partners__swiper", {
      slidesPerView: 3,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        768: {
          slidesPerView: 5,
        },
      },
    });
  },
}).mount("#app");
