import React, { useEffect, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { getProfileDetails, sendSearchAPI } from "../api/index.js"
import { styled, lighten, darken } from '@mui/system';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
function SearchBar() {
    const { user } = UserAuth();
    const [CompanyData, setCompanydata] = useState([]);
    const [LogoData, setLogoData] = useState([]);
    const [open, setOpen] = React.useState(false);

    const getdata = async (searchData = "") => {

        const C_data = await getProfileDetails({ email: "", domain: searchData, name: searchData, searchfrom: "false", _id: "" })

        const array_data = C_data?.data?.data
        setCompanydata(array_data)
        console.log(array_data);
        const L_data = await sendSearchAPI({ title: searchData, email: "", active: 1, description: "", _id: "", domain: "" })

        const array_logo_data = L_data?.data?.data
        setLogoData(array_logo_data)
    }







    var data = CompanyData.map((option) => {

        return {
            ...option,
            type: "company"
        };
    });
    var datalogo = LogoData.map((option) => {

        return {
            ...option,
            type: "logo"
        };
    });

    data.push(...datalogo)
    console.log(data);
    const options = data




    useEffect(() => {
        if (CompanyData?.length === 0) {
            getdata()
        }
    })
    const abc = (a) => {
        // for(let char :CompanyData)
    };


    return (
        <>
            <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option.domain === value.domain}
                getOptionLabel={(option) => option.domain}
                options={options}
                onInputChange={(event, newInputValue) => {
                    abc(newInputValue);
                }}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <div className="d-flex">
                            <div>
                                {
                                    option?.name ?
                                        option?.domain + "-(" + option?.name + ")-(" + option?.type + ")"
                                        :
                                        option?.title + ")-(" + option?.type + ")"

                                }
                            </div>
                        </div>
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label="With categories" />}
            />

        </>
    );
}

export default SearchBar;
