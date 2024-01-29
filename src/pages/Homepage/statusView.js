import * as React from "react";
import { Box, SvgIcon, Stack, Typography, Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PaidIcon from "@mui/icons-material/Paid";
import { yellow } from "@mui/material/colors";

export default function OutlinedCard({ title, total, icon, bgColor }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {title}
              </Typography>
              <Typography variant="h4">{total}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: bgColor,
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>{icon}</SvgIcon>
            </Avatar>
          </Stack>
          {/* {difference && (
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Stack alignItems="center" direction="row" spacing={0.5}>
                <SvgIcon
                  color={positive ? "success" : "error"}
                  fontSize="small"
                >
                  {positive ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </SvgIcon>
                <Typography
                  color={positive ? "success.main" : "error.main"}
                  variant="body2"
                >
                  {difference}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          )} */}
        </CardContent>
      </Card>

      {/* <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography
              color={bgcolor}
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: 800,
                textAlign: "right",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              gutterBottom
            >
              {total}
            </Typography>
          </Box>
        </CardContent>
       
      </Card> */}
    </Box>
  );
}
