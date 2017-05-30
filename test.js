const taskler = require('./')

const tasks = [{
  title: 'Do something',
  task: ({emit, succeed}) => {
    emit('start')

    setTimeout(() => {
      emit('still working...')
    }, 1000)

    setTimeout(() => {
      succeed()
    }, 2000)
  }
}, {
  title: 'Another task',
  task: ({emit, succeed}) => {
    emit('also starting..')

    setTimeout(() => {
      succeed()
    }, 1500)
  }
}]

taskler(tasks, () => {
  console.log('🎉  All tasks are done')
})
