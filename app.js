const { createApp, ref, computed, watch, onMounted } = Vue

const STORAGE_KEY = 'taskly_tasks'

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

createApp({
  setup() {
    const tasks = ref(loadTasks())
    const editTask = ref(null)
    const filters = ref({ status: 'all', category: 'all', time: 'all' })
    const form = ref({ title: '', category: 'todo', dueDate: '', error: '' })

    watch(tasks, (val) => saveTasks(val), { deep: true })

    function nextId() {
      return tasks.value.length > 0
        ? Math.max(...tasks.value.map(t => t.id)) + 1
        : 1
    }

    function submit() {
      if (!form.value.title.trim()) {
        form.value.error = 'Nazwa zadania jest wymagana.'
        gsap.fromTo("#form-card",
          { x: -5 }, 
          { x: 5, duration: 0.05, yoyo: true, repeat: 5, onComplete: () => gsap.set("#form-card", { x: 0 }) }
        )
        return
      }
      form.value.error = ''

      if (editTask.value) {
        const idx = tasks.value.findIndex(t => t.id === editTask.value.id)
        if (idx !== -1) {
          tasks.value[idx] = {
            ...tasks.value[idx],
            title: form.value.title.trim(),
            category: form.value.category,
            dueDate: form.value.dueDate || null
          }
        }
        editTask.value = null
        resetForm()
        
        gsap.fromTo("#form-card", 
          { scale: 0.98, borderColor: '#10b981' }, 
          { scale: 1, borderColor: '#e2e8f0', duration: 0.4, ease: "power2.out" }
        )
      } else {
        tasks.value.unshift({
          id: nextId(),
          title: form.value.title.trim(),
          category: form.value.category,
          done: false,
          dueDate: form.value.dueDate || null,
          createdAt: new Date().toISOString()
        })
        resetForm()
      }
    }

    function resetForm() {
      form.value = { title: '', category: 'todo', dueDate: '', error: '' }
    }

    function toggleDone(id) {
      const task = tasks.value.find(t => t.id === id)
      if (task) task.done = !task.done
    }

    function deleteTask(id) {
      tasks.value = tasks.value.filter(t => t.id !== id)
    }

    function startEdit(task) {
      editTask.value = { ...task }
      form.value = {
        title: task.title,
        category: task.category,
        dueDate: task.dueDate ?? '',
        error: ''
      }

      const card = document.getElementById('form-card')
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })

        gsap.timeline()
          .to(card, { scale: 1.02, duration: 0.15, ease: 'power2.out' })
          .to(card, { boxShadow: '0 0 0 2px #4f46e5, 0 4px 20px rgba(79, 70, 229, 0.15)', duration: 0.2 })
          .to(card, { scale: 1, duration: 0.2, ease: 'power2.inOut' })
          .to(card, { boxShadow: '0 2px 10px -3px rgba(6,81,237,0.1)', duration: 0.4, delay: 0.5 })
      }
    }

    function cancelEdit() {
      editTask.value = null
      resetForm()
      
      const card = document.getElementById('form-card')
      if (card) {
        gsap.to(card, { scale: 1, boxShadow: '0 2px 10px -3px rgba(6,81,237,0.1)', duration: 0.3 })
      }
    }

    function formatDate(iso) {
      if (!iso) return ''
      return new Date(iso).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })
    }

    const filteredTasks = computed(() => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      return tasks.value.filter(task => {
        if (filters.value.status === 'active' && task.done) return false
        if (filters.value.status === 'done' && !task.done) return false
        if (filters.value.category !== 'all' && task.category !== filters.value.category) return false

        if (filters.value.time !== 'all') {
          if (!task.dueDate) return false
          const due = new Date(task.dueDate)
          due.setHours(0, 0, 0, 0)
          if (filters.value.time === 'overdue' && (due >= today || task.done)) return false
          if (filters.value.time === 'today' && due.getTime() !== today.getTime()) return false
          if (filters.value.time === 'upcoming' && due < tomorrow) return false
        }

        return true
      })
    })

    onMounted(() => {
      gsap.to(".gsap-init", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
      })
    })

    return { 
      tasks, 
      editTask, 
      filters, 
      form, 
      filteredTasks, 
      submit, 
      toggleDone, 
      deleteTask, 
      startEdit, 
      cancelEdit, 
      formatDate 
    }
  }
}).mount('#app')