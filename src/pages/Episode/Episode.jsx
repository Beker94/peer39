import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

function Episode() {
  const [episode, setEpisode] = useState(null);
  const [isError, setIsError] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        `https://www.breakingbadapi.com/api/episodes/${id}`
      );

      if (result.ok) {
        const episodes = await result.json();

        if (episodes.length === 0) {
          setIsError(true);
        }

        setEpisode(episodes[0]);
      } else {
        setIsError(true);
      }
    }

    fetchData();
  }, [id]);

  return (
    <Box margin={"10px"}>
      {episode && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {episode.title}
            </Typography>
            <Typography>{`Air date: ${episode.air_date}`}</Typography>
            <Box>
              <Typography>{`Characters:`}</Typography>
              <Box>
                {episode.characters.map((el) => {
                  return (
                    <Box component={"span"} marginRight={"5px"} key={el}>
                      <Link to={`/characters/${el}`}>{el}</Link>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Link to="/">All episodes</Link>
            </Box>
          </CardContent>
        </Card>
      )}

      {isError && (
        <Typography variant="h5" component="div">
          ERROR
        </Typography>
      )}
    </Box>
  );
}

export default Episode;
