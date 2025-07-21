import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import ReactQueryProvider from './providers/react-query-provider'
import { router } from './routers'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <RouterProvider router={router}/>
    <Toaster/>
  </ReactQueryProvider>
)
