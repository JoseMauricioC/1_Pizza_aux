import Axios from 'axios'
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTc0OTIxOTM2OSwiZXhwIjoxNzQ5MjE5NjY5fQ.SiHb5Azj88ZQ7rXcx9C5uoghB6wdh-N9R9Yvk48BFE4',
  },
})

export default axios

// const axios = Axios.create({Add commentMore actions
//   baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
//   headers: { 'Content-type': 'application/json' },
//   headers: {
//     'Content-type': 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NzM1NTk5MCwiZXhwIjoxNzQ3MzU2MDUwfQ.cTzT_JqypirpundzZ5-irAPrBaN8EN_cg5sA24w6dPA',
//   },
// })

// export default axios
