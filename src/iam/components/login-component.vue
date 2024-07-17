<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {IStorage} from "../../shared/plugins/interface/istorage.ts";
import {app, auth} from "../../shared/services/firebase.ts";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";


const countries = ref('PE');
const code = ref('+ 51');

const phone = ref('');

const country_flag = ref('🇵🇪');

const dialog = ref(false);

const authCode = ref('');

const router = useRouter();
const storage = inject<IStorage>('storage');

const updateCountry = async (): Promise<void> => {
  try {
    const response: any = await fetch(`https://restcountries.com/v3.1/alpha/${countries.value}`);
    const codes: any[] = await response.json();
    const country = codes[0];
    code.value = country.idd.root + country.idd.suffixes[0];
    country_flag.value = country.flag
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  updateCountry();
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'p-captcha', {
    'size': 'invisible',
    'callback': (response) => {
    }
  });
});

const login = async (): Promise<void> => {
  const phoneNumber = `${code.value}${phone.value}`;

  if (phoneNumber.length < 10) {
    return;
  }

  const appVerifier = window.recaptchaVerifier;

  const auth = getAuth();
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        dialog.value = true;
        // ...
      }).catch((error) => {
    alert('Invalid Phone Number');
  });
};

const loginWithCode = async (): Promise<void> => {
  dialog.value = false;
  const code = authCode.value;
  const confirmationResult = window.confirmationResult;
  confirmationResult.confirm(code)
      .then((result) => {
        console.log(result);
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        storage?.setItem('token', user.refreshToken);
        // storage?.set('user', user);
        router.push({name: 'home'});
      }).catch((error) => {
        alert('Invalid code');
  });
};
</script>

<template>

  <div class="login_container">
    <div class="login_img_container">
      <div class="image"></div>
    </div>

    <div class="login_description">
      <section class="login_title">
        Sign in to your account
      </section>
      <section class="login_subtitle">
        Please confirm your country and <br>
        enter your phone number
      </section>
    </div>

    <div class="login_container_select_phone">
      <select v-model="countries" @change="updateCountry">
        <option value="AR">Argentina</option>
        <option value="BR">Brazil</option>
        <option value="CL">Chile</option>
        <option value="CO">Colombia</option>
        <option value="EC">Ecuador</option>
        <option value="PY">Paraguay</option>
        <option value="PE">Peru</option>
        <option value="UY">Uruguay</option>
      </select>
    </div>

    <div class="login_container_phone">
      <span>{{ country_flag }}</span>
      <input type="text" class="phoneCode" v-model="code">
      <input type="text" autofocus class="phone" v-model="phone">
    </div>

    <div class="login_container_login">
      <div id="p-captcha"/>
      <button id="sign" class="next" @click="login">Sign in</button>
    </div>

    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
    >
      <div class="enter_code_login_container">
        <p>
          Enter the code sent to your phone
        </p>
        <input type="number" v-model="authCode">
        <button @click="loginWithCode">Confirm</button>
      </div>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>

.enter_code_login_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #192632;
  border-radius: 7px;
  padding: 20px;

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: white;
  }

  input {
    width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    border-radius: 7px;
  }

  button {
    width: 50%;
    padding: 10px;
    border: none;
    background: #2EA6DA;
    color: #FFF;
    outline: none;
    border-radius: 7px;
    cursor: pointer;
  }

}

.login_container {
  background: #212121;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login_img_container {
    padding-bottom: 10px;

    .image {
      background: url('https://i.imgur.com/EXI5mDF.png') no-repeat center;
      background-size: contain;
      height: 150px;
      width: 150px;
    }
  }

  .login_description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-family: 'Poppins', serif;

    .login_title {
      margin-top: 15px;
      font-size: 1.8rem;
      font-weight: bold;
    }

    .login_subtitle {
      text-align: center;
      margin-top: 7px;
      font-size: 1.1rem;
      margin-bottom: 10px;
      font-weight: bold;
      color: #666666;
    }
  }

  .login_container_select_phone {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 15px;


    select {
      width: 270px;
      padding: 10px;
      outline: none;
      border: none;
      height: 50px;
      border-radius: 7px;
    }
  }

  .login_container_phone {
    margin-top: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 7px;

    max-width: 250px;
    width: 250px;
    min-width: 250px;
    padding: 10px;

    span {
      font-size: 1.5rem;
      margin-right: 10px;
    }

    .phoneCode {
      outline: none;
      border: none;
      text-align: left;
      width: 30px;
      margin-right: 5px;
    }

    .phone {
      outline: none;
      border: none;
      height: 20px;
    }
  }

  .login_container_login {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 40px;

    .next {
      text-align: center;
      width: 270px;
      padding: 10px;
      border: none;
      background: #2EA6DA;
      color: #FFF;
      outline: none;
      border-radius: 7px;
      cursor: pointer;
    }

    .disabled {
      background: #CDCDCD;
      cursor: auto
    }
  }
}
</style>