import {SET_USER_INFO, SUBMIT_PLANET, SUBMIT_VEHICLE} from './Action';

const initialState = {
  token: '',
  planet_name: [],
  vehicle_name: [],
};

const userInfoReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {...istate, ...action.payload};
    case SUBMIT_PLANET:
      return {...istate, planet_name: action.payload.planet};
    case SUBMIT_VEHICLE:
      return {...istate, vehicle_name: action.payload.vehicle};
    default:
      return istate;
  }
};

export default userInfoReducer;
