import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
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

const ChallanDataModal = () => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getInitialValues = async () => {
    try {
      const response = await axiosInstance.get("/challan/data");
      setInitialValues(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateValues = async (values) => {
    try {
      const response = await axiosInstance.put("/challan/data", values);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInitialValues();
  }, []);

  // update values in backend file
  const onSubmit = async (values) => {
    console.log("Form Data Submitted:", values);
    await updateValues(values);
    // seems like a good option reduces the number of API calls
    setInitialValues(values);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      as={TextField}
                      label="Admission Fee"
                      name="admissionFee"
                      fullWidth
                      size="small"
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
                  </Grid>

                  <Grid item xs={4}>
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
