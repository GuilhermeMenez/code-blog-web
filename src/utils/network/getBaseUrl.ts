const getBaseUrl = () => {
  return import.meta.env.VITE_MSW_MOCKS === 'true' ? '/' : import.meta.env.VITE_BFF_URL
}

export default getBaseUrl
