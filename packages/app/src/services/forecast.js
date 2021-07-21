import client from 'utils/client'

export const search = async location =>
  await client(`forecast/weekly?location=${encodeURIComponent(location)}`)
