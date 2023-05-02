import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import BookDataService from "../services/book.service";
const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        },
        {
            name: 'Website',
            selector: row => row.website,
            sortable: false,
        },
        {
            name: 'Nationality',
            selector: row => row.nationality,
            sortable: false,
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: false,
            button:true,
            cell: (row) => [
                <a href="#" key={row.id} className="text-info" onClick={() => {handleButtonClick(row)}}><FontAwesomeIcon icon={faPen}/> </a>,
                <span key="span" className=""> &nbsp; </span>,
                <Link key="2" to="#"  className="text-danger" title="Delete"><FontAwesomeIcon icon={faTrash} /></Link>,
            ]
        },

];

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
    <TextField	id="search"	type="text"	placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
<button type="button" onClick={onClear}> X </button>
</>
);
const handleButtonClick = (states) => {
    console.log(states);
    console.log(states.id);
};



function AddressBook() {
    const [data, setData] = useState([]);
    const retrieveBooks = () => {
        BookDataService.getAll()
            .then((response) => {
                setData(response.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        retrieveBooks();
    }, []);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);
    return (
        <div className="col-md-8 offset-md-2">

        <h5 className="text-primary">Address Book</h5>
    <DataTable
    columns={columns}
    //data={data}
    data={filteredItems}
    pagination
    paginationResetDefaultPage={resetPaginationToggle}
    subHeader
    subHeaderComponent={subHeaderComponentMemo}
    
    />
    </div>
)
}

export default AddressBook
