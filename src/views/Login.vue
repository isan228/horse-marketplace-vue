<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">🐎</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ $t('auth.loginTitle') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('auth.noAccount') }}
          <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
            {{ $t('auth.registerLink') }}
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
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
              placeholder="Введите ваш пароль"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
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
            <span v-if="isLoading">Вход...</span>
            <span v-else>{{ $t('auth.loginButton') }}</span>
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
  name: 'Login',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    
    const form = reactive({
      email: '',
      password: ''
    })
    
    const errors = reactive({})
    const error = ref('')
    const isLoading = ref(false)
    
    const validateForm = () => {
      errors.value = {}
      
      if (!form.email.trim()) {
        errors.email = 'Введите email'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Введите корректный email'
      }
      
      if (!form.password.trim()) {
        errors.password = 'Введите пароль'
      } else if (form.password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
      }
      
      return Object.keys(errors).length === 0
    }
    
    const handleLogin = async () => {
      if (!validateForm()) {
        return
      }
      
      isLoading.value = true
      error.value = ''
      
      try {
        await authStore.login(form.email, form.password)
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
      handleLogin
    }
  }
}
</script>
