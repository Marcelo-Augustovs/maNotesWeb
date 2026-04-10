import { HttpInterceptorFn } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { Router } from '@angular/router'
import { inject } from '@angular/core'

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)
  const token = localStorage.getItem('token')

  let authReq = req

  if(token){
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(authReq).pipe(
    catchError(error => {

      if(error.status === 401){
        localStorage.removeItem('token')
        router.navigate(['/login'])
      }

      return throwError(() => error)
    })
  )
}