import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import "../challan.css";
import axiosInstance from "../../Utils/axiosConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

const validationSchema = Yup.object().shape({
  challanType: Yup.string().required("Challan Type is required"),
  grade: Yup.string().required("Class is required"),
  admissionFee: Yup.number()
    .typeError("Admission Fee must be a number")
    .min(0, "Admission Fee must be a positive number")
    .nullable(),
  tuitionFee: Yup.number()
    .typeError("Tuition Fee must be a number")
    .min(0, "Tuition Fee must be a positive number")
    .nullable(),
  generalFund: Yup.number()
    .typeError("General Fund must be a number")
    .min(0, "General Fund must be a positive number")
    .nullable(),
  studentIdCardFund: Yup.number()
    .typeError("Student ID Card Fund must be a number")
    .min(0, "Student ID Card Fund must be a positive number")
    .nullable(),
  redCrossFund: Yup.number()
    .typeError("Red Cross Fund must be a number")
    .min(0, "Red Cross Fund must be a positive number")
    .nullable(),
  medicalFund: Yup.number()
    .typeError("Medical Fund must be a number")
    .min(0, "Medical Fund must be a positive number")
    .nullable(),
  studentWelfareFund: Yup.number()
    .typeError("Student Welfare Fund must be a number")
    .min(0, "Student Welfare Fund must be a positive number")
    .nullable(),
  scBreakageFund: Yup.number()
    .typeError("SC Breakage Fund must be a number")
    .min(0, "SC Breakage Fund must be a positive number")
    .nullable(),
  magazineFund: Yup.number()
    .typeError("Magazine Fund must be a number")
    .min(0, "Magazine Fund must be a positive number")
    .nullable(),
  librarySecutityFund: Yup.number()
    .typeError("Library Security Fund must be a number")
    .min(0, "Library Security Fund must be a positive number")
    .nullable(),
  boardUniRegdExamDues: Yup.number()
    .typeError("Board/University Registration Exam Dues must be a number")
    .min(0, "Board/University Registration Exam Dues must be a positive number")
    .nullable(),
  sportsFund: Yup.number()
    .typeError("Sports Fund must be a number")
    .min(0, "Sports Fund must be a positive number")
    .nullable(),
  miscellaneousFund: Yup.number()
    .typeError("Miscellaneous Fund must be a number")
    .min(0, "Miscellaneous Fund must be a positive number")
    .nullable(),
  boardUniProcessingFee: Yup.number()
    .typeError("Board/University Processing Fee must be a number")
    .min(0, "Board/University Processing Fee must be a positive number")
    .nullable(),
  transportFund: Yup.number()
    .typeError("Transport Fund must be a number")
    .min(0, "Transport Fund must be a positive number")
    .nullable(),
  burqaFund: Yup.number()
    .typeError("Burqa Fund must be a number")
    .min(0, "Burqa Fund must be a positive number")
    .nullable(),
  collegeExaminationFund: Yup.number()
    .typeError("College Examination Fund must be a number")
    .min(0, "College Examination Fund must be a positive number")
    .nullable(),
  computerFee: Yup.number()
    .typeError("Computer Fee must be a number")
    .min(0, "Computer Fee must be a positive number")
    .nullable(),
  secondShiftFee: Yup.number()
    .typeError("Second Shift Fee must be a number")
    .min(0, "Second Shift Fee must be a positive number")
    .nullable(),
  fineFund: Yup.number()
    .typeError("Fine Fund must be a number")
    .min(0, "Fine Fund must be a positive number")
    .nullable(),
});

