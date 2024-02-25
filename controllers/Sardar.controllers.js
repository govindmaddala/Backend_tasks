app.delete("/api/data/remove_signature/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Signature = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_bosiet_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Bosiet_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_seaman_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Seaman_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_h2s_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET H2s_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_medical_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Medical_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_insurance_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Insurance_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_snt_eye_test_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET SNT_Eye_Test_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_passport_doc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET SNT_Eye_Test_Doc = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_photo_upload/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Photo_Upload = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_vaccination_certificate/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Vaccination_Certificate = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_pcc/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET PCC = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_active_visas_one/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Active_Visas_One = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );
});

app.delete("/api/data/remove_active_visas_two/:S_No", (req, res) => {
    const { S_No } = req.params; // Use params to get S_No from the URL
    if (!S_No) {
        return res.status(400).json({ error: "Missing S_No parameter" });
    }

    connection.query(
        "UPDATE reference_details.professional_details SET Active_Visas_Two = null WHERE S_No = ?",
        [S_No],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            } else {
                res.send("DELETED");
            }
        }
    );



    app.put("/api/data/professional_detailsupdation/:id", async (req, res) => {
        try {
            const professionalId = req.params.id;
            console.log("Professional ID:", professionalId);
            console.log("Request Body:", req.body);
            const {
                Customer_Name,
                Designation,
                Retainership,
                Employee_ID,
                Signature,
                Rigs,
                jackingExperience,
                skiddingExperience,
                craneExperience,
                upcomingProjectDuration,
                Fixation_Experience,
                Seaman_Book_Expiry,
                Seaman_Issuing_Country,
                Seaman_Doc,
                Bosiet_Expiry,
                Bosiet_Doc,
                H2s_Expiry,
                H2s_Doc,
                Medical_Expiry,
                Medical_Doc,
                Insurance_Expiry,
                Insurance_Doc,
                SNT_Eye_Test_Expiry,
                SNT_Eye_Test_Doc,
                Yellow_Fever_Expiry,
                Yellow_Fever_Doc,
                CV_File,
                Passport_Expiry,
                Passport_Issuing_Country,
                Passport_Doc,
                Active_Visas_One,
                Active_Visas_Two,
                Active_Visas_Three,
                Active_Visas_Four,
                Active_Visas_Five,
                Active_Visas_Six,
                Active_Visas_One_Expiry,
                Active_Visas_Two_Expiry,
                Active_Visas_Three_Expiry,
                Active_Visas_Four_Expiry,
                Active_Visas_Five_Expiry,
                Active_Visas_Six_Expiry,
                Active_Visas_One_Doc,
                Active_Visas_Two_Doc,
                Active_Visas_Three_Doc,
                Active_Visas_Four_Doc,
                Active_Visas_Five_Doc,
                Active_Visas_Six_Doc,
                Signature_Doc_Name,
                Seaman_Doc_Name,
                Bosiet_Doc_Name,
                H2S_Doc_Name,
                Medical_Doc_Name,
                Insurance_Doc_Name,
                Snt_Doc_Name,
                Yellow_Fever_Doc_name,
                Passport_Doc_Name,
                Active_Visa1_Doc_Name,
                Active_Visa2_Doc_Name,
                Active_Visa3_Doc_Name,
                Active_Visa4_Doc_Name,
                Active_Visa5_Doc_Name,
                Active_Visa6_Doc_Name,
                Photo_Upload,
                Photo_Upload_Doc_Name,
                Vaccination_Certificate,
                PCC,
                Vaccination_Certificate_Doc_Name,
                PCC_Doc_Name,
                Nationality,
            } = req.body;

            const updatedValues = {
                Customer_Name: Customer_Name || null,
                Designation: Designation || null,
                Retainership: Retainership || null,
                Employee_ID: Employee_ID || null,
                Signature: Signature || null,
                Rigs: Rigs || null,
                jackingExperience: jackingExperience || null,
                skiddingExperience: skiddingExperience || null,
                craneExperience: craneExperience || null,
                upcomingProjectDuration: upcomingProjectDuration || null,
                Fixation_Experience: Fixation_Experience || null,
                Seaman_Book_Expiry: Seaman_Book_Expiry || null,
                Seaman_Issuing_Country: Seaman_Issuing_Country || null,
                Seaman_Doc: Seaman_Doc || null,
                Bosiet_Expiry: Bosiet_Expiry || null,
                Bosiet_Doc: Bosiet_Doc || null,
                H2s_Expiry: H2s_Expiry || null,
                H2s_Doc: H2s_Doc || null,
                Medical_Expiry: Medical_Expiry || null,
                Medical_Doc: Medical_Doc || null,
                Insurance_Expiry: Insurance_Expiry || null,
                Insurance_Doc: Insurance_Doc || null,
                SNT_Eye_Test_Expiry: SNT_Eye_Test_Expiry || null,
                SNT_Eye_Test_Doc: SNT_Eye_Test_Doc || null,
                Yellow_Fever_Expiry: Yellow_Fever_Expiry || null,
                Yellow_Fever_Doc: Yellow_Fever_Doc || null,
                CV_File: CV_File || null,
                Passport_Expiry: Passport_Expiry || null,
                Passport_Issuing_Country: Passport_Issuing_Country || null,
                Passport_Doc: Passport_Doc || null,
                Active_Visas_One: Active_Visas_One || null,
                Active_Visas_Two: Active_Visas_Two || null,
                Active_Visas_Three: Active_Visas_Three || null,
                Active_Visas_Four: Active_Visas_Four || null,
                Active_Visas_Five: Active_Visas_Five || null,
                Active_Visas_Six: Active_Visas_Six || null,
                Active_Visas_One_Expiry: Active_Visas_One_Expiry || null,
                Active_Visas_Two_Expiry: Active_Visas_Two_Expiry || null,
                Active_Visas_Three_Expiry: Active_Visas_Three_Expiry || null,
                Active_Visas_Four_Expiry: Active_Visas_Four_Expiry || null,
                Active_Visas_Five_Expiry: Active_Visas_Five_Expiry || null,
                Active_Visas_Six_Expiry: Active_Visas_Six_Expiry || null,
                Active_Visas_One_Doc: Active_Visas_One_Doc || null,
                Active_Visas_Two_Doc: Active_Visas_Two_Doc || null,
                Active_Visas_Three_Doc: Active_Visas_Three_Doc || null,
                Active_Visas_Four_Doc: Active_Visas_Four_Doc || null,
                Active_Visas_Five_Doc: Active_Visas_Five_Doc || null,
                Active_Visas_Six_Doc: Active_Visas_Six_Doc || null,
                Signature_Doc_Name: Signature_Doc_Name || null,
                Seaman_Doc_Name: Seaman_Doc_Name || null,
                Bosiet_Doc_Name: Bosiet_Doc_Name || null,
                H2S_Doc_Name: H2S_Doc_Name || null,
                Medical_Doc_Name: Medical_Doc_Name || null,
                Insurance_Doc_Name: Insurance_Doc_Name || null,
                Snt_Doc_Name: Snt_Doc_Name || null,
                Yellow_Fever_Doc_name: Yellow_Fever_Doc_name || null,
                Passport_Doc_Name: Passport_Doc_Name || null,
                Active_Visa1_Doc_Name: Active_Visa1_Doc_Name || null,
                Active_Visa2_Doc_Name: Active_Visa2_Doc_Name || null,
                Active_Visa3_Doc_Name: Active_Visa3_Doc_Name || null,
                Active_Visa4_Doc_Name: Active_Visa4_Doc_Name || null,
                Active_Visa5_Doc_Name: Active_Visa5_Doc_Name || null,
                Active_Visa6_Doc_Name: Active_Visa6_Doc_Name || null,
                Photo_Upload: Photo_Upload || null,
                Photo_Upload_Doc_Name: Photo_Upload_Doc_Name || null,
                Vaccination_Certificate: Vaccination_Certificate || null,
                PCC: PCC || null,
                Vaccination_Certificate_Doc_Name: Vaccination_Certificate_Doc_Name || null,
                PCC_Doc_Name: PCC_Doc_Name || null,
                Nationality: Nationality || null,
            };

            console.log("Updated Values:", updatedValues);

            connection.query(
                "UPDATE reference_details.professional_details SET ? WHERE S_No = ?",
                [updatedValues, professionalId],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send({ success: false, message: err });
                    } else {
                        res.send({ success: true, message: "Data updated successfully" });
                    }
                }
            );
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({
                success: false,
                message: "Server Error",
            });
        }
    });
});