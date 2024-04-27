import { ActionTypes, Action } from './actions.ts';
import { EventsState } from './types.ts';

const initialState: EventsState = {
  events: [],
  event: null,
  error: null
};

const eventsReducer = (state: EventsState = initialState, action: Action): EventsState => {
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS_SUCCESS:
      return { ...state, events: action.payload, error: null };
    case ActionTypes.FETCH_EVENTS_FAILURE:
      return { ...state, events: [], error: action.payload };
      case ActionTypes.FETCH_EVENT_SUCCESS:
        return { ...state, event: action.payload, error: null };
      case ActionTypes.FETCH_EVENT_FAILURE:
        return { ...state, event: null, error: action.payload };
    case ActionTypes.ADD_EVENT_SUCCESS:
      return state; 
    case ActionTypes.ADD_EVENT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default eventsReducer;
