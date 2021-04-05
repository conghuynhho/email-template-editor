import React from 'react';
import styles from './styles.module.scss';
import {getObjectPropSafely} from 'Utils';
import classnames from 'classnames';

const Alignment = props => {
    return (
        <div className="row-align">
            {
                props.label && (
                    <div className="section-label text-nowrap font-weight-normal" style={{marginBottom: 5}, props.styleLabel}>
                        <span style={{fontSize: 12}}>{props.translate(props.label, props.label)}</span>
                    </div>
                )
            }
            <div className={classnames(styles['bg-item-align'])}>
                <span
                    className={classnames(styles['item-align'], {[styles['active']]: props.value === 'left'})}
                    onClick={() => props.callback('left')}
                >
                    <i className="icon-align-left" />
                </span>
                <span
                    className={classnames(styles['item-align'], {[styles['active']]: props.value === 'center'})}
                    onClick={() => props.callback('center')}
                >
                    <i className="icon-align-center" />
                </span>
                <span
                    className={classnames(styles['item-align'], {[styles['active']]: props.value === 'right'})}
                    onClick={() => props.callback('right')}
                >
                    <i className="icon-align-right" />
                </span>
            </div>
        </div>
    );
};

export default Alignment;