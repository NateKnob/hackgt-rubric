import { QUERY_COURSES, VIEW_COURSE } from "../actionTypes";
import _ from 'lodash';

const initialState = {
  page: "index",
  courses: [],
  working_course: null,
  cloud_course: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_COURSE:
      return {
        ...state,
        cloud_course: action.payload.course,
        working_course: _.cloneDeep(action.payload.course)
      };
    case QUERY_COURSES:
      return {
        ...state,
        courses: action.payload.courses
      }
    default:
      return state;
  }
}
