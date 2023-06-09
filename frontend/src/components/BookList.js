import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BookDataService from "../services/book.service";

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
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button type="button" onClick={onClear}>
      {" "}
      X{" "}
    </button>
  </>
);

function AddressBook() {
  const navigate = useNavigate();
  if(!BookDataService.checkUser()){
    window.location.href = '/login';
  }
  const MySwal = withReactContent(Swal)

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.website,
      sortable: false,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
      sortable: false,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: false,
      button: true,
      cell: (row) => [
        <a
          key={row.id}
          title="Edit"
          className="text-info"
          onClick={() => {
            handleButtonClick(row);
          }}
        >
          <FontAwesomeIcon icon={faPen} />{" "}
        </a>,
        <span key="span" className="">
          {" "}
          &nbsp;{" "}
        </span>,
        <a
          key={row.id+'del'}
          title="Delete"
          className="text-danger"
          onClick={() => {
            handleDeleteButtonClick(row);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />{" "}
        </a>,
      ],
    },
  ];
  const handleButtonClick = (states) => {
    if (states.id) {
      navigate(`/book/${states.id}`);
    }
  };
  const handleDeleteButtonClick = (states) => {
    if (states.id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })

          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                BookDataService.remove(states.id)
                .then((response) => {
                    retrieveBooks();
                })
                .catch((e) => {
                    console.log(e);
                })
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
      //navigate(`/book/${states.id}`);
    }
  };
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [page, setPage] = useState(1);
  const countPerPage = 20;
  const retrieveBooks = () => {
    BookDataService.getAll(page, countPerPage)
      .then((response) => {
        setData(response.data.data);
        setTotalData(response.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveBooks();
  }, [page]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div className="col-md-12">
      <h5 className="text-primary">Address Book</h5>
      <DataTable
        columns={columns}
        //data={data}
        data={filteredItems}
        pagination
        paginationServer
        paginationTotalRows={totalData}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        onChangePage={page => setPage(page)}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </div>
  );
}

export default AddressBook;
