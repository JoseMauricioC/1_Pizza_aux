<script setup lang="ts">
import ProductoList from '@/components/producto/ProductoList.vue'
import ProductoSave from '@/components/producto/ProductoSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const productoListRef = ref<typeof ProductoList | null>(null)
const productoEdit = ref<any>(null)

function handleCreate() {
  productoEdit.value = null
  mostrarDialog.value = true
}

// function handleEdit(producto: any) {
//   productoEdit.value = producto
//   mostrarDialog.value = true
// }

function handleEdit(producto: any) {
  productoEdit.value = {
    ...producto,
    precio: Number(producto.precio ?? 0),
  }
  mostrarDialog.value = true
}

function handleGuardar() {
  productoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <div>
    <h1>Productos</h1>
    <Button label="Crear Producto" icon="pi pi-plus" @click="handleCreate" />
    <ProductoList ref="productoListRef" @edit="handleEdit" />
    <ProductoSave
      :mostrar="mostrarDialog"
      :producto="productoEdit"
      :modoEdicion="!!productoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
