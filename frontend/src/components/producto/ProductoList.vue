<script setup lang="ts">
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import { computed, onMounted, ref } from 'vue'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

const ENDPOINT = 'productos'
const productos = ref<Producto[]>([])
const productoDelete = ref<Producto | null>(null)
const mostrarConfirmDialog = ref(false)
const emit = defineEmits(['edit'])
const busqueda = ref<string>('')

async function obtenerLista() {
  productos.value = await http.get(ENDPOINT).then((res) => res.data)
}

const productosFiltrados = computed(() => {
  return productos.value.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(producto: Producto) {
  emit('edit', producto)
}

function confirmarEliminar(producto: Producto) {
  productoDelete.value = producto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${productoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar producto" />
      </InputGroup>
    </div>
    <table border="1" style="border-collapse: collapse; text-align: center">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in productosFiltrados" :key="producto.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img
              v-if="producto.imagen"
              :src="producto.imagen"
              alt="fotografia"
              height="80px"
            />
          </td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <Button icon="pi pi-pencil" @click="emitirEdicion(producto)" text />
            <Button
              icon="pi pi-trash"
              @click="confirmarEliminar(producto)"
              severity="danger"
              text
            />
          </td>
        </tr>
        <tr v-if="productosFiltrados.length === 0">
          <td colspan="7">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      style="width: 25rem"
    >
      <p>
        ¿Estás seguro de que deseas eliminar el producto
        <strong style="color: orange">{{ productoDelete?.nombre }}</strong
        >?
      </p>
      <div class="flex justify-end gap-2 mt-3">
        <Button label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
