import { INCREMENT, DECREMENT } from './counter.types';


    export const increaseCounter = (payload: number) => {

        return {

            type: INCREMENT,
            payload

        };

    };

    export const decreaseCounter = (payload: number) => {

        return {

           type: DECREMENT,
           payload

        };

    };
