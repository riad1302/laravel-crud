import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail, isMobilePhone, isURL } from "validator";
import BookDataService from "../services/book.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};
const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The name must be between 3 and 20 characters.
        </div>
      );
    }
};
const vphone = (value) => {
    if (!isMobilePhone(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          The is not a valid phone.
        </div>
      );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
};

const vwebsite = (value) => {
    if (!isURL(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          The is not a valid website.
        </div>
      );
    }
};
const BookAdd = () => {
    const navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const initialBookState = {
        id: null,
        name: "",
        email: "",
        age: "",
        website: "",
        phone: "",
    };
    const [currentBook, setCurrentBook] = useState(initialBookState);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrotMessage] = useState([]);

    useEffect(() => {
        
    },[]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    const addBook = (e) => {
        e.preventDefault();
    
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            BookDataService.create(currentBook)
                .then(response => {
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    navigate("/book");
                },
                (error) => {
                    const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    setErrotMessage(message)
                    return Promise.reject();
                }
                )
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <div>
            {currentBook ? (
                <div className="add-form">
                    <h4>Address Book Add</h4>
                    {
                        errorMessage!=""?<p className="alert alert-danger">{errorMessage}</p>:""
                    }
                    
                    <Form onSubmit={addBook} ref={form}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentBook.name || ''}
                                onChange={handleInputChange}
                                validations={[required, vname]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={currentBook.phone || ''}
                                onChange={handleInputChange}
                                validations={[required, vphone]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={currentBook.email || ''}
                                onChange={handleInputChange}
                                validations={[required, validEmail]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">
                               Gender
                                <select className="form-control" id="gender" name="gender" value={currentBook.gender} onChange={handleInputChange}>
                                    <option value="">select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <Input
                                type="number"
                                className="form-control"
                                id="age"
                                name="age"
                                value={currentBook.age || ''}
                                onChange={handleInputChange}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="website"
                                name="website"
                                value={currentBook.website || ''}
                                onChange={handleInputChange}
                                validations={[required, vwebsite]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="nationality"
                                name="nationality"
                                value={currentBook.nationality || ''}
                                onChange={handleInputChange}
                                validations={[required]}
                            />
                        </div>
                        
                        
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={addBook}
                    >
                        Add
                    </button>
                    <p>{message}</p>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a BookAdd...</p>
                </div>
            )}
        </div>
    );
};

export default BookAdd;
