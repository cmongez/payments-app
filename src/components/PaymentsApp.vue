<!-- eslint-disable vue/require-v-for-key -->
<template>
  <main>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modificar estado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Selecciona el estado en que se encuentra el pago</p>
            <p>Estado</p>
            <select>
              <option disabled value="">Seleccione un elemento</option>
              <option>Por pagar</option>
              <option>Pagado</option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn--secondary" data-bs-dismiss="modal">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid p-5">
      <div v-if="!editing" class="payments container-fluid m-0 p-0">
        <div class="payments__info d-flex justify-content-between align-items-center p-4">
          <div class="d-flex justify-content-center align-items-center">
            <h1 class="payments__info__title mb-0 me-2">Pagos</h1>
            <svg width="12" height="9" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L7 7L13 1"
                stroke="#3460DC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div @click="isEditing(), edit()" class="d-flex gap-3">
            <button class="btn--primary">
              Editar
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.1667 2.49999C14.3856 2.28112 14.6455 2.1075 14.9314 1.98905C15.2174 1.8706 15.5239 1.80963 15.8334 1.80963C16.1429 1.80963 16.4494 1.8706 16.7354 1.98905C17.0214 2.1075 17.2812 2.28112 17.5001 2.49999C17.719 2.71886 17.8926 2.97869 18.011 3.26466C18.1295 3.55063 18.1904 3.85713 18.1904 4.16665C18.1904 4.47618 18.1295 4.78268 18.011 5.06865C17.8926 5.35461 17.719 5.61445 17.5001 5.83332L6.25008 17.0833L1.66675 18.3333L2.91675 13.75L14.1667 2.49999Z"
                  stroke="#3460DC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span class="payments__info__receivable">Por cobrar</span
            ><span class="payments__info__amount"> {{ this.RECEIVABLE }} {{ this.CURRENCY }}</span>
          </div>
        </div>
        <div class="flex-nowrap payments__box d-flex gap-4 px-4 py-4 mx-3 justify-content-between">
          <template v-for="(item, index) in db">
            <div :key="index" class="payments__card d-flex justify-content-center align-items-start">
              <!-- <div
            v-if="index === 0 && db.length > 1"
            class="payments__box__addPayment mt-1 d-flex flex-column justify-content-center align-items-center"
          >
            <button
              class="ms-0 mt-2 btn--addPayment--first d-flex justify-content-center align-items-center"
              @click="addPayment"
            >
              +
            </button>
            <p>Agregar Pago</p>
          </div> -->
              <div class="payments__card__box d-flex justify-content-center align-items-center flex-column">
                <!-- Button trigger modal -->
                <a class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div class="card__state d-flex justify-content-center align-items-center">
                    <img class="card__state__pencil" src="../assets/pencil.svg" alt="" />
                  </div>
                </a>
                <p class="card__title mt-2">{{ item.title }}</p>
                <p class="card__info mt-2">
                  <span class="card__info--receivable">{{ item.toBePaid }} {{ CURRENCY }}</span> ({{
                    item.percentage
                  }})%
                </p>
                <p class="card__date mt-1">22 Ene, 2022</p>
              </div>
            </div>
            <div v-if="db.length == 1 || index != lastIndex" class="payments__box__addPayment mt-1">
              <button class="btn--addPayment" @click="addPayment">+</button>
              <p>Agregar Pago</p>
            </div>
          </template>
        </div>
        <!-- <div class="payments__box__addPayment">
        <button class="btn--addPayment" @click="addPayment">+</button>
        <p>Agregar Pago</p>
      </div> -->
      </div>
      <!-- COMPONENTE EDITAR -->
      <!-- COMPONENTE EDITAR -->
      <div v-if="editing" class="payments container-fluid m-0 p-0">
        <div class="payments__info d-flex justify-content-between align-items-center p-4">
          <div class="d-flex justify-content-center align-items-center">
            <h1 class="payments__info__title mb-0 me-2">Pagos</h1>
            <svg width="12" height="9" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L7 7L13 1"
                stroke="#3460DC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div class="d-flex gap-3">
            <button class="btn btn--secondary" @click="savePayment">Guardar</button>
            <span class="payments__info__receivable">Por cobrar</span
            ><span class="payments__info__amount"> {{ this.RECEIVABLE }} {{ this.CURRENCY }}</span>
          </div>
        </div>
        <div class="flex-nowrap payments__box d-flex px-4 py-4 mx-3 justify-content-between">
          <div
            v-for="(item, index) in newDb"
            :key="index"
            class="payments__card d-flex justify-content-center align-items-start"
          >
            <!-- <div
            v-if="index === 0 && db.length > 1"
            class="payments__box__addPayment mt-1 d-flex flex-column justify-content-center align-items-center"
          >
            <button
              class="ms-0 mt-2 btn--addPayment--first d-flex justify-content-center align-items-center"
              @click="addPayment"
            >
              +
            </button>
            <p>Agregar Pago</p>
          </div> -->
            <div class="d-flex justify-content-center align-items-center flex-column">
              <div class="card__state"></div>
              <input class="card__title mt-2" v-model="item.title" />

              <input class="card__info mt-2" maxlength="4" v-model="item.toBePaid" />
              <div>
                <button class="btn--addPayment--first" @click="decreasePercentage(item)">-</button>

                <span>{{ item.percentage }}%</span>
                <button class="btn--addPayment--first" @click="increasePercentage(item)">+</button>
              </div>
              <p class="payments__info__receivable">Vence</p>
              <p class="card__date mt-1">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.6667 2.66667H2.33333C1.59695 2.66667 1 3.26362 1 4V13.3333C1 14.0697 1.59695 14.6667 2.33333 14.6667H11.6667C12.403 14.6667 13 14.0697 13 13.3333V4C13 3.26362 12.403 2.66667 11.6667 2.66667Z"
                    stroke="#1D4ED8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1 6.66666H13"
                    stroke="#1D4ED8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.66663 1.33333V4"
                    stroke="#1D4ED8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.33337 1.33333V4"
                    stroke="#1D4ED8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                22 Ene, 2022
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="payments__box__addPayment">
        <button class="btn--addPayment" @click="addPayment">+</button>
        <p>Agregar Pago</p>
      </div> -->
      </div>
      <!-- <div class="container">
      <div class="d-flex">
        <div v-for="(item, index) in newDb" :key="index" class="card">
          <div><div class="circle">circulo</div></div>
          <input v-model="item.title" />
          <input maxlength="4" v-model="item.toBePaid" />
          <div>
            <button @click="decreasePercentage(item)">-</button>

            <span>{{ item.percentage }}%</span>
            <button @click="increasePercentage(item)">+</button>
          </div>
          <div>22 Ene, 2022</div>
        </div>
      </div>
    </div> -->
    </div>
  </main>
