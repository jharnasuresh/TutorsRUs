import styles from "./styles.module.css";

const Table = ({movies}) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Name</p>
                <p className={styles.genre_tab}>Class</p>
                <p className={styles.rating_tab}>Rating</p>
            </div>
            {movies.map((movie) => (    
                <div className={styles.movie} key={movie._id}>
                    <div className={styles.title_container}>
                        {/* profile picture */}
                        <p className={styles.movie_title}>
                            {movie.name}({movie.year})
                        </p>
                </div>
                <div className={styles.genre_container}>
                    {movie.genre.map((genre, index)=>(
                        <p key = {genre} className = {styles.movie_genre}>
                            {genre}
                            {index !== movie.genre.length - 1 && "/"}
                        </p>
                    ))}
                </div>
                <div className={styles.rating_container}>
                    <img src = "home/public/Images/star.png" alt ="star" classname={styles.star_img}/>
                    <p className={styles.movie_rating}>{movie.rating}</p>
                </div>
            </div>
        ))}
        </div>
    );
};
export default Table;