import React, { FC, useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import logo from "../src/2021-11-25_15-54.png";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import useStore from "../store/store";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function handleNoSearchValueWarn(exist: boolean) {
  if (exist) {
    return (
      <Typography
        sx={{
          mx: 2,
          color: "red",
        }}
      >
        Please enter a search value
      </Typography>
    );
  }
}
const Layout: FC = ({ children }) => {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [noSearchValue, setNoSearchValue] = useState(false);
  const store = useStore();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = () => {
    store.handleSetSearchQuery(search);
    if (search) {
      setNoSearchValue(false);
      store.handleSetMediaType("search");
      handleClose();
    } else {
      setNoSearchValue(true);
    }
  };
  return (
    <>
      <AppBar position={"static"}>
        <Image src={logo} height={120} priority />
      </AppBar>
      {children}
      <Container maxWidth={"md"}>
        <BottomNavigation
          sx={{
            justifyContent: "space-around",
            background: "#1d2951",
            borderRadius: 2,
            color: "#e0d2d2",
            border: "2px solid #e0d2d2",
            mb: 6,
          }}
          showLabels
          value={value}
          onChange={(_event: React.ChangeEvent<unknown>, selection: number) => {
            // console.log((event.target as HTMLElement).textContent);
            setValue(selection);
          }}
        >
          <BottomNavigationAction
            sx={{ color: "#e0d2d2" }}
            label="Trending"
            icon={<WhatshotIcon />}
            onClick={() => store.handleSetMediaType("trending")}
          />
          <BottomNavigationAction
            sx={{ color: "#e0d2d2" }}
            label="Movies"
            icon={<MovieFilterIcon />}
            onClick={() => store.handleSetMediaType("movie")}
          />
          <BottomNavigationAction
            sx={{ color: "#e0d2d2" }}
            label="Series"
            icon={<LiveTvIcon />}
            onClick={() => store.handleSetMediaType("tv")}
          />
          <BottomNavigationAction
            sx={{ color: "#e0d2d2" }}
            label="Search"
            icon={<SearchIcon />}
            onClick={() => {
              handleOpen();
            }}
          />
        </BottomNavigation>
        <Dialog
          TransitionComponent={Transition}
          onClose={handleClose}
          open={open}
        >
          <DialogTitle>Search for a movie or series here</DialogTitle>
          {handleNoSearchValueWarn(noSearchValue)}
          <TextField
            id="input-with-sx"
            placeholder={"Search here"}
            color={"primary"}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{
              bgcolor: "#e0d2d2",
              m: 2,
              mb: 0,
            }}
          />
          <Button
            sx={{ m: 2, mb: 0 }}
            variant="contained"
            onClick={() => handleSearch()}
          >
            Search
          </Button>
          <Button sx={{ m: 2 }} variant="outlined" onClick={() => handleClose}>
            Close Search
          </Button>
        </Dialog>
      </Container>
    </>
  );
};

export default Layout;
