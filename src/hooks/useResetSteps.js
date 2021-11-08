import { useLocation, useNavigate } from 'react-router-dom';
import { clearStorage } from '../utils/storage';
import { HISTORY_STATE_KEY } from '../constants';

export default function useResetSteps() {
    const navigate = useNavigate();
    const location = useLocation();

    return () => {
        clearStorage();

        navigate(location.pathname, {
            state: {
                ...location.state,
                [HISTORY_STATE_KEY]: null
            }
        });
    };
}
