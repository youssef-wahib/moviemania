import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { useQuery, UseQueryResult } from "react-query";
import { Results } from "../src/types";
import useStore, { getContent } from "../store/store";
import {
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import MediaCard from "./contentCard";

interface PageProps {
  content?: Results;
}

const FetchContent: FC<PageProps> = ({ content }: PageProps) => {
  const store = useStore();

  const { isLoading, error, data }: UseQueryResult<Results, Error> = useQuery<
    Results,
    Error
  >([store.pageNumber, store.mediaType, store.searchQuery], getContent, {
    initialData: content,
  });

  if (isLoading) {
    return (
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 30,
        }}
      >
        <CircularProgress size={80} thickness={4} />
      </Grid>
    );
  }
  if (error)
    return (
      <Typography variant={"h1"} color={"darkred"}>
        Sorry there is an error: {error?.message}
      </Typography>
    );

  return (
    <>
      <Container maxWidth={"xl"} sx={{ marginTop: 2 }}>
        <Grid
          container
          spacing={{ xs: 6, sm: 6, md: 4, lg: 4 }}
          columns={{ xs: 12, sm: 12, md: 3, lg: 8 }}
          justifyContent="center"
          alignItems="center"
        >
          {data?.results.map((item) => (
            <Grid item key={item.id} lg={2} md={1}>
              <MediaCard item={item} />
            </Grid>
          ))}
        </Grid>
        <Container maxWidth={"xs"} sx={{ pt: 4 }}>
          <Stack sx={{ alignItems: "center" }} spacing={2}>
            <Pagination
              color={"primary"}
              shape="rounded"
              variant={"outlined"}
              count={data?.total_pages}
              defaultPage={parseInt(store.pageNumber)}
              onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
                const page = value.toString();
                store.handleSetPageNumber(page);
              }}
            />
          </Stack>
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { content: Results };
}> => {
  const content = await getContent();
  return { props: { content } };
};

export default FetchContent;
