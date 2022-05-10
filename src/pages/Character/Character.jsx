import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

function Character() {
  const [character, setCharacter] = useState(null);
  const [isError, setIsError] = useState(false);

  const { name } = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        `https://www.breakingbadapi.com/api/characters?name=${name}`
      );

      if (result.ok) {
        const characters = await result.json();

        if (characters.length === 0) {
          setIsError(true);
        }
        setCharacter(characters[0]);
      } else {
        setIsError(true);
      }
    }

    fetchData();
  }, [name]);

  return (
    <Box margin={"10px"}>
      {character && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Name {character.name}
            </Typography>
            <CardMedia
              component="img"
              image={character.img}
              alt="green iguana"
            />
            <Typography>Birth: {character.birthday}</Typography>
            <Typography>Nickname: {character.nickname}</Typography>
            <Typography>Status: {character.status}</Typography>
            <Typography>Occupation: {character.occupation.join()}</Typography>

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

export default Character;
