import PrivateLayout from "layouts/privateLayout";
import React from "react";
import SettingForm from "./settingForm";
import AllowImport from "./import";
import AllowReject from "./reject";
import { Grid } from "@mui/material";

function Setting() {
  return (
    <PrivateLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            <SettingForm />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <AllowImport />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <AllowReject />
          </div>
        </Grid>
      </Grid>
    </PrivateLayout>
  );
}

export default Setting;
