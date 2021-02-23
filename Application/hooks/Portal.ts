import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node.isRequired,
    node: PropTypes.any 
};

const Portal = ({children}) => {
    const el = document.createElement('div');

    useEffect(() => {    
        document.body.appendChild(el);
        
        return () => document.body.removeChild(el); 
    }, [el]);   

    return ReactDOM.createPortal(children, el);
};

Portal.propTypes = propTypes;

export default Portal;