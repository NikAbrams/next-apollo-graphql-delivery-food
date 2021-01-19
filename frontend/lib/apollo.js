// ApolloClient нужен, чтобы мы могли получать данные из конечной точки graphql в любом дочернем компоненте.
/* Клиент Apollo использует HttpLink для отправки запросов GraphQL на сервер через HTTP. 
Ссылка поддерживает запросы POST и GET и может изменять параметры HTTP для каждого запроса. 
Это удобно при реализации аутентификации, постоянных запросов, динамических URI и других детальных обновлений.*/

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: `${API_URL}/graphql`, // Серверный URL (должен быть абсолютным)
  }),
  cache: new InMemoryCache()
})