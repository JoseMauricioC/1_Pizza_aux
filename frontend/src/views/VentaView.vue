<script setup lang="ts">
import VentaList from '@/components/venta/VentaList.vue';
import { Button } from 'primevue';
import { ref } from 'vue';

const mostrarDialog = ref(false)
const ventaListRef = ref<typeof VentaList | null>(null)

function handleCreate() {
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ventaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="contenedor">
    <h1>Ventas</h1>
    <Button label="Registrar Nueva Venta" icon="pi pi-plus" @click="handleCreate" />
    <VentaList ref="ventaListRef" />
  </div>
</template>

<style scoped>
.contenedor {
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>