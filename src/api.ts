import type { ArticleI } from '@/types/types'

const buildType = import.meta.env.VITE_BUILD_TYPE;

const apiHost = (() => {
  switch (buildType) {
    case 'build1':
      return import.meta.env.VITE_API_HOST_1;
    case 'build2':
      return import.meta.env.VITE_API_HOST_2;
    case 'build3':
      return import.meta.env.VITE_API_HOST_3;
    default:
      return import.meta.env.VITE_API_HOST_1;
  }
})();


export const setArticles = async (data: ArticleI[]) => {
  try {
    const response = await fetch(`${apiHost}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const articles = await response.json()
      return articles as ArticleI[]
    } else {
      console.error('Ошибка сервера:', response.statusText)
      return []
    }
  } catch (error) {
    console.error('Ошибка отправки данных:', error)
  }
}

export const getArticles = async () => {
  try {
    const response = await fetch(`${apiHost}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const articles = await response.json()
      return articles as ArticleI[]
    } else {
      console.error('Ошибка запроса на сервер', response.statusText)
      return []
    }
  } catch (error) {
    console.error('Ошибка получения данных:', error)
    return []
  }
}
