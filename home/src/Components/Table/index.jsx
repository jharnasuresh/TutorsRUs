import styles from "./styles.module.css";

const Table = ({movies}) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Title</p>
                <p className={styles.genre_tab}>Genre</p>
                <p className={styles.rating_tab}>Rating</p>
            </div>
        </div>
    );
};