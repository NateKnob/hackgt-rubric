import { SET_CURRENT_USER, CHANGE_PAGE, QUERY_COURSES, VIEW_COURSE } from "./actionTypes";
import axios from "axios";
axios.defaults.withCredentials = true

// Login - get user token
export const getCurrentUser = () => dispatch => {
  axios.get("http://localhost:3000/api/users/me")
    .then(res => {
      dispatch(setCurrentUser(res.data.user));
    });
};

// Register User
export const registerUser = userData => dispatch => {
  axios.post("http://localhost:3000/api/users/register", userData)
    .then(res => {
      getCurrentUser()(dispatch);
    });
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post("http://localhost:3000/api/users/login", userData)
    .then(res => {
      getCurrentUser()(dispatch);
    });
};

// Log user out
export const logoutUser = () => dispatch => {
  axios.post("http://localhost:3000/api/users/logout")
    .then(res => {
      getCurrentUser()(dispatch);
    });
};

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      user: user
    }
  };
};

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: {
    page: page
  }
});

export const queryCourses = params => dispatch => {
  axios.get("http://localhost:3000/api/courses/")
    .then(res => {
      dispatch({
        type: QUERY_COURSES,
        payload: {
          courses: res.data
        }
      })
    });
};

export const viewCourse = (id) => dispatch => {
  console.log("view course")
  axios.get("http://localhost:3000/api/courses/"+id)
    .then(res => {
      dispatch({
        type: VIEW_COURSE,
        payload: {
          course: res.data
        }
      })
    });
};
