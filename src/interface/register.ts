export interface IRnegisterBody{
  name:string,
  email:string,
  password:string,
  phone:string,
  role:"user" | "admin"
}