import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard({ title, total, bgcolor }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
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
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}
