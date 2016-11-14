class ToastQueue {
  static toastQueue = []
  static processing = false

  // Queue the toast
  static queue (toast, delay) {
    this.toastQueue.push(toast) // Push the toast into the queue array
    if (this.processing === false) {
      this.processQueue(delay) // Process the queue if it's not doing so already
    }
  }

  // Process the queue of toasts
  static processQueue (delay) {
    this.processing = true
    this.toastQueue[0].show = true

    // When the timeout completes, hide the toast and remove it from the queue
    setTimeout(() => {
      this.toastQueue[0].show = false
      this.toastQueue.shift()

      // Continue to process the queue if there are toasts left
      if (this.toastQueue.length > 0) {
        setTimeout(() => {
          this.processQueue(delay)
        }, 500)
      } else {
        this.processing = false
      }
    }, delay)
  }
}

export default ToastQueue