</template>

<script>
const CURRENCY = 'UF'; //Divisa
const RECEIVABLE = 182; //Por cobrar

export default {
  name: 'PaymentsApp',
  data() {
    return {
      CURRENCY,
      RECEIVABLE,
      lastPayment: {},
      newPayment: {},
      db: [{ id: 1, title: 'Anticipo', toBePaid: 182, percentage: 100 }], //Cuotas
      newDb: [],
      editing: false,
    };
  },
  computed: {
    lastIndex: function () {
      let lastIndex = this.db[this.db.length - 1];
      lastIndex = this.db.indexOf(lastIndex);

      return lastIndex;
    },
    receivableValidator: function () {
      let acum = 0;
      console.log(this.db);
      this.db.forEach((item) => {
        acum += item.toBePaid;
        console.log('pe', item.toBePaid);
      });
      console.log('acum', acum);
      return acum;
    },
  },

  methods: {
    rounded(num) {
      let total = Number(num.toFixed(1));

      return total;
    },

    addPayment() {
      this.isEditing();
      this.lastPayment = this.db[this.db.length - 1];

      this.lastPayment.title == 'Anticipo'
        ? this.lastPayment.title
        : (this.lastPayment.title = `Pago ${this.lastPayment.id}`);

      this.newPayment = {
        id: this.db.length,
        title: 'Pago Final',
        toBePaid: this.rounded(this.lastPayment.toBePaid / 2),
        percentage: this.lastPayment.percentage / 2,
      };
      this.lastPayment.toBePaid -= this.newPayment.toBePaid;
      this.lastPayment.toBePaid = this.rounded(this.lastPayment.toBePaid);
      this.lastPayment.percentage /= 2;
      this.newDb = [...this.db, this.newPayment];

      return this.lastPayment;
    },

    savePayment() {
      console.log('hola', this.receivableValidator);
      let isEmpty = Object.keys(this.newPayment).length;

      if (isEmpty) {
        this.db.push(this.newPayment);
      }
      this.editing = false;
      this.newPayment = {};
    },
    increasePercentage(item) {
      if (this.validator(item)) {
        this.db[this.db.length - 1].percentage--;
        item.percentage++;
      }

      return item;
    },
    decreasePercentage(item) {
      if (this.validator(item)) {
        this.db[this.db.length - 1].percentage++;

        item.percentage--;
      }
      return item;
    },
    validator(item) {
      const lastPay = this.db[this.db.length - 1];
      if (lastPay.percentage - 1 < 0 || item.percentage - 1 < 0) {
        return false;
      }
      return true;
    },
    edit() {
      this.newDb = { ...this.db };

      return this.lastPayment;
    },
    isEditing() {
      this.editing = true;
      return this.editing;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

main {
  width: 100%;
  min-width: 380px;
}
.payments {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 1px 0px #e2e8f0;
}
.payments__info {
  border-bottom: 1px solid #f1f5f9;
}
.payments__info__title {
  color: #3460dc;
  font-size: 1.25rem;
  font-weight: 700;
}
.payments__info__receivable {
  font-weight: 400;
  color: #94a3b8;
}
input {
  width: 90px;
}
.payments__info__amount {
  font-weight: 700;
}

.card__state {
  border: 3px solid #1d4ed8;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
.card__state__pencil {
  opacity: 0;
}
.card__state__pencil:hover {
  opacity: 1;
}
.card__title {
  font-size: 1.15rem;
  font-weight: 700;
}
.card__info {
  font-size: 0.8rem;
}
.card__info--receivable {
  font-weight: 700;
}
.card__date {
  font-size: 0.8rem;
}
.payments__box {
  overflow: auto;
}
.payments__card {
  min-width: 17.5%;
}

::-webkit-scrollbar {
  width: 80px; /* Tamaño del scroll en vertical */
  height: 8px; /* Tamaño del scroll en horizontal */
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
.payments__box__addPayment {
  font-size: 0.5rem;
  text-align: center;
  color: #64748b;
}

/* buttons */

.btn--addPayment {
  opacity: 0;
  height: 36px;
  width: 36px;
  background-color: #e2e8f0;
  border-radius: 50%;
  border: none;
  color: #1d4ed8;
  font-size: 1.3rem;
  font-weight: 700;
}
.btn--addPayment--first {
  opacity: 1;
  height: 24px;
  width: 24px;
  background-color: #e2e8f0;
  border-radius: 50%;
  border: none;
  color: #1d4ed8;
  font-size: 1.1rem;
  font-weight: 700;
}
.btn--addPayment--first:hover,
.btn--addPayment:hover {
  opacity: 1;
}

.btn--primary {
  background-color: #ffffff;
  border: none;
  color: #3460dc;
  font-size: 1rem;
  font-weight: 600;
  height: 34px;
}
.btn--secondary {
  background-color: #3460dc;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  height: 34px;
}
</style>
