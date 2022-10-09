<template>
  <main>
    <div class="container-fluid p-5">
      <div v-if="!editing" class="payments container-fluid m-0 p-0">
        <div class="payments__info d-flex justify-content-between align-items-center">
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
        <PaymentsModal @paymentPaid="onPaymentPaid" @deletePayment="onDeletePayment" :paymentToEdit="paymentToEdit" />
        <div class="flex-nowrap payments__box d-flex justify-content-between">
          <!-- CARDS -->
          <div class="d-flex" v-for="(item, index) in db" :key="index">
            <div class="payments__card d-flex">
              <div class="payments__card__box d-flex justify-content-center align-items-center flex-column">
                <!-- Button modal -->

                <div>
                  <!-- <div v-if="index !== 0" class="position-relative"><div class="lineai"></div></div>
                  <div v-if="index !== 0" class="position-relative"><div class="lineai"></div></div> -->
                  <a
                    v-if="item.status === 'pending'"
                    class="d-flex letra"
                    @click="editPayment(item, index)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <div class="card__status position-relative d-flex justify-content-center align-items-center">
                      <img
                        v-if="item.status === 'pending'"
                        class="card__status__pencil"
                        src="../assets/pencil.svg"
                        alt=""
                      />
                      <img v-else src="../assets/paid.svg" />
                    </div>
                  </a>
                  <div class="lineaC"><div class="linead"></div></div>
                </div>
                <!-- BOTON PAGADO -->
                <a v-if="item.status === 'paid'" class="">
                  <div class="card__status--paid d-flex justify-content-center align-items-center">
                    <img src="../assets/paid.svg" />
                  </div>
                </a>
                <p class="card__title mt-2">{{ item.title }}</p>
                <p class="card__info mt-2">
                  <span class="card__info--receivable">{{ item.toBePaid }} {{ CURRENCY }}</span> ({{
                    item.percentage
                  }})%
                </p>
                <p class="card__date">
                  <span class="card__date__paid" v-if="item.status === 'paid'">Pagado </span>
                  <span :class="item.status === 'paid' ? 'card__date__paid' : 'card__date'">{{ item.date }}</span>
                </p>
              </div>
            </div>

            <div
              v-if="
                (db.length === 1 && item.status === 'pending') || (item.status === 'pending' && index !== lastIndex)
              "
              class="payments__box__addPayment mt-2"
            >
              <button class="btn--addPayment" @click="addPayment(index)">+</button>
              <p>Agregar Pago</p>
            </div>
          </div>
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
        <div class="flex-nowrap payments__box d-flex gap-2">
          <div v-for="(item, index) in db" :key="index">
            <div class="edit__card payments__card d-flex justify-content-center align-items-center flex-column">
              <div v-if="item.status === 'pending'" class="card__status"></div>
              <a v-else class="">
                <div class="card__status--paid d-flex justify-content-center align-items-center">
                  <img src="../assets/paid.svg" />
                </div>
              </a>
              <input v-if="item.status === 'pending'" class="card__title--input mt-2" v-model="item.title" />
              <p v-else class="edit__title--paid mt-2">{{ item.title }}</p>

              <div class="position-relative d-flex mt-2">
                <input
                  v-if="item.status === 'pending'"
                  class="edit__info--input"
                  type="number"
                  readonly
                  :max="RECEIVABLE"
                  v-model="item.toBePaid"
                />
                <p class="edit__info--paid" v-else>{{ item.toBePaid }} {{ CURRENCY }}</p>
                <span v-if="item.status === 'pending'" class="edit__info__currency" id="basic-addon1">{{
                  CURRENCY
                }}</span>
              </div>
              <div class="edit__info__percerntage mt-2">
                <button
                  v-if="item.status === 'pending'"
                  class="btn--addPayment--percentage"
                  @click="decreasePercentage(item, index)"
                >
                  -
                </button>

                <span>{{ item.percentage }}%</span>
                <button
                  v-if="item.status === 'pending'"
                  class="btn--addPayment--percentage"
                  @click="increasePercentage(item, index)"
                >
                  +
                </button>
              </div>
              <div class="edit__date">
                <p
                  v-if="item.status === 'pending'"
                  class="card__date__expiration card__date__expiration__color align-self-start"
                >
                  Vence
                </p>
                <p v-else class="card__date__expiration card__date__paid align-self-start">Pagado</p>
                <p :class="[item.status === 'paid' ? 'card__date__paid' : '', 'card__date mt-1 align-self-start']">
                  <img src="../assets/calendar.svg" alt="" /> {{ item.date }}
                </p>
              </div>
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
const datos = [
  { id: 1, title: 'Anticipo', toBePaid: 182, percentage: 100, status: 'pending', date: '22 Ene, 2022' },
  { id: 1, title: 'Anticipo', toBePaid: 182, percentage: 100, status: 'pending', date: '22 Ene, 2022' },
  { id: 1, title: 'Anticipo', toBePaid: 182, percentage: 100, status: 'pending', date: '22 Ene, 2022' },
];
export default {
  name: 'PaymentsApp',
  components: {
    PaymentsModal,
  },
  data() {
    return {
      CURRENCY,
      RECEIVABLE,
      firstRECEIVABLE: RECEIVABLE,
      previousPayment: {},
      newPayment: {},
      db: datos, //Cuotas
      paymentToEdit: {},
      editing: false,
      currentDay: '',
    };
  },
  computed: {
    lastIndex() {
      let lastIndex = this.db[this.db.length - 1];
      lastIndex = this.db.indexOf(lastIndex);
      console.log(lastIndex);

      return lastIndex;
    },
  },

  methods: {
    receivableValidator() {
      let acum = 0;
      this.db.forEach((item) => {
        if (item.status === 'pending') {
          acum = Number(acum) + Number(item.toBePaid);
        }
        acum = Number(acum).toFixed(1);
      });

      let result = acum - this.RECEIVABLE;

      return result;
    },
    parseDateToSpa() {
      let date = new Date();
      const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', ' Dic'];

      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let currentDay = `${day} ${MONTHS[month]}, ${year} `;

      this.currentDay = currentDay;
      return currentDay;
      // 22 Ene, 2022
    },
    rounded(num) {
      let total = Number(num.toFixed(1));

      return total;
    },

    addPayment(index) {
      this.isEditing();

      this.previousPayment = this.db[index];
      if (index === 0) {
        this.previousPayment = this.db[index];
        if (this.previousPayment.status === 'paid') {
          this.previousPayment = this.db[index + 1];
        }
      } else if (this.previousPayment.status === 'paid') {
        this.previousPayment = this.db[index + 1];
      } else {
        this.previousPayment = this.db[index];
      }
      let date = this.parseDateToSpa();
      this.newPayment = {
        id: this.db.length,
        title: 'Nuevo',
        toBePaid: this.rounded(this.previousPayment.toBePaid / 2),
        percentage: this.previousPayment.percentage / 2,
        status: 'pending',
        date: date,
      };
      this.previousPayment.toBePaid -= this.newPayment.toBePaid;
      this.previousPayment.toBePaid = this.rounded(this.previousPayment.toBePaid);
      this.previousPayment.percentage /= 2;
      this.db.push(this.newPayment);
      this.newPayment = {};
      this.previousPayment = {};
      return this.previousPayment;
    },

    savePayment() {
      if (this.receivableValidator() === 0) {
        this.editing = false;
      } else {
        alert(`ERROR: La suma de los pagos debe ser igual a la deuda: ${this.RECEIVABLE}`);
      }
    },

    increasePercentage(item, index) {
      if (this.incrementValidator(item, index)) {
        let clickedPayment = this.db[index];
        let previousPayment = this.db[index - 1];

        if (index === 0) {
          this.db[index + 1].percentage--;
          clickedPayment.percentage++;
          clickedPayment.toBePaid = this.rounded((clickedPayment.percentage * this.firstRECEIVABLE) / 100);
          this.db[index + 1].toBePaid = this.rounded((this.db[index + 1].percentage * this.firstRECEIVABLE) / 100);
        } else {
          previousPayment.percentage--;
          clickedPayment.percentage++;
          clickedPayment.toBePaid = this.rounded((clickedPayment.percentage * this.firstRECEIVABLE) / 100);
          previousPayment.toBePaid = this.rounded((previousPayment.percentage * this.firstRECEIVABLE) / 100);
        }
      }

      return item;
    },
    decreasePercentage(item, index) {
      if (this.decreaseValidator(item, index)) {
        if (index === 0) {
          this.db[index + 1].percentage++;
          this.db[index + 1].toBePaid = (this.db[index + 1].percentage * this.firstRECEIVABLE) / 100;
          item.percentage--;
          item.toBePaid = (item.percentage * this.firstRECEIVABLE) / 100;
        } else {
          this.db[index - 1].percentage++;
          item.percentage--;
          item.toBePaid = (item.percentage * this.firstRECEIVABLE) / 100;
        }
      }

      return item;
    },
    incrementValidator(item, index) {
      let { percentage } = index === 0 ? this.db[index + 1] : this.db[index - 1];

      if (percentage - 1 < 0) {
        return false;
      } else {
        return true;
      }
    },
    decreaseValidator(item, index) {
      let { percentage } = index === 0 ? this.db[index + 1] : this.db[index];

      if (percentage - 1 < 0) {
        return false;
      } else {
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
    },
    // Listening emits
    onDeletePayment(paymentToDelete) {
      let { payment } = paymentToDelete;
      let deleteValidator = this.rounded(this.RECEIVABLE - payment.toBePaid);
      if (deleteValidator > 0) {
        let { payment, index } = paymentToDelete;
        let newDb = this.db.filter((item) => item !== payment);

        let indexToDelete = index === 0 ? index + 1 : index - 1;

        this.db[indexToDelete].percentage += this.db[index].percentage;
        this.db[indexToDelete].toBePaid += this.db[index].toBePaid;
        this.db = newDb;
        return;
      }
      return alert('No puedes eliminar el ultimo pago porque aun queda deuda pendiente');
    },
    onPaymentPaid(dataPaymentPaid) {
      let { index } = dataPaymentPaid;

      this.db[index].status = 'paid';
      this.RECEIVABLE = this.rounded(this.RECEIVABLE - this.db[index].toBePaid);
    },
  },
  async beforeMount() {
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
  width: 848px;
}
.payments__info {
  max-height: 76px;
  border-bottom: 1px solid #f1f5f9;
  padding: 21px 24px;
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
.card__status--paid {
  border: 3px solid #10b981;
  background-color: #10b981;
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
.card__title--input {
  font-size: 1.15rem;
  font-weight: 700;
  border: 1px solid #94a3b8;
  border-radius: 3px;
  height: 28px;
  width: 120px;
  padding-left: 4px;
  line-height: 28px;
}
.edit__title--paid {
  font-size: 1.15rem;
  font-weight: 700;
  height: 28px;
  width: 120px;
  padding-left: 4px;
  line-height: 28px;
}

.edit__info--input {
  font-size: 0.875rem;
  font-weight: 700;
  border: 1px solid #94a3b8;
  border-radius: 3px;
  height: 20px;
  width: 120px;
  padding-left: 4px;
  line-height: 20px;
}
.edit__info--paid {
  font-size: 0.875rem;
  font-weight: 700;

  height: 20px;
  width: 120px;
  padding-left: 4px;
  line-height: 20px;
}
.edit__info__currency {
  font-size: 0.875rem;
  position: absolute;
  font-weight: 600px;
  right: 20px;
  color: #94a3b8;
}

.card__info {
  font-size: 0.8rem;
  font-weight: 600;
}
.edit__info--input {
  font-size: 0.8rem;
}
.edit__info__percerntage {
  width: 120px;
}
.card__info--receivable {
  font-weight: 700;
}
.card__date {
  font-size: 0.875rem;
}
.card__date__paid {
  color: #059669;
}
.card__date__expiration {
  line-height: 20px;
  font-weight: 400;

  text-align: start;
  font-size: 0.875rem;
  margin-top: 10px;
}
.card__date__expiration__color {
  color: #94a3b8;
}
.card__date img {
  position: relative;
  bottom: 2px;
}
.edit__date {
  width: 120px;
}
.payments__box {
  overflow: auto;
  padding: 32px 24px 34px 29px;
}

.payments__card__box {
  /* width: 120px; */
  height: 137px;
}
.edit__card {
  width: 120px;
  height: 218px;
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
.btn--addPayment--percentage {
  height: 24px;
  width: 24px;
  background-color: #f8fafc;
  border-radius: 50%;
  border: none;
  color: #3460dc;
  font-size: 1.1rem;
  font-weight: 700;
}
.btn--addPayment--percentage:hover,
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

.lineaC {
  position: relative;
  right: -28px;
  width: 100px;
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: red;
  z-index: 0;
}
.linead {
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: blue;
}

/* .lineai {
  height: 5px;
  background-color: blue;
  width: 150px;
  position: absolute;
  top: 50%;
  right: -1px;
}
.linead {
  height: 10px;
  background-color: #059669;
  width: 150px;
  position: absolute;
  top: 50%;
  left: -2px;
}
.letra {
  background-color: white;
  z-index: 200;
} */
</style>
