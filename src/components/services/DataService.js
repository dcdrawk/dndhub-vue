import axios from 'axios'

export default class DataService {
  static dataVersion = '1'

  // Get game data
  static get (data) {
    return new Promise((resolve, reject) => {
      if (window.localStorage.getItem(`${data}-data`) && window.localStorage.getItem(`${data}-version`) === this.dataVersion) {
        resolve(window.JSON.parse(window.localStorage.getItem(`${data}-data`)))
      } else {
        axios.get(`/static/data/${data}.json`).then(response => {
          window.localStorage.setItem(`${data}-version`, this.dataVersion)
          window.localStorage.setItem(`${data}-data`, window.JSON.stringify(response.data[data]))
          resolve(response.data[data])
          // return data
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
}
