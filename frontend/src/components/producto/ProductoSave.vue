<script setup lang="ts">
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { ref, computed, watch } from 'vue'

const ENDPOINT = 'productos'

const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({}) as Producto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (val) => {
    if (!val) emit('close')
  },
})

const producto = ref<Producto>({ ...props.producto })
watch(
  () => props.producto,
  (newVal) => {
    producto.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      imagen: producto.value.imagen,
      nombre: producto.value.nombre,
      descripcion: producto.value.descripcion,
      precio: producto.value.precio,
      stock: producto.value.stock,
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    producto.value = {} as Producto
    dialogVisible.value = false
  } catch (err: any) {
    alert(err?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Producto' : 'Crear Producto'"
      style="width: 30rem"
    >
      <!-- <div class="flex items-center gap-4 mb-4">
        <label for="imagen" class="font-semibold w-3">Imagen</label>
        <InputText id="imagen" v-model="producto.imagen" class="flex-auto" autocomplete="off" />
      </div> -->

      <div class="flex items-center gap-4 mb-4">
        <label for="imagen" class="font-semibold w-24">Imagen</label>
        <InputText id="imagen" v-model="producto.imagen" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre:</label>
        <InputText id="nombre" v-model="producto.nombre" class="w-full" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripción:</label>
        <InputText id="descripcion" v-model="producto.descripcion" class="w-full" />
      </div>

      <!-- <div class="flex items-center gap-4 mb-4">
        <FloatLabel>
          <InputNumber
            v-model="producto.precio"
            inputId="precio_input"
            mode="currency"
            currency="BOB"
            locale="es-BO"
            variant="filled"
            class="w-full"
          />
          <label for="precio_input">Precio</label>
        </FloatLabel>
      </div> -->
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-24">Precio (Bs)</label>
        <InputNumber
          id="precio"
          v-model="producto.precio"
          class="flex-auto"
          inputId="precio"
          :min="0"
          :step="0.01"
          mode="decimal"
          :useGrouping="false"
          showButtons
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="stock" class="font-semibold w-4">Stock:</label>
        <InputNumber id="stock" v-model="producto.stock" class="w-full" />
      </div>

      <!-- <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button label="Guardar" icon="pi pi-save" @click="handleSave" />
      </template> -->

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
