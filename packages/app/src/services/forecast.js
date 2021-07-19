import client from 'utils/client'

export const search = async location =>
  await client(`forecast?location=${encodeURIComponent(location)}`)
