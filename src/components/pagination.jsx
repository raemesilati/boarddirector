export const Pagination = ({ start, data, nextPage, prevPage }) => {

    return <div className="pagination">
        {start !== 0 && <button onClick={() => prevPage()} className="prev">
            <img src="/images/arrow.svg" alt="" />
        </button>}
        <span>
            {String(start + 1) + " - " + String(start + 10 > data.length ? data.length : start + 10) + " of " + data.length}
        </span>
        {start + 10 <= data.length && <button onClick={() => nextPage()} className="next">
            <img src="/images/arrow.svg" alt="" />
        </button>}
    </div>
}