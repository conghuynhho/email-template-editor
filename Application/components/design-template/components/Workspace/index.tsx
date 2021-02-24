import React, {useContext} from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';

const Workspace = () => {
    const {state: store, dispatch: dispatchStore} = useContext(StoreContext);

    console.log(store, 'store');

    return (
        <div>
            <div className={classnames(styles['inner-content'])}>
                This is template
            </div>
        </div>
    );
};

export default Workspace;