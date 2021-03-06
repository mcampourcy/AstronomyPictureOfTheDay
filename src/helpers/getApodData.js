import { slugify } from './format'

export const getApodDataSinceDate = async startDate => {
  const requestUrl = `${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}`

  return fetch(requestUrl)
    .then(response => response.json())
    .then(res => res.map(item => ({
      id: `${item.date}-${slugify(item.title)}`,
      ...item,
    })))
    .catch(e => console.error(e))
}
