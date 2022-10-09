<!-- eslint-disable vue/require-v-for-key -->
<template>
  <main>
    <div class="container-fluid p-5">
      <div v-if="!editing" class="payments container-fluid m-0 p-0">
        <div class="payments__info d-flex justify-content-between align-items-center p-4">
          <div class="d-flex justify-content-center align-items-center">
            <h1 class="payments__info__title mb-0 me-2">Pagos</h1>
            <img src="../assets/arrowPayments.svg" alt="" />
          </div>

          <div @click="isEditing()" class="d-flex gap-3">
            <button class="btn--primary">
              Editar
              <img src="../assets/pencil.svg" alt="" />
            </button>
            <span class="payments__info__receivable align-middle">Por cobrar</span
            ><span class="payments__info__amount"> {{ this.RECEIVABLE }} {{ this.CURRENCY }}</span>
          </div>
        </div>
        <div class="flex-nowrap payments__box d-flex px-4 py-4 mx-3">
          <!-- CARDS -->
          <template v-for="(item, index) in db">
            <div :key="index" class="payments__card d-flex position-relative">
              <div class="payments__card__box d-flex justify-content-center align-items-center flex-column">
                <!-- Button modal -->
                <PaymentsModal @deletePayment="onDeletePayment" :paymentToEdit="paymentToEdit" />

                <a class="" @click="editPayment(item, index)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div class="card__status d-flex justify-content-center align-items-center">
                    <img class="card__status__pencil" src="../assets/pencil.svg" alt="" />
                  </div>
                </a>
                <p class="card__title mt-2">{{ item.title }}</p>
                <p class="card__info mt-2">
                  <span class="card__info--receivable">{{ item.toBePaid }} {{ CURRENCY }}</span> ({{
                    item.percentage
                  }})%
                </p>
                <p class="card__date mt-2">{{ item.date }}</p>
              </div>
            </div>

            <div v-if="db.length == 1 || index != lastIndex" class="payments__box__addPayment mt-1">
              <button class="btn--addPayment" @click="addPayment">+</button>
              <p>Agregar Pago</p>
            </div>
          </template>
        </div>
      </div>
      <!-- COMPONENTE EDITAR -->
      <div v-if="editing" class="payments container-fluid m-0 p-0">
        <div class="payments__info d-flex justify-content-between align-items-center p-4">
          <div class="d-flex justify-content-center align-items-center">
            <h1 class="payments__info__title mb-0 me-2">Pagos</h1>
            <img src="../assets/arrowPayments.svg" alt="" />
          </div>

          <div class="d-flex gap-3">
            <button class="btn btn--secondary" @click="savePayment">Guardar</button>
            <span class="payments__info__receivable align-middle">Por cobrar</span
            ><span class="payments__info__amount"> {{ this.RECEIVABLE }} {{ this.CURRENCY }}</span>
          </div>
        </div>
        <div class="flex-nowrap payments__box d-flex px-4 py-4 mx-3 justify-content-between">
          <div
            v-for="(item, index) in db"
            :key="index"
            class="payments__card d-flex justify-content-center align-items-start"
          >
            <div class="d-flex justify-content-center align-items-center flex-column">
              <div class="card__status"></div>
              <input class="card__title mt-2" v-model="item.title" />

              <input
                class="card__info mt-2"
                type="number"
                min="0"
                :max="RECEIVABLE"
                minlength="1"
                maxlength="4"
                step="0.01"
                v-model="item.toBePaid"
              />
              <div>
                <button class="btn--addPayment--first" @click="decreasePercentage(item, index)">-</button>

                <span>{{ item.percentage }}%</span>
                <button class="btn--addPayment--first" @click="increasePercentage(item, index)">+</button>
              </div>
              <p class="payments__info__receivable">Vence</p>
              <p class="card__date mt-1"><img src="../assets/calendar.svg" alt="" /> {{ item.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PaymentsModal from '@/components/PaymentsModal.vue';
const CURRENCY = 'UF'; //Divisa
const RECEIVABLE = 182; //Por cobrar

export default {
  name: 'PaymentsApp',
  components: {
    PaymentsModal,
  },
  data() {
    return {
      CURRENCY,
      RECEIVABLE,
      previousPayment: {},
      newPayment: {},
      db: [{ id: 1, title: 'Anticipo', toBePaid: 182, percentage: 100, status: 'pending', date: this.firstDate }], //Cuotas
      paymentToEdit: {},
      editing: false,
      firstDate: '',
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
    parseDateToSpa() {
      let date = new Date();
      const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', ' Dic'];
      this.firstDate = date.toLocaleString();
      let day = date.getDay();
      let month = date.getMonth();
      let year = date.getFullYear();
      let imprimir = `${day} ${MONTHS[month]}, ${year} `;
      console.log(imprimir);
      return imprimir;
      // 22 Ene, 2022
    },
    rounded(num) {
      let total = Number(num.toFixed(1));

      return total;
    },

    addPayment() {
      this.isEditing();

      let date = new Date().toLocaleDateString();

      this.previousPayment = this.db[this.db.length - 1];

      this.previousPayment.title == 'Anticipo' ? this.previousPayment.title : (this.previousPayment.title = 'Nuevo');

      this.newPayment = {
        id: this.db.length,
        title: 'Pago Final',
        toBePaid: this.rounded(this.previousPayment.toBePaid / 2),
        percentage: this.previousPayment.percentage / 2,
        status: 'pending',
        date: date,
      };
      this.previousPayment.toBePaid -= this.newPayment.toBePaid;
      this.previousPayment.toBePaid = this.rounded(this.previousPayment.toBePaid);
      this.previousPayment.percentage /= 2;
      this.db.push(this.newPayment);

      return this.previousPayment;
    },

    savePayment() {
      this.editing = false;
      this.newPayment = {};
    },

    increasePercentage(item, index) {
      console.log(item, index);
      if (this.incrementValidator(item, index)) {
        if (index === 0) {
          this.db[index + 1].percentage--;
          item.percentage++;
        } else {
          this.db[index - 1].percentage--;
          item.percentage++;
        }
      }

      return item;
    },
    decreasePercentage(item, index) {
      console.log(item, index);
      if (this.decreaseValidator(item, index)) {
        console.log('valide');
        if (index === 0) {
          this.db[index + 1].percentage++;
          item.percentage--;
        } else {
          this.db[index - 1].percentage++;
          item.percentage--;
        }
      }
      console.log(index);

      return item;
    },
    incrementValidator(item, index) {
      let { percentage } = index === 0 ? this.db[index + 1] : this.db[index - 1];

      if (percentage - 1 < 0) {
        console.log('falso');
        return false;
      } else {
        console.log('true');
        return true;
      }
    },
    decreaseValidator(item, index) {
      let { percentage } = index === 0 ? this.db[index + 1] : this.db[index];

      if (percentage - 1 < 0) {
        console.log('falso');
        return false;
      } else {
        console.log('true');
        return true;
      }
    },
    isEditing() {
      this.editing = true;
      return this.editing;
    },
    delete(obj) {
      let arrayNew = (this.db = this.db.filter((item) => {
        item !== obj;
      }));
      this.db = arrayNew;
      return this.db;
    },
    editPayment(payment, index) {
      this.paymentToEdit = { payment, index, length: this.db.length, status: payment.status };
      console.log(this.paymentToEdit);
    },
    // Listening emits
    onDeletePayment(paymentToDelete) {
      let { payment, index } = paymentToDelete;

      let newDb = this.db.filter((item) => item !== payment);

      let indexToDelete = index === 0 ? index + 1 : index - 1;

      this.db[indexToDelete].percentage += this.db[index].percentage;
      this.db[indexToDelete].toBePaid += this.db[index].toBePaid;
      console.log(typeof this.db[indexToDelete].toBePaid);
      console.log(this.db);
      this.db = newDb;
      console.log(this.db);
    },
  },
  async created() {
    await this.parseDateToSpa();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

main {
  margin: 0 auto;
  width: 100%;
  min-width: 380px;
  max-width: 1080px;
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
  line-height: 34px;
  font-weight: 400;
  color: #94a3b8;
}
input {
  width: 90px;
}
.payments__info__amount {
  line-height: 34px;
  font-weight: 700;
}

.card__status {
  border: 3px solid #1d4ed8;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
.card__status__pencil {
  opacity: 0;
}
.card__status__pencil:hover {
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
  opacity: 1;
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
  vertical-align: top;
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
