import { Component, type ReactNode } from 'react';
import styles from './container.module.scss';

type Props = {
  children: ReactNode;
};

export default class Container extends Component<Props> {
  render() {
    const { children } = this.props;
    return <div className={styles.container}>{children}</div>;
  }
}
