import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';

function View() {
  const [userDetails, setUserDetails] = useState('')
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    const {userId} = postDetails
    console.log(postDetails);
    firebase.firestore()
    .collection('users')
    .where('id','==',userId)
    .get()
    .then((response)=>{
      response.forEach(doc => {
        console.log(doc.data);
        setUserDetails(doc.data())
      })
    })
  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.CreatedAt}</span>
        </div>
        { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
