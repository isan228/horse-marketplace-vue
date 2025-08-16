<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-primary-800 mb-6">
            {{ $t('home.hero.title') }}
          </h1>
          <p class="text-xl text-primary-700 mb-8 max-w-3xl mx-auto">
            {{ $t('home.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/horses" class="btn-primary text-lg px-8 py-3">
              {{ $t('home.hero.searchButton') }}
            </router-link>
            <router-link to="/sell" class="btn-secondary text-lg px-8 py-3">
              {{ $t('home.hero.sellButton') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.features.title') }}
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🛒</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('home.features.buy.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('home.features.buy.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">💰</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('home.features.sell.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('home.features.sell.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('home.features.secure.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('home.features.secure.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Horses Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('horses.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            Посмотрите последние добавления
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="horse in recentHorses" :key="horse.id" class="card overflow-hidden">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <span class="text-4xl">🐎</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ horse.name }}</h3>
              <p class="text-gray-600 mb-2">{{ horse.breed }}</p>
              <p class="text-gray-600 mb-4">{{ horse.age }} лет • {{ horse.gender === 'male' ? 'Жеребец' : 'Кобыла' }}</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">{{ formatPrice(horse.price) }}</span>
                <router-link :to="`/horses/${horse.id}`" class="btn-primary">
                  {{ $t('horses.viewDetails') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/horses" class="btn-primary text-lg px-8 py-3">
            Смотреть все лошади
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useHorsesStore } from '../stores/horses'
import { computed } from 'vue'

export default {
  name: 'Home',
  setup() {
    const horsesStore = useHorsesStore()
    
    const recentHorses = computed(() => {
      return horsesStore.horses.slice(0, 3)
    })
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(price)
    }
    
    return {
      recentHorses,
      formatPrice
    }
  }
}
</script>
