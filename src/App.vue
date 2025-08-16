<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">🐎</span>
              </div>
              <span class="text-xl font-bold text-primary-600">{{ $t('app.title') }}</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('nav.home') }}
            </router-link>
            <router-link to="/horses" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('nav.horses') }}
            </router-link>
            <router-link to="/sell" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('nav.sell') }}
            </router-link>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="toggleLanguage" 
                class="text-gray-700 hover:text-primary-600 px-2 py-1 rounded text-sm"
              >
                {{ currentLanguage === 'ru' ? 'EN' : 'RU' }}
              </button>
            </div>
            
            <div v-if="!isAuthenticated" class="flex items-center space-x-2">
              <router-link to="/login" class="btn-secondary text-sm">
                {{ $t('auth.login') }}
              </router-link>
              <router-link to="/register" class="btn-primary text-sm">
                {{ $t('auth.register') }}
              </router-link>
            </div>
            
            <div v-else class="flex items-center space-x-2">
              <router-link to="/profile" class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                {{ $t('nav.profile') }}
              </router-link>
              <button @click="logout" class="btn-secondary text-sm">
                {{ $t('auth.logout') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore()
    const { locale } = useI18n()
    
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const currentLanguage = computed(() => locale.value)
    
    const toggleLanguage = () => {
      locale.value = locale.value === 'ru' ? 'en' : 'ru'
    }
    
    const logout = () => {
      authStore.logout()
    }
    
    return {
      isAuthenticated,
      currentLanguage,
      toggleLanguage,
      logout
    }
  }
}
</script>
