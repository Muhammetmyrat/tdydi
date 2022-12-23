const { createApp } = Vue;
const defaultClasses = {
  ul: "pagination",
  li: "pagination__item",
  liActive: "pagination__item--active",
  liDisable: "pagination__item--disable",
  button: "pagination__link",
  buttonActive: "pagination__link--active",
  buttonDisable: "pagination__link--disable",
};
const defaultLabels = {
  first: "&laquo;",
  prev: "&lsaquo;",
  next: "&rsaquo;",
  last: "&raquo;",
};
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
      articles: [
        { id: 1, title: "Makalalar", path: "./articles-books.html" },
        { id: 2, title: "Kitaplar", path: "./books.html" },
        { id: 2, title: "Video", path: "./videos.html" },
        { id: 2, title: "Suratlar" },
      ],
      observer: null,
      isActive: false,
      paginationClasses: {
        ...defaultClasses,
      },
      paginationLabels: {
        ...defaultLabels,
      },
      modelValue: 1,
      pageCount: 3,
    };
  },
  computed: {
    datas() {
      let valPrev = this.modelValue > 1 ? this.modelValue - 1 : 1; // for easier navigation - gives one previous page
      let valNext =
        this.modelValue < this.pageCount ? this.modelValue + 1 : this.pageCount; // one next page
      let extraPrev = valPrev === 3 ? 2 : null;
      let extraNext =
        valNext === this.pageCount - 2 ? this.pageCount - 1 : null;
      let dotsBefore = valPrev > 3 ? 2 : null;
      let dotsAfter = valNext < this.pageCount - 2 ? this.pageCount - 1 : null;

      let output = [];

      for (let i = 1; i <= this.pageCount; i += 1) {
        if (
          [
            1,
            this.pageCount,
            this.modelValue,
            valPrev,
            valNext,
            extraPrev,
            extraNext,
            dotsBefore,
            dotsAfter,
          ].includes(i)
        ) {
          output.push({
            label: i,
            active: this.modelValue === i,
            disable: [dotsBefore, dotsAfter].includes(i),
          });
        }
      }
      return output;
    },

    hasFirst() {
      return this.modelValue === 1;
    },

    hasLast() {
      return this.modelValue === this.pageCount;
    },
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
    //========================About-us Swiper===========================
    var swiper = new Swiper(".about-us__swiper", {
      slidesPerView: 3,
      loop: true,
      speed: 1000,
      spaceBetween: 10,
      navigation: {
        nextEl: ".about-us__button-next",
        prevEl: ".about-us__button-prev",
      },
    });
    const options =
      {
        rootMargin: "0px",
        threshold: 1.0,
      } || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.updateCount();
      }
    }, options);

    this.observer.observe(this.$refs.observe);
    if (this.modelValue > this.pageCount) {
      //   this.$emit("input", this.pageCount);
    }
    let className = "scroll";
    let scrollTrigger = 100;

    window.onscroll = function (e) {
      if (
        window.scrollY >= scrollTrigger ||
        window.pageYOffset >= scrollTrigger
      ) {
        document.querySelector(".header").classList.add(className);
      } else {
        document.querySelector(".header").classList.remove(className);
      }
    };
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    first() {
      !this.hasFirst && this.$emit("clickPage", 1);
    },
    prev() {
      !this.hasFirst && this.$emit("clickPage", this.modelValue - 1);
    },
    goto(page) {
      this.$emit("clickPage", page);
    },
    next() {
      !this.hasLast && this.$emit("clickPage", this.modelValue + 1);
    },

    last() {
      !this.hasLast && this.$emit("clickPage", this.pageCount);
    },
    updateCount() {
      const counters = document.querySelectorAll(".about-us__swiper-count");
      const speed = 300;
      counters.forEach((counter) => {
        const update = () => {
          let target = +counter.getAttribute("data-target");
          let count = +counter.innerText;
          let inc = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(update, 1);
          } else {
            counter.innerText = target;
          }
        };
        counter.innerText = Number(0);
        update();
      });
    },
    togglePopUp() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        document.body.classList.add("_lock");
      } else {
        document.body.classList.remove("_lock");
      }
    },
  },
}).mount("#app");
