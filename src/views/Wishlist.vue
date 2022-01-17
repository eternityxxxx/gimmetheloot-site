<template>
  <div class="container">
    <h2 class="title">Избранное</h2>
    <div class="section__tutorial" v-if="!adverts.length">
      <h3 class="tutorial__title">Как добавить объявление в избранное?</h3>
      <p class="tutorial__text">
        На страницах списка объявлений или объявления нажмите на сердечко рядом
        с заголовком.
      </p>
      <img
        class="tutorial__screenshot"
        src="../assets/ex1.png"
        alt="Пример 1"
      />
      <img
        class="tutorial__screenshot"
        src="../assets/ex2.png"
        alt="Пример 2"
      />
    </div>
    <div class="card" v-for="advert in adverts" :key="advert.id">
      <img
        class="card__image"
        :src="advert.photo"
        alt="Фотография объявления"
      />
      <div class="card__info-block">
        <h3 class="card__title">
          <a class="card__link" href="">{{ advert.title }}</a>
        </h3>
        <p class="card__price">{{ advert.price }} &#8381;</p>
        <p class="card__address">{{ advert.address }}</p>
        <p class="card__date">
          {{ advert.created.toString().replace("T", " ").slice(0, 19) }}
        </p>
        <div class="card__close hide" v-on:click="deleteFromWishlist(advert)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 0 329.26933 329"
            width="15px"
          >
            <path
              d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="trash" v-if="adverts.length" v-on:click="deleteAll()">
      <svg class="svg-icon" viewBox="0 0 20 20" height="30px" width="30px">
        <path
          d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Adverts",
  components: {},
  data() {
    return {
      adverts: {},
    };
  },
  created() {
    this.getAdverts();
  },
  methods: {
    getAdverts() {
      if (localStorage.getItem("adverts")) {
        this.adverts = JSON.parse(localStorage.getItem("adverts"));
        console.log("From localstorage: ", this.adverts);
      } else {
        this.adverts = {};
      }
    },
    deleteFromWishlist(advert) {
      let wishedAdverts = JSON.parse(localStorage.getItem("adverts"));

      for (let i = 0; i < wishedAdverts.length; i++) {
        if (wishedAdverts[i].id === advert.id) {
          wishedAdverts.splice(i, 1);
          localStorage.setItem(`adverts`, JSON.stringify(wishedAdverts));
          this.adverts = wishedAdverts;
          break;
        }
      }
    },
    deleteAll() {
      localStorage.removeItem("adverts");
      this.adverts = {};
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1320px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.title {
  font-size: 32px;
  margin-left: 25px;
  margin-bottom: 40px;
}

.card {
  display: flex;
  padding: 25px;
  position: relative;
}

.card__close {
  position: absolute;
  right: 25px;
  top: 25px;
  display: none;
  transition: 0.2s;
}

.card__close:hover {
  fill: #ff6163;
  transform: scale(1.2);
  cursor: pointer;
}

.card:hover {
  border-radius: 10px;
  background-color: #f5f5f5;
}

.card:hover .card__close {
  display: block;
}

.card__image {
  border-radius: 4px;
  width: 208px;
  height: 156px;
  margin-right: 20px;
}

.card__title {
  font-size: 18px;
  font-weight: bold;
}

.card__link {
  color: #009cf0;
  text-decoration: none;
}

.card__price {
  margin-top: 2px;
  font-size: 18px;
  font-weight: bold;
}

.card__address,
.card__date {
  color: #8f8f8f;
}

.card__address {
  margin-top: 4px;
}

.section__tutorial {
  margin-left: 25px;
}

.tutorial__title {
  font-size: 25px;
}

.tutorial__text {
  margin: 20px 0;
  font-size: 14px;
}

.trash {
  position: absolute;
  right: 20px;
  transition: 0.2s;
}

.trash:hover {
  fill: #ff6163;
  transform: scale(1.2);
  cursor: pointer;
}
</style>
