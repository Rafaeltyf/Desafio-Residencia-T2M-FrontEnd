import styles from './Message.module.css';

interface IMessage {
    message: string;
    typeMessage: boolean;
}

export function Message({message, typeMessage = false}: IMessage) {
    return (
        <div className={styles.message}>
            <p className={typeMessage ? styles.success : styles.error}>{message}</p>
        </div>
    )
}