// handles logic for fetching data on dropdown change
const FetchOnDropdownChange = ({ setInitialValues }) => {
  const { values } = useFormikContext();
  console.log("Values in FetchOnDropdownChange:", values);

  useEffect(() => {
    const fetchData = async (challanType, grade) => {
      try {
        console.log("In try");
        const response = await axiosInstance.get("/challan/data", {
          params: { challanType, grade },
        });
        const data = {
          challanType: values.challanType,
          grade: values.grade,
          ...response.data.data,
        };
        console.log("Data ....:", data);
        setInitialValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // have to set all to empty because user may have value in any of the fields
        setInitialValues({
          challanType: values.challanType,
          grade: values.grade,
          admissionFee: "",
          tuitionFee: "",
          generalFund: "",
          studentIdCardFund: "",
          redCrossFund: "",
          medicalFund: "",
          studentWelfareFund: "",
          scBreakageFund: "",
          magazineFund: "",
          librarySecurityFund: "",
          boardUniRegdExamDues: "",
          sportsFund: "",
          miscellaneousFund: "",
          boardUniProcessingFee: "",
          transportFund: "",
          burqaFund: "",
          collegeExaminationFund: "",
          computerFee: "",
          secondShiftFee: "",
          fineFund: "",
        });
      }
    };

    if (values.challanType && values.grade) {
      console.log("Fetching data for:", values.challanType, values.grade);
      fetchData(values.challanType, values.grade);
    }
  }, [values.challanType, values.grade]);

  return null; // This component only handles fetching, no UI needed
};

