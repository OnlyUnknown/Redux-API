import { useSelector, useDispatch } from "react-redux"
import { getUsersStatus,getUsersError,fetchUser } from "../store/users/usersSlice"
import { useEffect } from "react"

const Fetched = () => {
    const dispatch = useDispatch()
    const fetchStatus = useSelector(getUsersStatus)
    const fetchError = useSelector(getUsersError)
    const {isLoading,users,error} = useSelector((store) => store.user)
    
    useEffect(() => {
        
            dispatch(fetchUser())
        
    }, [dispatch])

   if(isLoading === true){
        return <div>Loading</div>
   }
   
   if (error) {
    return <p>{error}</p>
   
   }  
  
   if(isLoading === false){
   return (
    <div>
    {users.results.map(user => {
      
      return (
        <ul key={user.login.uuid}>
          <li>First Name: {user.name.first}</li>
          <li>Last Name: {user.name.last}</li>
        </ul>
      );
    })}
  </div>
  );
}
}

export default Fetched