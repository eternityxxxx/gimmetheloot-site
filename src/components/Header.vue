<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__nav">
        <nav>
          <router-link class="nav__link" active-class="nav__link--active" to="/"
            >Главная страница</router-link
          >
        </nav>
      </div>

      <div class="header__service">
        <router-link
          to="/wishlist"
          class="wishlist"
          active-class="wishlist--active"
        >
          <svg
            class="service__heart"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
            />
          </svg>
        </router-link>
        <a
          v-show="!$store.getters.loggedIn"
          @click="showModalLogin = true"
          class="nav__link nav__link--service"
          >Вход и регистрация</a
        >
      </div>

      <div v-show="$store.getters.loggedIn" class="header__creation">
        <a @click="showModal = true" class="creation__link"
          >Разместить объявление</a
        >
      </div>
      <div v-show="$store.getters.loggedIn" class="header__creation">
        <a @click="logout" class="creation__link creation__link--exit">Выход</a>
      </div>
    </div>
  </div>
  <modal v-show="showModal" @close="showModal = false">
    <template v-slot:header>
      <h3 class="modal__title">Новое объявление</h3>
    </template>
    <template v-slot:body>
      <form ref="addForm" class="modal__form" @submit="addAdvert">
        <label class="form__label" for="title">Заголовок</label>
        <input
          id="title"
          v-model="newAdvert.title"
          class="form__input"
          type="text"
          placeholder="Продам IPhone XS 64gb"
          required
        />
        <label class="form__label" for="description">Описание</label>
        <textarea
          id="description"
          v-model="newAdvert.description"
          class="form__input"
          placeholder="Телефон в отличном состоянии.."
          required
        ></textarea>
        <label class="form__label" for="price">Цена</label>
        <input
          id="price"
          v-model="newAdvert.price"
          class="form__input"
          type="number"
          min="0"
          placeholder="1000.99 &#8381;"
          required
        />
        <label class="form__label" for="address">Адрес</label>
        <input
          id="address"
          v-model="newAdvert.address"
          class="form__input"
          type="text"
          placeholder="Ставрополь"
          required
        />
        <p class="form__label">Фотография</p>
        <div class="file-wrapper">
          <label class="file-label" for="advert_photo">Выбрать файл</label>
          <input
            v-on:change="onFileChange"
            id="advert_photo"
            class="form__input--file"
            type="file"
            accept=".jpg, .jpeg, .png"
            required
          />
        </div>
        <div class="btns">
          <input
            class="btn btn--primary"
            type="submit"
            value="Создать объявление"
          />
          <div class="btn btn--small btn--danger" @click="resetForm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="10px"
              viewBox="0 0 329.26933 329"
              width="10px"
              fill="#fff"
            >
              <path
                d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
              />
            </svg>
          </div>
        </div>
      </form>
    </template>
  </modal>

  <modal v-show="showModalLogin" @close="showModalLogin = false">
    <template v-slot:header>
      <h3 class="modal__title">Вход</h3>
    </template>
    <template v-slot:body>
      <form class="modal__form" @submit.prevent="loginUser">
        <input
          class="form__input"
          id="username"
          name="username"
          type="text"
          v-model="username"
          placeholder="Логин"
          required
        />
        <div class="password-wrapper">
          <Icon
            v-show="passwordVisible"
            @click="showPassword"
            class="eye"
            icon="fa:eye"
          />
          <Icon
            v-show="!passwordVisible"
            @click="showPassword"
            class="eye"
            icon="fa-solid:eye-slash"
          />

          <input
            class="form__input form__input--password"
            id="password"
            name="password"
            :type="type"
            v-model="password"
            placeholder="Пароль"
            required
          />
        </div>
        <input
          class="btn btn--primary btn--login"
          type="submit"
          value="Войти"
        />
      </form>
    </template>
  </modal>
</template>

<script>
import modal from "../components/Modal.vue";
import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
  name: "Header",
  components: {
    modal,
    Icon,
  },
  data() {
    return {
      showModal: false,
      showModalLogin: false,
      newAdvert: {
        title: "",
        description: "",
        price: "",
        address: "",
        photo: "",
      },
      username: "",
      password: "",
      wrongCred: false,
      type: "password",
      passwordVisible: false,
    };
  },
  methods: {
    addAdvert() {
      const data = new FormData();
      Object.keys(this.newAdvert).forEach((key) =>
        data.append(key, this.newAdvert[key])
      );

      axios
        .post(`${this.$store.getters.getServerUrl}/adverts/`, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`,
          },
        })
        .then((response) => this.$router.push({ name: "Adverts" }));

      this.showModal = false;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.newAdvert.photo = files[0];
    },
    resetForm() {
      this.newAdvert = {
        title: "",
        description: "",
        price: "",
        address: "",
        photo: "",
      };
    },
    loginUser() {
      console.log(1);
      this.$store
        .dispatch("loginUser", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.wrongCred = false;
          this.$router.push({ name: "Adverts" });
        })
        .catch((err) => {
          console.log(err);
          this.wrongCred = true; // if the credentials were wrong set wrongCred to true
        });
      this.showModalLogin = false;
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.passwordVisible = true;
      } else {
        this.type = "password";
        this.passwordVisible = false;
      }
    },
    logout() {
      this.$store.dispatch("logoutUser")
          .then(() => {
        this.$router.push({ name: "Adverts" });
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #292929;
}

.header {
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
}

.header__nav {
  flex-grow: 1;
  display: flex;
}

.nav__link {
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

.nav__link:not(:last-child) {
  margin-right: 40px;
}

.nav__link:hover {
  color: #ff6163;
}

.nav__link--active {
  color: #ff6163;
}

.wishlist {
  fill: #fff;
}

.wishlist--active {
  fill: #ff6163;
}

.header__service {
  display: flex;
  align-items: center;
}

.service__heart {
  margin-right: 15px;
  fill: context-stroke;
  transition: 0.3s;
}

.service__heart:focus,
.service__heart:hover {
  fill: #ff6163;
}

.nav__link--service:hover {
  cursor: pointer;
  color: #d9d9d9;
}

.header__creation {
  margin-left: 30px;
  cursor: pointer;
}

.creation__link {
  padding: 5px 14px;
  background-color: #00aaff;
  border-radius: 3px;
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

.creation__link--exit {
  background-color: #dc3545;
  border-color: #dc3545;
}

.creation__link:hover {
  background-color: #009cf0;
}

.creation__link--exit:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.modal__title {
  color: #999999;
}

textarea {
  resize: vertical;
}

.modal__form {
  width: 90%;
  margin: 35px auto 0;
  display: flex;
  flex-direction: column;
}

.form__input {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 35px;
  min-height: 25px;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form__input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
}

.form__input--password {
  width: 94%;
}

.file-wrapper {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 100%;
  height: 25px;
  margin-bottom: 0;

  box-sizing: border-box;
}

.form__input--file {
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(2.25rem + 2px);
  margin: 0;
  opacity: 0;
  overflow: visible;
}

.file-label {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: rgba(73, 80, 87, 0.8);
}

.btns {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.btn {
  cursor: pointer;
  width: 45%;
  margin-top: 50px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn--primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn--primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn--danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn--danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}

.btn--small {
  width: 8%;
}

.form__label {
  color: #35383d;
  margin-bottom: 7px;
}

.password-wrapper {
  position: relative;
}

.eye {
  opacity: 0.6;
  position: absolute;
  top: 12px;
  right: 15px;
  transition: 0.3s;
}

.eye:hover {
  cursor: pointer;
  color: #ff6163;
}

.btn--login {
  margin: 0 auto;
}
</style>
