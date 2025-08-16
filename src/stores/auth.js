import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  // Заглушки для имитации API
  const mockUsers = [
    {
      id: 1,
      email: 'user@example.com',
      password: 'password123',
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67'
    }
  ]

  const login = async (email, password) => {
    // Имитация API запроса
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password)
        if (user) {
          const userData = { ...user }
          delete userData.password
          user.value = userData
          token.value = 'mock-jwt-token-' + Date.now()
          localStorage.setItem('token', token.value)
          resolve(userData)
        } else {
          reject(new Error('Неверный email или пароль'))
        }
      }, 1000)
    })
  }

  const register = async (userData) => {
    // Имитация API запроса
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === userData.email)
        if (existingUser) {
          reject(new Error('Пользователь с таким email уже существует'))
          return
        }

        const newUser = {
          id: mockUsers.length + 1,
          ...userData
        }
        mockUsers.push(newUser)
        
        const userDataWithoutPassword = { ...newUser }
        delete userDataWithoutPassword.password
        user.value = userDataWithoutPassword
        token.value = 'mock-jwt-token-' + Date.now()
        localStorage.setItem('token', token.value)
        resolve(userDataWithoutPassword)
      }, 1000)
    })
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  const updateProfile = async (profileData) => {
    // Имитация API запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        user.value = { ...user.value, ...profileData }
        resolve(user.value)
      }, 500)
    })
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  }
})
