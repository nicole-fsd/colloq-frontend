import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../data/search';


const UserProfile = () => {
const dispatch = useDispatch();
// let { passedId } = useParams();
let location = useLocation()
// console.log(location.pathname)

const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

// const userId = parseInt(props.match.params.number, 10)
console.log(id)
useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id])

  const user = useSelector((state) => state.search.singleUser);
  
  if (!user) {
    return <div>Sorry, but the user was not found</div>
  }
  return (
    <div>
      <h1>This is the Public profile of:</h1>
      <h2>{user.email}</h2>
      
      <Link to='/'>Back</Link>
    </div>
  )
}

export default UserProfile;
