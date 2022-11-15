import React, { useEffect, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import { useLocation } from "react-router-dom";

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
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const getdata = async (searchData = "") => {

        const C_data = await getProfileDetails({ email: "", domain: searchData, name: searchData, searchfrom: "false", _id: "" })

        const array_data = C_data?.data?.data
        setCompanydata(array_data)
        console.log(array_data);
        const L_data = await sendSearchAPI({ title: searchData, email: "", active: 1, description: "", _id: "", domain: "" })

        const array_logo_data = L_data?.data?.data
        setLogoData(array_logo_data)
    }








    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }


    // useEffect(() => {
    //     if (CompanyData === []) {

    //     }
    // })





    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);
            await getdata()// For demo purposes.
            // await getProfileDetails({ email: "", domain: "", name: "", searchfrom: "false", _id: "" })

            if (active) {
                setOptions([...CompanyData]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    const abc = (a) => {
        console.log(a?.target.value);
        console.log(document.getElementById("asynchronous-demo")?.value);

    };








    return (
        <Autocomplete
            onChangeCapture={(e) => {
                abc(e)
            }}
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            item
            isOptionEqualToValue={(option, value) => option.domain === value.domain}
            getOptionLabel={(option) => option.domain}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default SearchBar;
