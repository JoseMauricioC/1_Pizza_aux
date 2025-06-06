<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button } from 'primevue'
import type { Venta } from '@/models/venta'

const ENDPOINT = 'ventas'
const ventas = ref<Venta[]>([])

async function obtenerLista() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table style="border-collapse: collapse" border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(venta, index) in ventas" :key="venta.id">
          <td>{{ index + 1 }}</td>
          <td>{{ venta.cliente.nombre +' '+ venta.cliente.apellido }}</td>
          <td>{{ venta.fecha }}</td>
          <td>{{ venta.total }}</td>
          <td>
            <Button label="Detalles" severity="info" />
            <Button label="Reporte" severity="danger" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>