const ChallanDataModal = ({ buttonName, isDisable }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    challanType: "",
    grade: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInitialValues({
      challanType: "",
      grade: "",
    }); // Reset the form values
    setOpen(false);
  };

  const updateValues = async (values) => {
    try {
      const response = await axiosInstance.put("/challan/data", values);
      console.log(response);
      setInitialValues({
        challanType: "",
        grade: "",
      });
      alert("Values Updated Successfully");
      handleClose();
    } catch (err) {
      alert("Error updating values");
      console.log(err);
    }
  };

  // update values in backend file
  const onSubmit = (values) => {
    console.log("Form Data Submitted:", values);
    updateValues(values);
  };

  return (
    <div>
      <button
        className={isDisable ? "action-button-disabled" : "action-button"}
        disabled={isDisable}
        onClick={handleOpen}
      >
        {buttonName}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validateOnBlur={true}
            validateOnChange={true}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <FetchOnDropdownChange setInitialValues={setInitialValues} />
                {/* to fetch data after values of class and challan are selected */}
                <FormControl
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                >
                  <InputLabel>Challan Type</InputLabel>
                  <Select
                    name="challanType"
                    value={values.challanType}
                    onChange={handleChange}
                    error={touched.challanType && !!errors.challanType}
                    label="Challan Type"
                  >
                    <MenuItem value="addmission">Admission</MenuItem>
                    <MenuItem value="fine">Fine</MenuItem>
                    <MenuItem value="readdmission">Re Addmission</MenuItem>
                    <MenuItem value="secondshift">2nd Shift</MenuItem>
                  </Select>
                  <ErrorMessage
                    name="challanType"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                    >
                      <InputLabel>Class</InputLabel>
                      <Select
                        name="grade"
                        value={values.grade}
                        onChange={handleChange}
                        error={touched.grade && !!errors.grade}
                        label="Class"
                      >
                        <MenuItem value="Pre Med">Pre Med</MenuItem>
                        <MenuItem value="Pre Eng">Pre Eng</MenuItem>
                        <MenuItem value="Others">Other</MenuItem>
                      </Select>
                      <ErrorMessage
                        name="grade"
                        component="div"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                    </FormControl>
                    <Field
                      as={TextField}
                      label="Admission Fee"
                      name="admissionFee"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.admissionFee ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.admissionFee && !!errors.admissionFee}
                      helperText={<ErrorMessage name="admissionFee" />}
                    />
                    <Field
                      as={TextField}
                      label="Tuition Fee"
                      name="tuitionFee"
                      fullWidth
                      margin="normal"
                      size="small"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.tuitionFee ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.tuitionFee && !!errors.tuitionFee}
                      helperText={<ErrorMessage name="tuitionFee" />}
                    />
                    <Field
                      as={TextField}
                      label="General Fund: PLS 900123-0"
                      name="generalFund"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: values.generalFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.generalFund && !!errors.generalFund}
                      helperText={<ErrorMessage name="generalFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Student I.D Card Fund"
                      name="studentIdCardFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.studentIdCardFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.studentIdCardFund && !!errors.studentIdCardFund
                      }
                      helperText={<ErrorMessage name="studentIdCardFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Red Cross Fund: PLS 900414-0"
                      name="redCrossFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.redCrossFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.redCrossFund && !!errors.redCrossFund}
                      helperText={<ErrorMessage name="redCrossFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Medical Fund"
                      name="medicalFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.medicalFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.medicalFund && !!errors.medicalFund}
                      helperText={<ErrorMessage name="medicalFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Student Welfare Fund: PLS 900414-0"
                      name="studentWelfareFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.studentWelfareFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.studentWelfareFund &&
                        !!errors.studentWelfareFund
                      }
                      helperText={<ErrorMessage name="studentWelfareFund" />}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      label="Sc. Breakage Fund: PLS 900122-0"
                      name="scBreakageFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.scBreakageFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.scBreakageFund && !!errors.scBreakageFund}
                      helperText={<ErrorMessage name="scBreakageFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Magzine Fund: PLS 900119-0"
                      name="magzineFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.magazineFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.magzineFund && !!errors.magzineFund}
                      helperText={<ErrorMessage name="magzineFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Library Security Fund: PLS 900120-0"
                      name="librarySecurityFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.librarySecurityFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.librarySecurityFund &&
                        !!errors.librarySecurityFund
                      }
                      helperText={<ErrorMessage name="librarySecurityFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Board/Univ: Regd/Exam Dues"
                      name="boardUniRegdExamDues"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.boardUniRegdExamDues ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.boardUniRegdExamDues &&
                        !!errors.boardUniRegdExamDues
                      }
                      helperText={<ErrorMessage name="boardUniRegdExamDues" />}
                    />
                    <Field
                      as={TextField}
                      label="Sports Fund"
                      name="sportsFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.sportsFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.sportsFund && !!errors.sportsFund}
                      helperText={<ErrorMessage name="sportsFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Miscellaneous Fund"
                      name="miscellaneousFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.miscellaneousFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.miscellaneousFund && !!errors.miscellaneousFund
                      }
                      helperText={<ErrorMessage name="miscellaneousFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Board University Processing Fee"
                      name="boardUniProcessingFee"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.boardUniProcessingFee ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.boardUniProcessingFee &&
                        !!errors.boardUniProcessingFee
                      }
                      helperText={<ErrorMessage name="boardUniProcessingFee" />}
                    />
                    <Field
                      as={TextField}
                      label="Transport Fund: BTA 4017-7"
                      name="transportFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.transportFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.transportFund && !!errors.transportFund}
                      helperText={<ErrorMessage name="transportFund" />}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      label="Burqa Fund: BTA 4019-1"
                      name="burqaFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.burqaFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.burqaFund && !!errors.burqaFund}
                      helperText={<ErrorMessage name="burqaFund" />}
                    />
                    <Field
                      as={TextField}
                      label="College Examination Fund: BTA 4018-9"
                      name="collegeExaminationFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.collegeExaminationFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={
                        touched.collegeExaminationFund &&
                        !!errors.collegeExaminationFund
                      }
                      helperText={
                        <ErrorMessage name="collegeExaminationFund" />
                      }
                    />
                    <Field
                      as={TextField}
                      label="Computer Fee: CD 800698-0"
                      name="computerFee"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.computerFee ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.computerFee && !!errors.computerFee}
                      helperText={<ErrorMessage name="computerFee" />}
                    />
                    <Field
                      as={TextField}
                      label="2nd-Shift: 4079-3"
                      name="secondShiftFee"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.secondShiftFee ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.secondShiftFee && !!errors.secondShiftFee}
                      helperText={<ErrorMessage name="secondShiftFee" />}
                    />
                    <Field
                      as={TextField}
                      label="Fine Fund: PLS 900116-0"
                      name="fineFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: values.fineFund ? true : false, // Shrinks only if there's a value
                      }}
                      error={touched.fineFund && !!errors.fineFund}
                      helperText={<ErrorMessage name="fineFund" />}
                    />
                    {/* Add more fields for the left column */}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Change Values
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default ChallanDataModal;
