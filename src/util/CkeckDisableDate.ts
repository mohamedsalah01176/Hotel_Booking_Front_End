export function isdateDisable(date:Date,disable:Date[]){
  return disable.some(d=>
    d.getFullYear() === date.getFullYear() &&
    d.getMonth() === date.getMonth() &&
    d.getDate() === date.getDate() 
  )
}