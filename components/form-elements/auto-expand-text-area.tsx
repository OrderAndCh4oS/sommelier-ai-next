import styles from "./styles.module.css";
import {forwardRef, HTMLProps} from "react";

const AutoExpandTextArea = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => {
    const {children, ...rest} = props;
    return <div
        ref={ref}
        className={styles.textField}
        role="textbox"
        contentEditable={true}
        {...rest}
    >{children}</div>
});

AutoExpandTextArea.displayName = 'AutoExpandTextArea';

export default AutoExpandTextArea;
