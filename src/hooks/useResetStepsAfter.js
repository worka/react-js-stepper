import { useLocation, useNavigate } from 'react-router-dom';
import { addData } from '../utils/storage';
import { HISTORY_STATE_KEY } from '../constants';

export default function useResetStepsAfter() {
    const navigate = useNavigate();
    const location = useLocation();

    return (key, ...keys) => {
        if (Array.isArray(keys)) {
            keys.forEach(_key => addData({ [_key]: null }));
        }

        navigate(location.pathname, {
            state: {
                ...location.state,
                [HISTORY_STATE_KEY]: key
            }
        });
    };
}
