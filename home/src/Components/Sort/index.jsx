import styles from "./styles.module.css"

const Sort = ({sort, setSort}) => {
    const onSelectChange = ({currentTarget:input}) => {
        setSort({sort: input.value, order:sort.order});
    };
    const onArrowChange = () => {
        if (sort.order === "asc") {
            setSort({sort: sort.sort, order: "desc"});
        } else {
            setSort({sort: sort.sort, order: "asc"});
        }
    }



    return (
        <div className={styles.container}>
            <p className={styles.sory_by}>Sort By:</p>
            <select 
            className={styles.select}
            defaultValue={sort.sort}
            onChange={onSelectChange}>
                <option value ="year">Price</option>
                <option value ="rating">Rating</option>
            </select>
            <button className={styles.arrow_btn} onClick={onArrowChange}>
                <p className={styles.up_arrow}>&uarr;</p>
                <p className={styles.down_arrow}>&darr;</p>
            </button>
        </div>
    )
}
export default Sort;