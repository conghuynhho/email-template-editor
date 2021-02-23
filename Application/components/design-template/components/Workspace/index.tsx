import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

const Workspace = () => {
    return (
        <div>
            <div className={classnames(styles['inner-content'])}>
                This is template
            </div>
        </div>
    );
};

export default Workspace;