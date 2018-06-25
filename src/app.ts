import { interval } from 'rxjs'
import { take, skip, switchMap, finalize, map } from 'rxjs/operators'

const streamA$ = interval(1000)
.pipe(
  map(c => `From A: ${ c }`)
)
const streamB$ = interval(200)
  .pipe(
    map(c => `From B: ${ c }`),
    finalize(() => {
      console.log('I\'m done')
    })
  )

streamA$
  .pipe(
    skip(2),
    take(10),
    switchMap(() => streamB$)
  )
  .subscribe((r) => {
    console.log(r)
  })
