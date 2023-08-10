

export const updateTask = async (id, taskToUpdate) => {
    await delay(1000)
    let updatedTask = {}
    tasks = tasks.map((task) => {
      if (task._id === id) {
        updatedTask = { ...task, ...taskToUpdate }
        return updatedTask
      }
      return task
    })
  
    return updatedTask
  }