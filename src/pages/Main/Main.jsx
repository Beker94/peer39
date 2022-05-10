import { useState, useEffect, useCallback, Fragment } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSeasons } from "../../utils";

function Main() {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://www.breakingbadapi.com/api/episodes");

      if (result.ok) {
        const episodes = await result.json();

        setSeasons(getSeasons(episodes));

        setSeries(episodes);
      }
    }

    fetchData();
  }, []);

  const openEpisode = useCallback(
    async (id) => {
      navigate(`/episode/${id}`);
    },
    [navigate]
  );

  return (
    <>
      {seasons.map((season) => {
        return (
          <Fragment key={`season-${season}`}>
            <Typography variant="h3" component="div" padding={"16px"}>
              {`Season ${season}`}
            </Typography>

            <Grid container spacing={2} padding={"10px"}>
              {series
                .filter((el) => Number(el.season) === season)
                .map((el) => {
                  return (
                    <Grid item xs={6} md={3} key={el.episode_id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ cursor: "pointer" }}
                            onClick={() => openEpisode(el.episode_id)}
                          >
                            {el.title}
                          </Typography>
                          <Typography>{el.air_date}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Fragment>
        );
      })}
    </>
  );
}

export default Main;
