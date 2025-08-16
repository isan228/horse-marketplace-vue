<template>
  <div class="horses-page">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('horses.title') }}</h1>
      <p class="text-gray-600">{{ $t('horses.search') }}</p>
    </div>

    <div class="grid lg:grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Фильтры</h3>
          
          <div class="space-y-4">
            <!-- Breed Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('horses.filters.breed') }}
              </label>
              <input
                v-model="localFilters.breed"
                type="text"
                class="input-field"
                placeholder="Введите породу"
              />
            </div>

            <!-- Age Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('horses.filters.age') }}
              </label>
              <div class="grid grid-cols-2 gap-2">
                <input
                  v-model="localFilters.ageMin"
                  type="number"
                  class="input-field"
                  placeholder="От"
                />
                <input
                  v-model="localFilters.ageMax"
                  type="number"
                  class="input-field"
                  placeholder="До"
                />
              </div>
            </div>

            <!-- Price Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('horses.filters.price') }}
              </label>
              <div class="grid grid-cols-2 gap-2">
                <input
                  v-model="localFilters.priceMin"
                  type="number"
                  class="input-field"
                  placeholder="От"
                />
                <input
                  v-model="localFilters.priceMax"
                  type="number"
                  class="input-field"
                  placeholder="До"
                />
              </div>
            </div>

            <!-- Location Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('horses.filters.location') }}
              </label>
              <input
                v-model="localFilters.location"
                type="text"
                class="input-field"
                placeholder="Введите город"
              />
            </div>

            <!-- Gender Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('horses.filters.gender') }}
              </label>
              <select v-model="localFilters.gender" class="input-field">
                <option value="">{{ $t('horses.filters.all') }}</option>
                <option value="male">{{ $t('horses.filters.male') }}</option>
                <option value="female">{{ $t('horses.filters.female') }}</option>
              </select>
            </div>

            <!-- Apply Filters Button -->
            <button @click="applyFilters" class="btn-primary w-full">
              Применить фильтры
            </button>
          </div>
        </div>
      </div>

      <!-- Horses List -->
      <div class="lg:col-span-3">
        <!-- Sort Controls -->
        <div class="flex justify-between items-center mb-6">
          <p class="text-gray-600">
            Найдено {{ filteredHorses.length }} лошадей
          </p>
          <select v-model="sortBy" class="input-field w-48">
            <option value="newest">{{ $t('horses.sort.newest') }}</option>
            <option value="oldest">{{ $t('horses.sort.oldest') }}</option>
            <option value="priceLow">{{ $t('horses.sort.priceLow') }}</option>
            <option value="priceHigh">{{ $t('horses.sort.priceHigh') }}</option>
          </select>
        </div>

        <!-- Horses Grid -->
        <div v-if="filteredHorses.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="horse in filteredHorses" :key="horse.id" class="card overflow-hidden hover:shadow-lg transition-shadow">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <span class="text-4xl">🐎</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ horse.name }}</h3>
              <p class="text-gray-600 mb-2">{{ horse.breed }}</p>
              <p class="text-gray-600 mb-2">{{ horse.age }} лет • {{ horse.gender === 'male' ? 'Жеребец' : 'Кобыла' }}</p>
              <p class="text-gray-600 mb-4">{{ horse.location }}</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">{{ formatPrice(horse.price) }}</span>
                <router-link :to="`/horses/${horse.id}`" class="btn-primary">
                  {{ $t('horses.viewDetails') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">🐎</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('horses.noResults') }}</h3>
          <p class="text-gray-600">Попробуйте изменить фильтры поиска</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHorsesStore } from '../stores/horses'
import { ref, computed, watch } from 'vue'

export default {
  name: 'Horses',
  setup() {
    const horsesStore = useHorsesStore()
    
    const localFilters = ref({
      breed: '',
      ageMin: '',
      ageMax: '',
      priceMin: '',
      priceMax: '',
      location: '',
      gender: ''
    })
    
    const sortBy = ref('newest')
    
    const filteredHorses = computed(() => horsesStore.filteredHorses)
    
    const applyFilters = () => {
      horsesStore.setFilters(localFilters.value)
    }
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(price)
    }
    
    // Watch for sort changes
    watch(sortBy, (newSort) => {
      horsesStore.setSortBy(newSort)
    })
    
    return {
      localFilters,
      sortBy,
      filteredHorses,
      applyFilters,
      formatPrice
    }
  }
}
</script>
