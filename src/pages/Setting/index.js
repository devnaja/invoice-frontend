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
          <div style={{ width: "50%" }}>
            <SettingForm />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: "50%" }}>
            <AllowImport />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: "50%" }}>
            <AllowReject />
          </div>
        </Grid>
      </Grid>
    </PrivateLayout>
  );
}

export default Setting;
