import { useHistory, useLocation } from 'react-router-dom';
import { clearStorage } from '../utils/storage';
import { HISTORY_STATE_KEY } from '../constants';

export default function useResetSteps() {
    const history = useHistory();
    const location = useLocation();

    return () => {
        clearStorage();

        history.push({
            ...location,
            state: {
                ...location.state,
                [HISTORY_STATE_KEY]: null
            }
        });
    };
}
