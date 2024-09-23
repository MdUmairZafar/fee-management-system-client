import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../user.css";
import axiosInstance from "../../Utils/axiosConfig";

// Define the style for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits")
    .length(11, "Phone number must be 11 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  type: Yup.string().required("Type is required"),
});

const UserModal = ({ values, buttonName }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "",
  });

  useEffect(() => {
    if (values) {
      setInitialValues(values);
    }
  }, []);
  // for creating user
  const createUser = async (data) => {
    try {
      const response = await axiosInstance.post("/user", data);
      console.log("User created: ", response.data);
    } catch (error) {
      console.log("Error in creating user: ", error);
    }
  };
  const editUser = async (data) => {
    try {
      const response = await axiosInstance.put(`/user/${data._id}`, data);
      console.log("User updated: ", response.data);
    } catch (error) {
      console.log("Error in updating user: ", error);
    }
  };
  // Form submission handler
  const onSubmit = (values) => {
    if (buttonName === "Create User") {
      createUser(values);
      console.log("create user");
    } else {
      editUser(values);
    }
    console.log("Form values: ", values);
    handleClose(); // Close the modal after submission
  };

  // Modal open/close handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="action-button" onClick={handleOpen}>
        {buttonName}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.name && !!errors.name}
                  helperText={<ErrorMessage name="name" />}
                />

                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.email && !!errors.email}
                  helperText={<ErrorMessage name="email" />}
                />

                <Field
                  as={TextField}
                  label="Phone"
                  name="phone"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.phone && !!errors.phone}
                  helperText={<ErrorMessage name="phone" />}
                />

                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.password && !!errors.password}
                  helperText={<ErrorMessage name="password" />}
                />

                <Field
                  as={TextField}
                  label="Type"
                  name="type"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.type && !!errors.type}
                  helperText={<ErrorMessage name="type" />}
                />

                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
