import { useSelector } from "react-redux";
import { SelectLoggedInUser } from "./authSlice";
import { Navigate } from "react-router-dom";

export default function Protected({children})
{
  const user=useSelector(SelectLoggedInUser)
  if(!user)
  {
   return  <Navigate to="/login" replace={true}></Navigate>
  }
  return children
}