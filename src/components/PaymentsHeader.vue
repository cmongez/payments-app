<template>
  <div class="payments__info d-flex justify-content-between align-items-center p-4">
    <div class="d-flex justify-content-center align-items-center">
      <h1 class="payments__info__title mb-0 me-2">Pagos</h1>
      <img src="../assets/arrowPayments.svg" alt="" />
    </div>

    <div @click="isEditing(), edit()" class="d-flex gap-3">
      <button v-if="!editing" class="btn--primary">
        Editar
        <img src="../assets/pencil.svg" alt="" />
      </button>
      <button v-else class="btn btn--secondary" @click="savePayment">Guardar</button>
      <span class="payments__info__receivable align-middle">Por cobrar</span
      ><span class="payments__info__amount"> {{ this.RECEIVABLE }} {{ this.CURRENCY }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentsHeader',
  props: {
    editing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
