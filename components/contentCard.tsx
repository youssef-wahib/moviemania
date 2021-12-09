import React, { FC } from "react";
import { Badge, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Content } from "../src/types";

type props = {
  readonly item: Content;
};

const MediaCard: FC<props> = ({ item }) => {
  const checkMediaType = (mediaType: string) => {
    if (mediaType === undefined) return;
    return (
      <Typography variant={"subtitle1"}>
        Type:{" "}
        {item?.media_type?.charAt(0).toUpperCase() + item?.media_type?.slice(1)}
      </Typography>
    );
  };
  return (
    <>
      <Badge badgeContent={item.vote_average} color="secondary">
        <Card raised sx={{ overflow: "auto", width: 350 }}>
          <CardMedia
            component="img"
            height="350"
            image={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
            alt={item.title}
          />
          <CardContent sx={{ pb: "0", height: 350 }}>
            <Typography gutterBottom variant="h5" align={"center"}>
              {item.title || item.name}
            </Typography>

            {checkMediaType(item.media_type)}
            <Typography variant={"subtitle1"}>
              Release Date: {item.release_date || item.first_air_date}
            </Typography>

            <Typography component={"div"} variant="subtitle1">
              {item.overview}
            </Typography>
          </CardContent>
        </Card>
      </Badge>
    </>
  );
};

export default MediaCard;
