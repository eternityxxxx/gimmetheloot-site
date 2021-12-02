<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__nav">
        <nav>
            <router-link class="nav__link" active-class="nav__link--active" to="/">Главная страница</router-link>
            <router-link class="nav__link" active-class="nav__link--active" to="/home">О нас</router-link>
            <router-link class="nav__link" active-class="nav__link--active" to="/world">Контакты</router-link>
        </nav>
      </div>

      <div class="header__service">
        <svg class="service__heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
        </svg>
        <router-link class="nav__link nav__link--service" to="/">Вход и регистрация</router-link>
      </div>

      <div class="header__creation">
        <router-link class="creation__link" to="/world">Разместить объявление</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
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

  .header__service {
    display: flex;
    align-items: center;
  }

  .service__heart {
    margin-right: 15px;
    fill: #fff;
    transition: 0.3s;
  }

  .service__heart:focus,
  .service__heart:hover {
    fill: #ff6163;
  }

  .nav__link--service:hover {
    color: #d9d9d9;
  }

  .header__creation {
    margin-left: 30px;
  }

  .creation__link {
    padding: 5px 14px;
    background-color: #00AAFF;
    border-radius: 3px;
    color: #fff;
    text-decoration: none;
    transition: 0.3s;
  }

  .creation__link:hover {
    background-color: #009CF0;
  }

</style>