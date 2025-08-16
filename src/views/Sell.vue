<template>
  <div class="sell-page">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('sell.title') }}</h1>
      <p class="text-gray-600">Заполните информацию о лошади для продажи</p>
    </div>

    <div class="max-w-2xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ $t('sell.form.title') }}</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Horse Name -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.name') }} *
              </label>
              <input
                v-model="form.name"
                type="text"
                class="input-field"
                :class="{ 'border-red-500': errors.name }"
                required
              />
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <!-- Breed -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.breed') }} *
              </label>
              <input
                v-model="form.breed"
                type="text"
                class="input-field"
                :class="{ 'border-red-500': errors.breed }"
                required
              />
              <p v-if="errors.breed" class="text-red-500 text-sm mt-1">{{ errors.breed }}</p>
            </div>

            <!-- Age -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.age') }} *
              </label>
              <input
                v-model="form.age"
                type="number"
                min="0"
                max="30"
                class="input-field"
                :class="{ 'border-red-500': errors.age }"
                required
              />
              <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</p>
            </div>

            <!-- Gender -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.gender') }} *
              </label>
              <select
                v-model="form.gender"
                class="input-field"
                :class="{ 'border-red-500': errors.gender }"
                required
              >
                <option value="">{{ $t('horses.filters.all') }}</option>
                <option value="male">{{ $t('horses.filters.male') }}</option>
                <option value="female">{{ $t('horses.filters.female') }}</option>
              </select>
              <p v-if="errors.gender" class="text-red-500 text-sm mt-1">{{ errors.gender }}</p>
            </div>

            <!-- Height -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.height') }} *
              </label>
              <input
                v-model="form.height"
                type="number"
                min="100"
                max="200"
                class="input-field"
                :class="{ 'border-red-500': errors.height }"
                required
              />
              <p v-if="errors.height" class="text-red-500 text-sm mt-1">{{ errors.height }}</p>
            </div>

            <!-- Color -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.color') }} *
              </label>
              <input
                v-model="form.color"
                type="text"
                class="input-field"
                :class="{ 'border-red-500': errors.color }"
                required
              />
              <p v-if="errors.color" class="text-red-500 text-sm mt-1">{{ errors.color }}</p>
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.price') }} *
              </label>
              <input
                v-model="form.price"
                type="number"
                min="0"
                class="input-field"
                :class="{ 'border-red-500': errors.price }"
                required
              />
              <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.location') }} *
              </label>
              <input
                v-model="form.location"
                type="text"
                class="input-field"
                :class="{ 'border-red-500': errors.location }"
                required
              />
              <p v-if="errors.location" class="text-red-500 text-sm mt-1">{{ errors.location }}</p>
            </div>

            <!-- Description -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.description') }} *
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="input-field"
                :class="{ 'border-red-500': errors.description }"
                required
              ></textarea>
              <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
            </div>

            <!-- Photos -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('sell.form.photos') }}
              </label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <span class="text-4xl mb-4 block">📷</span>
                <p class="text-gray-600">Загрузите фотографии лошади</p>
                <p class="text-sm text-gray-500 mt-2">Поддерживаются форматы: JPG, PNG</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-4">
          <router-link to="/horses" class="btn-secondary">
            Отмена
          </router-link>
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Публикация...</span>
            <span v-else>{{ $t('sell.form.submit') }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Успешно!</h3>
        <p class="text-gray-600 mb-6">{{ $t('sell.success') }}</p>
        <div class="flex space-x-4">
          <button @click="showSuccess = false" class="btn-secondary flex-1">
            Остаться здесь
          </button>
          <router-link to="/horses" class="btn-primary flex-1">
            К списку лошадей
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHorsesStore } from '../stores/horses'
import { useAuthStore } from '../stores/auth'
import { ref, reactive } from 'vue'

export default {
  name: 'Sell',
  setup() {
    const horsesStore = useHorsesStore()
    const authStore = useAuthStore()
    
    const form = reactive({
      name: '',
      breed: '',
      age: '',
      gender: '',
      height: '',
      color: '',
      price: '',
      location: '',
      description: ''
    })
    
    const errors = reactive({})
    const isSubmitting = ref(false)
    const showSuccess = ref(false)
    
    const validateForm = () => {
      errors.value = {}
      
      if (!form.name.trim()) {
        errors.name = 'Введите кличку лошади'
      }
      
      if (!form.breed.trim()) {
        errors.breed = 'Введите породу'
      }
      
      if (!form.age || form.age < 0 || form.age > 30) {
        errors.age = 'Введите корректный возраст (0-30 лет)'
      }
      
      if (!form.gender) {
        errors.gender = 'Выберите пол'
      }
      
      if (!form.height || form.height < 100 || form.height > 200) {
        errors.height = 'Введите корректный рост (100-200 см)'
      }
      
      if (!form.color.trim()) {
        errors.color = 'Введите масть'
      }
      
      if (!form.price || form.price <= 0) {
        errors.price = 'Введите корректную цену'
      }
      
      if (!form.location.trim()) {
        errors.location = 'Введите местоположение'
      }
      
      if (!form.description.trim()) {
        errors.description = 'Введите описание'
      }
      
      return Object.keys(errors).length === 0
    }
    
    const submitForm = async () => {
      if (!validateForm()) {
        return
      }
      
      isSubmitting.value = true
      
      try {
        const horseData = {
          ...form,
          age: parseInt(form.age),
          height: parseInt(form.height),
          price: parseInt(form.price),
          seller: {
            id: authStore.user.id,
            name: authStore.user.name,
            phone: authStore.user.phone,
            email: authStore.user.email
          }
        }
        
        await horsesStore.addHorse(horseData)
        showSuccess.value = true
        
        // Reset form
        Object.keys(form).forEach(key => {
          form[key] = ''
        })
      } catch (error) {
        console.error('Error adding horse:', error)
      } finally {
        isSubmitting.value = false
      }
    }
    
    return {
      form,
      errors,
      isSubmitting,
      showSuccess,
      submitForm
    }
  }
}
</script>
