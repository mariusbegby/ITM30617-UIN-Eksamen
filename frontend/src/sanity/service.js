import client from './client';

export const getMyGames = async (loggedInUser) => {
    const query = `*[_type == "user" && userEmail == "${loggedInUser.email}"] {
        _id, userId, userEmail, userGamesList[] {
          isFavourite, hoursPlayed, gameRef-> {
            gameApiId, gameSlug, gameTitle, gameGenres[] {
              genreRef->
            }
          }
        }
      }`;
    const results = await client.fetch(query);
    return results[0].userGamesList;
};

export const getFavouritedGames = async (loggedInUser) => {
    const query = `*[_type == "user" && userEmail == "${loggedInUser.email}"] {
        _id, userId, userEmail, userGamesList[isFavourite == true] {
          isFavourite, hoursPlayed, gameRef-> {
            gameApiId, gameSlug, gameTitle, gameGenres[] {
              genreRef->
            }
          }
        }
      }`;
    const results = await client.fetch(query);
    return results[0].userGamesList;
};

export const getSingleGameFromLibrary = async (loggedInUser, gameSlug) => {
    console.log('getSingleGameFromLibrary called with:', {
        loggedInUser,
        gameSlug
    });

    const gameResult = await client.fetch(
        `*[_type == "user" && userEmail == "${loggedInUser.email}"]{
            "game": userGamesList[gameRef->gameSlug == "${gameSlug}"]{
                  "gameData": gameRef-> {
                      gameApiId,
                      gameTitle,
                      gameSlug,
                      gameGenres[] {
                        genreRef-> { genreName }
                      }
                  },
                  hoursPlayed
                }
          }[0].game`
    );

    const game = gameResult[0];
    return game;
};

export const updateFavouriteStatus = async (
    loggedInUser,
    gameId,
    isFavourite
) => {
    console.log('updateFavouriteStatus called with:', {
        loggedInUser,
        gameId,
        isFavourite
    });

    const users = await client.fetch(
        `*[_type == "user" && userEmail == "${loggedInUser.email}"]{
        _id,
        userGamesList[] { gameRef-> {
              gameApiId
            }
          }
      }`
    );

    let user = users[0];

    if (!user) {
        console.error('User not found in Sanity');
        return;
    }

    const gameIndex = user.userGamesList.findIndex(
        (game) => String(game.gameRef.gameApiId) === String(gameId)
    );

    if (gameIndex === -1) {
        console.error('Game not found in user library');
        return;
    }

    await client
        .patch(user._id)
        .set({
            [`userGamesList[${gameIndex}].isFavourite`]: isFavourite
        })
        .commit();
};
