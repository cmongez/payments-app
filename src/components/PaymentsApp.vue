<template>
  <div class="container">
    <div class="d-flex gap-4">
      <h1>Pagos</h1>
      <button>Editar</button><span>Por cobrar {{ 182 }}</span
      ><span>{{ this.CURRENCY }}</span>
    </div>
    <div class="d-flex">
      <div class="card">
        <div><div class="circle">circulo</div></div>
        <p>{{ title }}</p>
        <span>{{ this.RECEIVABLE }} {{ this.CURRENCY }} ({{ this.porcent }})%</span>
        <div>22 Ene, 2022</div>
      </div>
      <div><button>+</button></div>
    </div>
  </div>
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

      db: [{ title: 'Anticipo', porcent: 100, instalments: 1 }], //Cuotas
    };
  },
};
</script>

<style>
.circle {
  background: blue;
}
</style>
