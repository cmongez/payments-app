<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content px-4">
        <div class="modal-header p-0">
          <h5 class="modal-title pt-4 m-0" id="exampleModalLabel">Modificar estado</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0 pt-3">
          <p>Selecciona el estado en que se encuentra el pago</p>
          <p class="modal-body-status p-0 pt-2">Estado</p>
          <div class="content-select">
            <select v-model="status" class="modal-select py-2 ps-2">
              <option value="pending">Por pagar</option>
              <option value="paid">Pagado</option>
            </select>

            <img class="modal-arrow" src="../assets/arrowSelect.svg" />
          </div>
          <p v-if="status != 'pending'" class="modal-body-status p-0 pt-2">Fecha de pago</p>
          <div v-if="status != 'pending'" class="content-select">
            <select class="modal-select py-2 ps-2">
              <option>{{ payday }}</option>
            </select>
            <img class="modal-calendar" src="../assets/calendar-gray.svg" />
          </div>
        </div>

        <div class="modal-footer">
          <img
            v-if="paymentToEdit.length > 1"
            @click="deletePayment(paymentToEdit)"
            data-bs-dismiss="modal"
            src="../assets/delete.svg"
            alt=""
          />
          <button type="button" @click="changeStatus" class="btn btn--secondary" data-bs-dismiss="modal">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paymentToEdit: {
      type: Object,
    },
  },
  name: 'PaymentsModal',
  data() {
    return {
      status: 'pending',
      payday: '',
    };
  },
  computed: {},
  watch: {
    status() {
      this.getDate();
    },
  },
  methods: {
    deletePayment(paymentToDelete) {
      this.$emit('deletePayment', paymentToDelete);
    },
    changeStatus() {
      if (this.status === 'paid') {
        let dataPaymentPaid = this.paymentToEdit;

        this.$emit('paymentPaid', dataPaymentPaid);
        this.status = 'pending';
      }
    },
    getDate() {
      let currentDay = new Date().toLocaleDateString();
      this.payday = currentDay;
      return currentDay;
    },
  },
};
</script>

<style scoped>
/* modal */
.modal-content {
  border: none;
  border-radius: 8px;
  box-shadow: 0px 1px 0px #e2e8f0;
}
.modal-header,
.modal-body,
.modal-footer {
  border: none;
}
.modal-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;

  letter-spacing: -0.02em;
}
.modal-body,
.modal-body-status {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
.modal-body-status {
  font-family: 'Inter';
  color: #475569;
  font-size: 14px;
  line-height: 20px;
}
/* select styles */
/*reset select styles*/
.content-input input,
.content-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.content-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/*delete select arrow*/

select:focus {
  outline: none;
}
.content-select {
  position: relative;
}
.modal-arrow {
  position: absolute;
  left: 174px;
  top: 19px;
  color: #475569 #64748b;
}
.modal-calendar {
  position: absolute;
  left: 171.5px;
  top: 12px;
  color: #475569 #64748b;
}

.modal-select {
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  height: 44px;
  width: 200px;
  font-size: 14px;
  line-height: 20px;
}
.btn--secondary {
  width: 73px;
  background-color: #3460dc;
  border: none;
  color: #ffffff;
  padding: 8px 12px;
  font-weight: 600;
  height: 34px;
  font-size: 12px;
  line-height: 18px;
  margin-left: 22px;
}
</style>
