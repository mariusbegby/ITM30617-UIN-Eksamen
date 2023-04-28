import client from './client';

const buildUserQuery = (email, gamesListFilter) => `
*[_type == "user" && userEmail == "${email}"] {
  _id, userId, userEmail, userGamesList${gamesListFilter} {
    isFavourite, hoursPlayed, gameRef-> {
      gameApiId, gameSlug, gameTitle, gameGenres[] {
        genreRef->
      }
    }
  }
}`;

const fetchUserGamesList = async (email, gamesListFilter) => {
    const query = buildUserQuery(email, gamesListFilter);
    const results = await client.fetch(query);
    return results[0].userGamesList;
};

export const getMyGames = async (loggedInUser) => {
    return fetchUserGamesList(loggedInUser.email, '[]');
};

export const getFavouritedGames = async (loggedInUser) => {
    return fetchUserGamesList(loggedInUser.email, '[isFavourite == true]');
};

export const getSingleGameFromLibrary = async (loggedInUser, gameSlug) => {
    const query = `*[_type == "user" && userEmail == "${loggedInUser.email}"]{
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
  }[0].game`;

    const gameResult = await client.fetch(query);
    const game = gameResult[0];
    return game;
};

export const updateFavouriteStatus = async (
    loggedInUser,
    gameId,
    isFavourite
) => {
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
