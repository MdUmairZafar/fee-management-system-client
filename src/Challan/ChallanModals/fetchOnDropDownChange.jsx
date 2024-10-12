import { useFormikContext } from "formik";
import { useEffect } from "react";
import axiosInstance from "../../Utils/axiosConfig";

const FetchOnDropdownChange = ({ setInitialValues }) => {
    const { values } = useFormikContext();
    const { challanType, grade } = values;

    const setDefaultValues = () => {
        setInitialValues({
            challanType,
            grade,
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
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/challan/data", {
                params: { challanType, grade },
            });
            const data = {
                challanType,
                grade,
                ...response.data.data,
            };
            setInitialValues(data);
        } catch (error) {
            setDefaultValues(); 
        }
    };

    useEffect(() => {
        if (challanType && grade) {
            fetchData();
        }
    }, [challanType, grade]);

    return null;
};

export default FetchOnDropdownChange;
