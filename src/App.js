import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Character } from "./pages/Character";
import Episode from "./pages/Episode/Episode";

import { Main } from "./pages/Main";

function App() {
  return (
    <Box margin={"0 50px 0 50px"}>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/episode/:id" element={<Episode />} />
        <Route path="/characters/:name" element={<Character />} />
      </Routes>
    </Box>
  );
}

export default App;
