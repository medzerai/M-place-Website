import {React} from 'react';
import './../css/404.css';
import NotFound from './../404.svg';
import { useHistory } from "react-router-dom";
const Erreur404 = () => {
    let history = useHistory();
    return ( 
        <div className='NotFound'>
            <img src={NotFound} draggable="false"/>
            <button onClick={history.goBack} className="btn btn-primary d-block w-100">
            Go back
          </button>
        </div>
     );
}
 
export default Erreur404;