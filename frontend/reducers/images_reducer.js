import {ImagesActions} from '../actions/images_actions';
import {merge} from 'lodash';

const ImagesReducer = (state = [], action) => {
  const newState = merge({}, state);

  switch(action.type){
    case ImagesActions.RECEIVE_IMAGES:
      return action.images;
    default:
      return state;
  }
};

export default ImagesReducer;