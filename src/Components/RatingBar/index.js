import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

const ratings = [
  { stars: 5, percentage: 80 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
];

const RatingBar = () => {
  return (
    <div>
      <Box>
        {ratings.map((rating) => (
          <Box key={rating.stars} display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold">{rating.stars}</Typography>
            <Star fontSize="small" sx={{ color: "#333" }} />
            <LinearProgress
              variant="determinate"
              value={rating.percentage}
              sx={{
                width: "60%",
                height: 8,
                borderRadius: "20px",
                bgcolor: "#eee",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#333",
                  borderRadius: "20px",
                },
              }}
            />
            <Typography fontWeight="medium">{rating.percentage}%</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default RatingBar;
