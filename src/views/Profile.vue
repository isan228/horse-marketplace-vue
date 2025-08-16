<template>
  <div class="profile-page">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('profile.title') }}</h1>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Personal Information -->
      <div class="lg:col-span-1">
        <div class="card p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">{{ $t('profile.personalInfo') }}</h2>
            <button @click="toggleEdit" class="btn-secondary text-sm">
              {{ isEditing ? $t('profile.cancel') : $t('profile.edit') }}
            </button>
          </div>
          
          <div v-if="!isEditing" class="space-y-4">
            <div>
              <span class="text-sm text-gray-500">{{ $t('auth.name') }}</span>
              <p class="font-medium">{{ user.name }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('auth.email') }}</span>
              <p class="font-medium">{{ user.email }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('auth.phone') }}</span>
              <p class="font-medium">{{ user.phone }}</p>
            </div>
          </div>
          
          <form v-else @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('auth.name') }}
              </label>
              <input
                v-model="editForm.name"
                type="text"
                class="input-field"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('auth.phone') }}
              </label>
              <input
                v-model="editForm.phone"
                type="tel"
                class="input-field"
                required
              />
            </div>
            <div class="flex space-x-2">
              <button type="submit" class="btn-primary flex-1">
                {{ $t('profile.save') }}
              </button>
              <button type="button" @click="toggleEdit" class="btn-secondary flex-1">
                {{ $t('profile.cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- My Horses -->
      <div class="lg:col-span-2">
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ $t('profile.myHorses') }}</h2>
          
          <div v-if="myHorses.length > 0" class="space-y-4">
            <div v-for="horse in myHorses" :key="horse.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span class="text-2xl">🐎</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ horse.name }}</h3>
                    <p class="text-gray-600">{{ horse.breed }} • {{ horse.age }} лет</p>
                    <p class="text-primary-600 font-semibold">{{ formatPrice(horse.price) }}</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <router-link :to="`/horses/${horse.id}`" class="btn-secondary text-sm">
                    {{ $t('horses.viewDetails') }}
                  </router-link>
                  <button @click="deleteHorse(horse.id)" class="btn-secondary text-sm text-red-600 border-red-600 hover:bg-red-50">
                    {{ $t('profile.delete') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">🐎</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('profile.noHorses') }}</h3>
            <p class="text-gray-600 mb-6">Начните продавать своих лошадей</p>
            <router-link to="/sell" class="btn-primary">
              {{ $t('nav.sell') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useHorsesStore } from '../stores/horses'
import { ref, reactive, computed } from 'vue'

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    const horsesStore = useHorsesStore()
    
    const isEditing = ref(false)
    const editForm = reactive({
      name: '',
      phone: ''
    })
    
    const user = computed(() => authStore.user)
    
    const myHorses = computed(() => {
      return horsesStore.horses.filter(horse => horse.seller.id === user.value?.id)
    })
    
    const toggleEdit = () => {
      if (!isEditing.value) {
        editForm.name = user.value.name
        editForm.phone = user.value.phone
      }
      isEditing.value = !isEditing.value
    }
    
    const saveProfile = async () => {
      try {
        await authStore.updateProfile({
          name: editForm.name,
          phone: editForm.phone
        })
        isEditing.value = false
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }
    
    const deleteHorse = async (horseId) => {
      if (confirm('Вы уверены, что хотите удалить эту лошадь?')) {
        try {
          await horsesStore.deleteHorse(horseId)
        } catch (error) {
          console.error('Error deleting horse:', error)
        }
      }
    }
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(price)
    }
    
    return {
      user,
      myHorses,
      isEditing,
      editForm,
      toggleEdit,
      saveProfile,
      deleteHorse,
      formatPrice
    }
  }
}
</script>
