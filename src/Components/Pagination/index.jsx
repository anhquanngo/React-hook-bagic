import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    Pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
}

function Pagination(props) {
    const { Pagination, onPageChange } = props
    const { _page, _limit, _totalRows } = Pagination
    const end = Math.ceil(_totalRows / _limit)
    //math.ceil 51 / 10 = 5.1 -> = 6

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }

    return (
        <>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >
                Prev
        </button>

            <button
                disabled={_page >= end}
                onClick={() => handlePageChange(_page + 1)}
            >
                Next
        </button>
        </>
    );
}

export default Pagination;