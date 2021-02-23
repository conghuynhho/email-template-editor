import {useEffect} from 'react';

function useOutsideClick(ref, callback) {
    const handleClick = e => {
        try {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        } catch (e) {
            // handle Error
        }
    };

    useEffect(() => {
        try {
            window.addEventListener('click', handleClick);
            return () => {
                window.removeEventListener('click', handleClick);
            };
        } catch (e) {
            // handle Error
        }
    });
}

export default useOutsideClick;
