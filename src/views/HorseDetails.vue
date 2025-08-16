<template>
  <div v-if="horse" class="horse-details">
    <div class="mb-8">
      <router-link to="/horses" class="text-primary-600 hover:text-primary-700 mb-4 inline-block">
        ← Назад к списку
      </router-link>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Horse Images -->
      <div class="space-y-4">
        <div class="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <span class="text-8xl">🐎</span>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="(photo, index) in horse.photos" :key="index" class="h-20 bg-gray-200 rounded flex items-center justify-center">
            <span class="text-2xl">🐎</span>
          </div>
        </div>
      </div>

      <!-- Horse Information -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ horse.name }}</h1>
          <p class="text-xl text-primary-600 font-semibold">{{ formatPrice(horse.price) }}</p>
        </div>

        <!-- Horse Details -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('horse.details.description') }}</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.breed') }}</span>
              <p class="font-medium">{{ horse.breed }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.age') }}</span>
              <p class="font-medium">{{ horse.age }} лет</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.gender') }}</span>
              <p class="font-medium">{{ horse.gender === 'male' ? 'Жеребец' : 'Кобыла' }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.height') }}</span>
              <p class="font-medium">{{ horse.height }} см</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.color') }}</span>
              <p class="font-medium">{{ horse.color }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.location') }}</span>
              <p class="font-medium">{{ horse.location }}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('horse.details.description') }}</h2>
          <p class="text-gray-700 leading-relaxed">{{ horse.description }}</p>
        </div>

        <!-- Contact Information -->
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('horse.details.contact') }}</h2>
          <div class="space-y-3">
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.seller') }}</span>
              <p class="font-medium">{{ horse.seller.name }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.phone') }}</span>
              <p class="font-medium">{{ horse.seller.phone }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">{{ $t('horse.details.email') }}</span>
              <p class="font-medium">{{ horse.seller.email }}</p>
            </div>
          </div>
          <button class="btn-primary mt-4 w-full">
            {{ $t('horses.contactSeller') }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <div class="text-6xl mb-4">🐎</div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Лошадь не найдена</h3>
    <p class="text-gray-600 mb-4">Запрашиваемая лошадь не существует или была удалена</p>
    <router-link to="/horses" class="btn-primary">
      Вернуться к списку
    </router-link>
  </div>
</template>

<script>
import { useHorsesStore } from '../stores/horses'
import { computed } from 'vue'

export default {
  name: 'HorseDetails',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const horsesStore = useHorsesStore()
    
    const horse = computed(() => {
      return horsesStore.getHorseById(parseInt(props.id))
    })
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(price)
    }
    
    return {
      horse,
      formatPrice
    }
  }
}
</script>
