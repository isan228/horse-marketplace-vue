import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHorsesStore = defineStore('horses', () => {
  const horses = ref([
    {
      id: 1,
      name: 'Буран',
      breed: 'Арабская',
      age: 5,
      gender: 'male',
      height: 155,
      color: 'Гнедая',
      price: 250000,
      location: 'Москва',
      description: 'Красивый арабский жеребец, отличные данные для спорта. Дрессирован, спокойный характер.',
      photos: ['/api/photos/horse1-1.jpg', '/api/photos/horse1-2.jpg'],
      seller: {
        id: 1,
        name: 'Иван Петров',
        phone: '+7 (999) 123-45-67',
        email: 'user@example.com'
      },
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Звездочка',
      breed: 'Тракененская',
      age: 7,
      gender: 'female',
      height: 165,
      color: 'Вороная',
      price: 350000,
      location: 'Санкт-Петербург',
      description: 'Элитная кобыла тракененской породы. Победительница соревнований по выездке.',
      photos: ['/api/photos/horse2-1.jpg', '/api/photos/horse2-2.jpg'],
      seller: {
        id: 2,
        name: 'Мария Сидорова',
        phone: '+7 (999) 234-56-78',
        email: 'maria@example.com'
      },
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Гром',
      breed: 'Ганноверская',
      age: 4,
      gender: 'male',
      height: 170,
      color: 'Рыжая',
      price: 450000,
      location: 'Екатеринбург',
      description: 'Молодой перспективный жеребец ганноверской породы. Идеален для конкура.',
      photos: ['/api/photos/horse3-1.jpg'],
      seller: {
        id: 3,
        name: 'Алексей Козлов',
        phone: '+7 (999) 345-67-89',
        email: 'alex@example.com'
      },
      createdAt: '2024-01-20'
    },
    {
      id: 4,
      name: 'Ласточка',
      breed: 'Орловская рысистая',
      age: 6,
      gender: 'female',
      height: 160,
      color: 'Серая',
      price: 180000,
      location: 'Новосибирск',
      description: 'Красивая кобыла орловской рысистой породы. Отличная для прогулок и обучения.',
      photos: ['/api/photos/horse4-1.jpg', '/api/photos/horse4-2.jpg'],
      seller: {
        id: 4,
        name: 'Елена Волкова',
        phone: '+7 (999) 456-78-90',
        email: 'elena@example.com'
      },
      createdAt: '2024-01-12'
    }
  ])

  const filters = ref({
    breed: '',
    ageMin: '',
    ageMax: '',
    priceMin: '',
    priceMax: '',
    location: '',
    gender: ''
  })

  const sortBy = ref('newest')

  const filteredHorses = computed(() => {
    let filtered = [...horses.value]

    if (filters.value.breed) {
      filtered = filtered.filter(horse => 
        horse.breed.toLowerCase().includes(filters.value.breed.toLowerCase())
      )
    }

    if (filters.value.ageMin) {
      filtered = filtered.filter(horse => horse.age >= parseInt(filters.value.ageMin))
    }

    if (filters.value.ageMax) {
      filtered = filtered.filter(horse => horse.age <= parseInt(filters.value.ageMax))
    }

    if (filters.value.priceMin) {
      filtered = filtered.filter(horse => horse.price >= parseInt(filters.value.priceMin))
    }

    if (filters.value.priceMax) {
      filtered = filtered.filter(horse => horse.price <= parseInt(filters.value.priceMax))
    }

    if (filters.value.location) {
      filtered = filtered.filter(horse => 
        horse.location.toLowerCase().includes(filters.value.location.toLowerCase())
      )
    }

    if (filters.value.gender) {
      filtered = filtered.filter(horse => horse.gender === filters.value.gender)
    }

    // Сортировка
    switch (sortBy.value) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  })

  const getHorseById = (id) => {
    return horses.value.find(horse => horse.id === id)
  }

  const addHorse = async (horseData) => {
    // Имитация API запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        const newHorse = {
          id: horses.value.length + 1,
          ...horseData,
          createdAt: new Date().toISOString().split('T')[0],
          photos: ['/api/photos/default-horse.jpg']
        }
        horses.value.push(newHorse)
        resolve(newHorse)
      }, 1000)
    })
  }

  const updateHorse = async (id, horseData) => {
    // Имитация API запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = horses.value.findIndex(horse => horse.id === id)
        if (index !== -1) {
          horses.value[index] = { ...horses.value[index], ...horseData }
          resolve(horses.value[index])
        }
      }, 500)
    })
  }

  const deleteHorse = async (id) => {
    // Имитация API запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = horses.value.findIndex(horse => horse.id === id)
        if (index !== -1) {
          horses.value.splice(index, 1)
        }
        resolve()
      }, 500)
    })
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const setSortBy = (sort) => {
    sortBy.value = sort
  }

  return {
    horses,
    filters,
    sortBy,
    filteredHorses,
    getHorseById,
    addHorse,
    updateHorse,
    deleteHorse,
    setFilters,
    setSortBy
  }
})
