const apiHost = import.meta.env.VITE_API_HOST

export const setArticles = async (data: any) => {
  try {
    console.log(JSON.stringify(data));

    const response = await fetch(`${apiHost}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const articles = await response.json()
        return articles
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
    console.log('Получение данных с сервера');

    const response = await fetch(`${apiHost}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const articles = await response.json()
      return articles as string[]
    } else {
      console.error('Ошибка запроса на сервер', response.statusText)
      return []
    }
  } catch (error) {
    console.error('Ошибка получения данных:', error)
    return []
  }
}
