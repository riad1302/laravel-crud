import React, { useState, useEffect, useMemo, useRef } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import BookDataService from "../services/book.service";
import { useTable, usePagination } from "react-table";


const BooksList = (props) => {
    let navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const booksRef = useRef();

    booksRef.current = books;

    useEffect(() => {
        retrieveBooks();
    }, []);

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveBooks = () => {
        BookDataService.getAll()
            .then((response) => {
                setBooks(response.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveBooks();
    };

    const findByTitle = () => {
        BookDataService.findByTitle(searchTitle)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openTutorial = (rowIndex) => {
        const id = booksRef.current[rowIndex].id;
        console.log(id)
        //navigate("/book/"+id);
        props.history.push("/book/" + id);
    };

    const deleteBook = (rowIndex) => {
        const id = booksRef.current[rowIndex].id;

        BookDataService.remove(id)
            .then((response) => {
                //props.history.push("/user");
                navigate("/user");

                let newBooks = [...booksRef.current];
                newBooks.splice(rowIndex, 1);

                setBooks(newBooks);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Phone",
                accessor: "phone",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Gender",
                accessor: "gender",
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Nationality",
                accessor: "nationality",
            },
            {
                Header: "Website",
                accessor: "website",
            },
            {
                Header: "Created By",
                accessor: "created_by",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

                            <span onClick={() => deleteBook(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: books,
        });

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BooksList;
