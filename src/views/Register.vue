<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">🐎</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ $t('auth.registerTitle') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('auth.haveAccount') }}
          <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            {{ $t('auth.loginLink') }}
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.name') }}
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Введите ваше имя"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.email') }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Введите ваш email"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.phone') }}
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.phone }"
              placeholder="+7 (999) 123-45-67"
            />
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.password') }}
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Введите пароль"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.confirmPassword') }}
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Подтвердите пароль"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <div>
          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Регистрация...</span>
            <span v-else>{{ $t('auth.registerButton') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

export default {
  name: 'Register',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    
    const form = reactive({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    
    const errors = reactive({})
    const error = ref('')
    const isLoading = ref(false)
    
    const validateForm = () => {
      errors.value = {}
      
      if (!form.name.trim()) {
        errors.name = 'Введите имя'
      }
      
      if (!form.email.trim()) {
        errors.email = 'Введите email'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Введите корректный email'
      }
      
      if (!form.phone.trim()) {
        errors.phone = 'Введите телефон'
      }
      
      if (!form.password.trim()) {
        errors.password = 'Введите пароль'
      } else if (form.password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
      }
      
      if (!form.confirmPassword.trim()) {
        errors.confirmPassword = 'Подтвердите пароль'
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают'
      }
      
      return Object.keys(errors).length === 0
    }
    
    const handleRegister = async () => {
      if (!validateForm()) {
        return
      }
      
      isLoading.value = true
      error.value = ''
      
      try {
        const userData = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password
        }
        
        await authStore.register(userData)
        router.push('/')
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      form,
      errors,
      error,
      isLoading,
      handleRegister
    }
  }
}
</script>
