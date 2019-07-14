import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthtoken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  axios
  .post('/api/users/register', userData)
  .then(res => history.push('/login'))
  .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const loginUser = userdata => dispatch => {
  axios
      .post('/api/users/login', newUser)
      .then(res => {
        //Save to localstorage
        const {token} = res.data;
        //set token to ls
        localStorage.setItem('jwtToken', token);
        //set token to auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //set current user
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        })
      })
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}