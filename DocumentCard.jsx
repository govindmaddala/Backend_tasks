import React from "react";
import moment from "moment";
import ViewIcon from "../../assets/icons/viewIcon.png";
import DownloadIcon from "../../assets/icons/downloadIcon.png";
import DeleteIcon from "../../assets/icons/dustbin.png";
import redirectURL from "../redirectURL";

const DocumentTile = (props) => {
  // console.log("DocumentTile", props);
  const deleteDocx = (documentDetails) => {
    // console.log("documentDetails", documentDetails);

    let payload = {
      _id: documentDetails._id,
    };

    redirectURL.post("/exim/deleteEximDocument", payload).then((response) => {
      if (response.data.status) {

        let filteredData = props.uploadedDocx.filter((each) => {
          if (each._id != documentDetails._id) {
            return each;
          }
        });
        // console.log("documentDetails", filteredData.length);
        props.filterDataOnDelete(filteredData);
      }
    });
  };
  return (
    <div
      class="align-content-center justify-content-around mx-3 row"
      style={{ height: "50px", borderBottom: "1px solid #dadada" }}
    >
      <div class="col-3">
        <label for="" style={{ fontWeight: "normal" }}>
          {props.documentDetails.document_type}
        </label>
      </div>
      <div class="col-3">
        <label
          for=""
          style={{ fontWeight: "normal" }}
        >{`${props.documentDetails.document_title}.${props.documentDetails.document_extension}`}</label>
      </div>
      <div class="col-4">
        <label for="" style={{ fontWeight: "normal" }}>
          {moment
            .parseZone(props.documentDetails.created_at)
            .format("dddd DD/MM/YYYY - hh:mm A")}
        </label>
      </div>
      <div class="col-2">
        <div class="d-flex justify-content-between mt-1">
          <img
            onClick={() => {
              props.previewCard(
                props.documentDetails.document_extension,
                props.documentDetails.document_url
              );
            }}
            src={ViewIcon}
            alt=""
            width="20px"
            height={"20px"}
            style={{ cursor: "pointer" }}
          />
          <a
            style={{
              textDecoration: "none",
              position: "relative",
              top: "-4px",
            }}
            href={props.documentDetails.document_url}
          >
            <img
              src={DownloadIcon}
              style={{ cursor: "pointer" }}
              alt=""
              width="20px"
              height={"20px"}
            />
          </a>

          <img
            onClick={() => {
              deleteDocx(props.documentDetails);
            }}
            src={DeleteIcon}
            alt=""
            width="20px"
            height={"20px"}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentTile;
