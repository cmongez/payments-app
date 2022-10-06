<template>
  <div class="container">
    <div class="d-flex gap-4">
      <h1>Pagos</h1>
      <button>Editar</button><span>Por cobrar {{ 182 }}</span
      ><span>{{ this.CURRENCY }}</span>
    </div>
    <div class="d-flex">
      <div v-for="(item, index) in db" :key="index" class="card">
        <div><div class="circle">circulo</div></div>
        <p>{{ item.title }}</p>
        <span>{{ RECEIVABLE }} {{ CURRENCY }} ({{ item.percentage }})%</span>
        <div>22 Ene, 2022</div>
      </div>
      <div><button @click="addPayment">+</button></div>
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

      db: [{ id: 1, title: 'Anticipo', percentage: 100, instalments: 1 }], //Cuotas
    };
  },

  methods: {
    addPayment() {
      let lastPayment = this.db[this.db.length - 1];
      console.log(lastPayment.title);
      lastPayment.title == 'Anticipo' ? lastPayment.title : (lastPayment.title = `Pago ${lastPayment.id}`);
      let newPayment = {
        id: this.db.length,
        title: 'Pago Final',
        percentage: lastPayment.percentage / 2,
        instalments: 1,
      };
      lastPayment.percentage /= 2;

      this.db.push(newPayment);
      console.log(this.db);
    },
  },
};
</script>

<style>
.circle {
  background: blue;
}
</style>
