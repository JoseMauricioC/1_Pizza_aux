<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import { Button } from 'primevue'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'clientes'
const clientes = ref<Cliente[]>([])

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data)
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table style="border-collapse: collapse; text-align: center" border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="cliente.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text />
            <Button icon="pi pi-trash" aria-label="Eliminar" text severity="danger" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
