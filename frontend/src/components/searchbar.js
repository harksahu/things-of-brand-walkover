import React, { useEffect, useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { getProfileDetails, sendSearchAPI } from "../api/index.js";
import { styled, lighten, darken } from "@mui/system";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
function SearchBar() {
  const { user } = UserAuth();
  const [CompanyData, setCompanydata] = useState([]);
  const [LogoData, setLogoData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const getdata = async (searchData = "") => {
    const C_data = await getProfileDetails({
      email: "",
      domain: searchData,
      name: searchData,
      searchfrom: "false",
      _id: "",
    });

    const array_data = C_data?.data?.data;
    setCompanydata(array_data);

    const L_data = await sendSearchAPI({
      title: searchData,
      email: "",
      active: 1,
      description: "",
      _id: "",
      domain: "",
    });

    const array_logo_data = L_data?.data?.data;
    setLogoData(array_logo_data);
  };

  var data = CompanyData.map((option) => {
    return {
      ...option,
      type: "company",
    };
  });
  var datalogo = LogoData.map((option) => {
    return {
      _id: option._id,
      domain: option?.title,
      name: "",
      type: "logo",
    };
  });

  data.push(...datalogo);

  const options = data;

  useEffect(() => {
    if (CompanyData?.length === 0) {
      getdata();
    }
  });
  const abc = (a) => {
    for (let i = 0; i < CompanyData.length; i++) {
      if (a === CompanyData[i]?._id) {
        // navigate(-1)
        navigate("/" + CompanyData[i]?.domain);

        window.onload();
      }
    }
    for (let i = 0; i < LogoData.length; i++) {
      if (a == LogoData[i]?._id) {
        // navigate(-1) 

        navigate("/stuff/" + a);
        window.onload();
      }
    }
  };

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.domain === value.domain}
        getOptionLabel={(option) => option?._id}
        options={options}
        onInputChange={(event, newInputValue) => {
          abc(newInputValue);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option._id}
          >
            <div className="d-flex">
              <div>
                {
                  // (option?.domain != undefined && option?.domain != null && option?.domain) ?
                  option?.domain +
                    "-(" +
                    option?.name +
                    ")-(" +
                    option?.type +
                    ")"
                  // :
                  // option?.title + ")-(" + option?.type + ")"
                }
              </div>
            </div>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="With categories" />
        )}
      />
    </>
  );
}

export default SearchBar;
