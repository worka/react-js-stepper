import { useNavigate } from 'react-router-dom';

export default function useCheckRouter() {
    const navigate = useNavigate();

    if (!navigate) {
        // help to correctly determine the presence <BrowserRouter/> in the tree components :)
        throw new Error('<Stepper/> component must child the <BrowserRouter/> component');
    }
}
