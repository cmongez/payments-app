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
          <p class="modal-body-state p-0 pt-2">Estado</p>
          <div class="content-select">
            <select class="modal-select py-2 ps-2">
              <option disabled value="">Seleccione un elemento</option>
              <option>Por pagar</option>
              <option>Pagado</option>
            </select>
            <img class="modal-arrow" src="../assets/arrowSelect.svg" />
          </div>
          <p class="modal-body-state p-0 pt-2">Fecha de pago</p>
          <div class="content-select">
            <select class="modal-select py-2 ps-2">
              <option>22 de enero, 2022</option>
            </select>
            <img class="modal-calendar" @click="deletePayment(paymentToEdit)" src="../assets/calendar-gray.svg" />
          </div>
        </div>

        <div class="modal-footer">
          <img @click="deletePayment(paymentToEdit)" data-bs-dismiss="modal" src="../assets/delete.svg" alt="" />
          <button type="button" class="btn btn--secondary" data-bs-dismiss="modal">Guardar</button>
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
    return {};
  },
  methods: {
    deletePayment(paymentToDelete) {
      console.log(paymentToDelete);
      this.$emit('deletePayment', paymentToDelete);
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
.modal-body-state {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
.modal-body-state {
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
