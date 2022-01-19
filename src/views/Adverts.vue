<template>
  <div class="container">
    <div class="card" v-for="advert in adverts" :key="advert.id">
      <img
        class="card__image"
        :src="advert.photo"
        alt="Фотография объявления"
      />
      <h3 class="card__title">
        <a class="card__link" href="">{{ advert.title }}</a>
      </h3>
      <p class="card__price">{{ advert.price }} &#8381;</p>
      <p class="card__address">{{ advert.address }}</p>
      <p class="card__date">
        {{ advert.created.toString().replace("T", " ").slice(0, 19) }}
      </p>
      <svg
        :id="advert.id"
        class="card__like"
        :class="{ filled: isLiked(advert) }"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        v-on:click="
          addToWishList(advert);
          showTip(advert.id);
        "
      >
        <path
          d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
        />
      </svg>
      <div :id="'tip' + advert.id" class="tip hide unclickable">
        Добавлено
        <router-link class="tip__text" to="/wishlist">в избранное</router-link>
      </div>
    </div>
  </div>
  <div class="pagination-next">
    <Pagination
      v-if="adverts.length !== 0 && adverts.length > 10"
      :total="total"
      :offset="offset"
      @change="getAdverts"
    />
  </div>
</template>

<script>
import Pagination from "../components/Pagination";

export default {
  name: "Adverts",
  components: { Pagination },
  data() {
    return {
      isModalVisible: false,
      adverts: {},
      previousAdverts: {},
      wishlist: {},
      offset: 0,
      total: 0,
    };
  },
  created() {
    this.getAdverts(0);
  },
  methods: {
    async getAdverts(offset) {
      this.offset = offset;
      if (this.offset >= this.total) {
        offset = 0;
        this.offset = offset;
      }
      this.adverts = await fetch(
        `${this.$store.getters.getServerUrl}/adverts/?limit=12&offset=${offset}`
      )
        .then((response) => response.json())
        .then((response) => {
          this.total = response.count;
          return response.results;
        });
    },
    addToWishList(advert) {
      if (localStorage.getItem("adverts")) {
        let wishedAdverts = JSON.parse(localStorage.getItem("adverts"));

        for (let i = 0; i < wishedAdverts.length; i++) {
          if (wishedAdverts[i].id === advert.id) {
            wishedAdverts.splice(i, 1);
            localStorage.setItem(`adverts`, JSON.stringify(wishedAdverts));
            let btn = document.getElementById(advert.id);
            btn.classList.remove("filled");
            return;
          }
        }

        wishedAdverts.push(advert);
        localStorage.setItem(`adverts`, JSON.stringify(wishedAdverts));
        let btn = document.getElementById(advert.id);
        btn.classList.add("filled");
      } else {
        let wishedAdverts = [];
        wishedAdverts.push(advert);
        localStorage.setItem(`adverts`, JSON.stringify(wishedAdverts));
        let btn = document.getElementById(advert.id);
        btn.classList.add("filled");
      }
    },
    isLiked(advert) {
      if (localStorage.getItem("adverts")) {
        let wishedAdverts = JSON.parse(localStorage.getItem("adverts"));

        for (let i = 0; i < wishedAdverts.length; i++) {
          if (wishedAdverts[i].id === advert.id) {
            return true;
          }
        }

        return false;
      }

      return false;
    },
    showTip(id) {
      if (localStorage.getItem("adverts")) {
        let wishedAdverts = JSON.parse(localStorage.getItem("adverts"));

        for (let i = 0; i < wishedAdverts.length; i++) {
          if (wishedAdverts[i].id === id) {
            let tip = document.getElementById(`tip${id}`);
            tip.classList.remove("hide", "fade-out", "unclickable");
            setTimeout(
              () => tip.classList.add("hide", "fade-out", "unclickable"),
              3000
            );
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1320px;
  margin: 50px auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2%;
  grid-row-gap: 8%;
}

.card {
  position: relative;
}

.card__image {
  width: 100%;
  height: 200px;
}

.card__title {
  font-size: 14px;
  font-weight: bold;
}

.card__link {
  color: #009cf0;
  text-decoration: none;
}

.card__like {
  stroke: #009cf0;
  stroke-width: 2px;
  fill: #fff;
  position: absolute;
  top: 75%;
  left: 94%;
  transition: 0.3s;
}

.card__like:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.card__price {
  margin-top: 2px;
  font-size: 14px;
  font-weight: bold;
}

.card__address,
.card__date {
  color: #8f8f8f;
}

.card__address {
  margin-top: 4px;
}

.filled {
  fill: #009cf0;
}

.tip {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 55% 85%, 50% 100%, 45% 85%, 0 85%);
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 54%;
  z-index: 99999;
  right: -98px;
}

.tip__text {
  text-decoration: none;
  color: #00aaff;
}

.tip__text:hover {
  color: #ff6163;
}

.hide {
  opacity: 0;
}

.unclickable {
  pointer-events: none;
}

.fade-out {
  transition: 0.6s;
  animation-name: fading-out;
}

@keyframes fading-out {
  0% {
    opacity: 0;
    pointer-events: visible;
  }

  100% {
    opacity: 1;
    pointer-events: visible;
  }
}
</style>
