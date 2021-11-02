import { useLocation } from 'react-router-dom';
import { HISTORY_STATE_KEY } from '../constants';

export default function useStepperStateValue() {
    const { state = {} } = useLocation();

    return state[HISTORY_STATE_KEY];
}
