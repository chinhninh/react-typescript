import { INCREMENT, DECREMENT } from './counter.types';


    const INITIAL_STATE = {

        count: 0,
    };

    const reducer = (state = INITIAL_STATE, action: any) => {

        switch (action.type) {

            case INCREMENT:

               return {

                 ...state, count: action.payload,

               };

            case DECREMENT:

               return {
                  ...state, count: action.payload,

               };

             default: return state;

        }

    };

    export default reducer;
