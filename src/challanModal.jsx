import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Modal, TextField, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Challan/challan.css";
import axiosInstance from "./axiosConfig";

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
  rollNo: Yup.string().required("Roll No. is required"),
  studentName: Yup.string().required("Student Name is required"),
  fatherName: Yup.string().required("Father Name is required"),
  grade: Yup.string().required("Class is required"),
  admissionFee: Yup.number()
    .typeError("Admission Fee must be a number")
    .min(0, "Admission Fee must be a positive number")
    .nullable(),
  tuitionFee: Yup.number()
    .typeError("Tuition Fee must be a number")
    .min(0, "Tuition Fee must be a positive number")
    .required("Tuition Fee is required"),
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

const ChallanModal = ({
  values = {
    rollNo: "",
    studentName: "",
    fatherName: "",
    grade: "",
    tuitionFee: "",
  },
  buttonName,
  isDisable,
  close,
}) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(values);
  const [student, setStudent] = useState(null);
  // to shift focus to these fields based case of student data
  const studentNameRef = useRef(null);
  const admissionFeeRef = useRef(null);

  // to get default values when generating the challan
  const getInitialValues = async () => {
    try {
      const response = await axiosInstance.get("/challan/data");
      setInitialValues(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDateThreeDaysAhead = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 3);

    return futureDate.toISOString().split("T")[0]; // For 'YYYY-MM-DD' format
  };

  const modifyValues = (values, studentId, userId) => {
    // Create a new object to hold the updated values
    const newValues = {
      ...values, // Spread the existing values
    };

    // Remove specific values
    delete newValues.rollNo;
    delete newValues.studentName;
    delete newValues.fatherName;
    delete newValues.grade;

    // Convert all values to numbers where applicable
    Object.keys(newValues).forEach((key) => {
      const value = Number(newValues[key]);
      if (!isNaN(value)) {
        newValues[key] = value;
      }
    });

    const finalValues = {
      ...newValues,
      dueDate: getDateThreeDaysAhead(), // Set dueDate to 3 days ahead
      studentId: studentId,
      userId: userId,
    };

    return finalValues;
  };

  const generateChallan = async (values) => {
    try {
      let studentData = student;

      if (!student) {
        console.log("Student not found, fetching from API");
        studentData = await loadStudentData(values.rollNo);
        if (!studentData) {
          // inserting new student
          const studentResponse = await axiosInstance.post("/student", {
            rollNo: values.rollNo,
            name: values.studentName,
            fatherName: values.fatherName,
            grade: values.grade,
          });
          console.log("Student Response: ", studentResponse.data);
          studentData = studentResponse.data.data;
        }
      }
      const challanValues = modifyValues(values, studentData._id, "12");
      console.log("Challan Values: ", challanValues);
      const response = await axiosInstance.post("/challan", challanValues);
      console.log("Response:", response.data);
      alert("Challan generated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const editChallan = async (values) => {
    try {
      const response = await axiosInstance.put(
        `/challan/${values._id}`,
        values
      );
      console.log("Response:", response.data);
      alert("Challan updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("values", values);
    if (buttonName === "Generate Challan") {
      getInitialValues();
    }
    console.log("Initial Values: ", initialValues);
  }, []);

  const loadStudentData = async (rollNo) => {
    try {
      const response = await axiosInstance.get(`/student/${rollNo}`);
      console.log("Student Data: ", response.data);
      if (response.status === 400) {
        return null;
      }
      // this will return student data
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const rollNoKeyDown = async (event, values) => {
    if (event.key === "Enter") {
      console.log("name", values.studentName);
      const studentData = await loadStudentData(values.rollNo);
      console.log("Student: ", studentData);

      if (!studentData) {
        // Clear values and focus the studentName field
        values.studentName = undefined;
        values.fatherName = undefined;
        values.grade = undefined;

        if (studentNameRef.current) {
          studentNameRef.current.focus();
        }
        return;
      }

      // Populate values and focus the next field
      setStudent(studentData);
      values.studentName = studentData.name;
      values.fatherName = studentData.fatherName;
      values.grade = studentData.grade;

      if (admissionFeeRef.current) {
        admissionFeeRef.current.focus();
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    close();
  };

  const onSubmit = (values) => {
    if (buttonName === "Generate Challan") {
      generateChallan(values);
    } else {
      editChallan(values);
    }
    handleClose();
  };

  return (
    <div>
      <button
        disabled={isDisable}
        className={isDisable ? "action-button-disabled" : "action-button"}
        onClick={handleOpen}
      >
        {buttonName}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      label="Roll No."
                      name="rollNo"
                      fullWidth
                      margin="normal"
                      size="small"
                      variant="outlined"
                      error={touched.rollNo && !!errors.rollNo}
                      helperText={<ErrorMessage name="firstName" />}
                      onKeyDown={(event) => rollNoKeyDown(event, values)}
                    />
                    <Field
                      as={TextField}
                      label="Student Name"
                      name="studentName"
                      fullWidth
                      // needed this because of programmatically setting the value
                      InputLabelProps={{
                        shrink: values.studentName,
                      }}
                      margin="normal"
                      variant="outlined"
                      size="small"
                      inputRef={studentNameRef}
                      error={touched.studentName && !!errors.studentName}
                      helperText={<ErrorMessage name="studentName" />}
                    />
                    <Field
                      as={TextField}
                      label="D/O"
                      name="fatherName"
                      fullWidth
                      InputLabelProps={{
                        shrink: values.fatherName,
                      }}
                      margin="normal"
                      variant="outlined"
                      size="small"
                      error={touched.fatherName && !!errors.fatherName}
                      helperText={<ErrorMessage name="fatherName" />}
                    />

                    <Field
                      as={TextField}
                      label="Class"
                      name="grade"
                      fullWidth
                      InputLabelProps={{
                        shrink: values.grade,
                      }}
                      margin="normal"
                      size="small"
                      variant="outlined"
                      error={touched.grade && !!errors.grade}
                      helperText={<ErrorMessage name="grade" />}
                    />
                    <Field
                      as={TextField}
                      label="Admission Fee"
                      name="admissionFee"
                      fullWidth
                      size="small"
                      inputRef={admissionFeeRef}
                      margin="normal"
                      variant="outlined"
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
                      error={
                        touched.studentIdCardFund && !!errors.studentIdCardFund
                      }
                      helperText={<ErrorMessage name="studentIdCardFund" />}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      label="Red Cross Fund: PLS 900414-0"
                      name="redCrossFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
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
                      error={
                        touched.studentWelfareFund &&
                        !!errors.studentWelfareFund
                      }
                      helperText={<ErrorMessage name="studentWelfareFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Sc. Breakage Fund: PLS 900122-0"
                      name="scBreakageFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
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
                      error={touched.sportsFund && !!errors.sportsFund}
                      helperText={<ErrorMessage name="sportsFund" />}
                    />
                    {/* Add more fields for the left column */}
                  </Grid>

                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      label="Miscellaneous Fund"
                      name="miscellaneousFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
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
                      error={touched.transportFund && !!errors.transportFund}
                      helperText={<ErrorMessage name="transportFund" />}
                    />
                    <Field
                      as={TextField}
                      label="Burqa Fund: BTA 4019-1"
                      name="burqaFund"
                      fullWidth
                      size="small"
                      margin="normal"
                      variant="outlined"
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
                  {buttonName === "Edit Challan"
                    ? "Edit Challan"
                    : "Generate Challan"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default ChallanModal;
