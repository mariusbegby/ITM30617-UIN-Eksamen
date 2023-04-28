import client from './client';

// Generalized query builder for fetching a single user by email and their games
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

// Fetch a single user by email and return only their games
const fetchUserGamesList = async (email, gamesListFilter) => {
    const query = buildUserQuery(email, gamesListFilter);
    const results = await client.fetch(query);
    return results[0].userGamesList || [];
};

// Fetch a single user by email and return their full object
export const getUserByEmail = async (email) => {
    const query = buildUserQuery(email, '[]');
    const results = await client.fetch(query);
    return results[0] || {};
};

// Fetch a single user by email and return their full list of games
export const getGamesByUser = async (email) => {
    return fetchUserGamesList(email, '[]');
};

// Fetch a single user by email and return their list of games filtered by only favourited
export const getFavouritedGamesByUser = async (email) => {
    return fetchUserGamesList(email, '[isFavourite == true]');
};

// Fetch a single game by slug and return its full object
export const getSingleGameFromLibraryBySlug = async (email, gameSlug) => {
    const query = `*[_type == "user" && userEmail == "${email}"]{
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
    return game || {};
};

// Update the favourite status of a single game by game id for user by email
export const updateFavouriteStatus = async (email, gameId, isFavourite) => {
    const users = await client.fetch(
        `*[_type == "user" && userEmail == "${email}"]{
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
