import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { isTokenExpired } from './auth.utils'

export const authGuard: CanActivateFn = () => {

  const router = inject(Router)
  const token = localStorage.getItem('token')

  if(token && !isTokenExpired(token)){
    return true
  }

  localStorage.removeItem('token')
  router.navigate(['/login'])
  return false
}