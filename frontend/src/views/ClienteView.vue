<script setup lang="ts">
import ClienteList from '@/components/cliente/ClienteList.vue'
import ClienteSave from '@/components/cliente/ClienteSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const clienteListRef = ref<typeof ClienteList | null>(null)
const clienteEdit = ref<any>(null)

function handleCreate() {
  clienteEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(cliente: any) {
  clienteEdit.value = cliente
  mostrarDialog.value = true
}

function handleGuardar() {
  clienteListRef.value?.obtenerLista()
}
function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <div>
    <h1>Clientes</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ClienteList ref="clienteListRef"  @edit="handleEdit" />
    <ClienteSave
      :mostrar="mostrarDialog"
      :cliente="clienteEdit"
      :modoEdicion="!!clienteEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
