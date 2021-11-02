import { useLocation } from 'react-router-dom';
import { HISTORY_STATE_KEY } from '../constants';
import { issetStorage } from '../utils/storage';

export default function useActiveStepKey(defaultStepKey) {
    let { state } = useLocation();

    if (!state) {
        state = { [HISTORY_STATE_KEY]: defaultStepKey };
    }

    if (state[HISTORY_STATE_KEY] !== defaultStepKey && !issetStorage()) {
        state = { [HISTORY_STATE_KEY]: defaultStepKey };
    }

    return state[HISTORY_STATE_KEY];
}
