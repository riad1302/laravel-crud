import React, { useState, useEffect } from "react";
import BookDataService from "../services/book.service";

const Book = props => {
    const initialBookState = {
        id: null,
        name: "",
        phone: "",
    };
    const [currentBook, setCurrentBook] = useState(initialBookState);
    const [message, setMessage] = useState("");

    const getBook = id => {
        BookDataService.get(id)
            .then(response => {
                setCurrentBook(response.data.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getBook(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    const updateBook = () => {
        BookDataService.update(currentBook.id, currentBook)
            .then(response => {
                console.log(response.data);
                setMessage("The Book was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteBook = () => {
        BookDataService.remove(currentBook.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/user");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentBook ? (
                <div className="edit-form">
                    <h4>Address Book</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentBook.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="number"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={currentBook.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteBook}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateBook}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Book...</p>
                </div>
            )}
        </div>
    );
};

export default Book;
