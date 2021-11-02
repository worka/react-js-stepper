import { useHistory } from 'react-router-dom';

export default function useCheckRouter() {
    const history = useHistory();

    if (!history) {
        // help to correctly determine the presence <BrowserRouter/> in the tree components :)
        throw new Error('<Stepper/> component must child the <BrowserRouter/> component');
    }
}
