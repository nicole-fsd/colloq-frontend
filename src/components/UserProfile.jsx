import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../data/search';


const UserProfile = () => {
const dispatch = useDispatch();
let location = useLocation()
const str = location.pathname

//get user id
var n = str.lastIndexOf('/');
var id = str.substring(n + 1);
// console.log('userprofile result:' + id)


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
      
      <Link to='/search'>Back</Link>
    </div>
  )
}

export default UserProfile;
