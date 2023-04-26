export default {
  title: 'Game document',
  name: 'game',
  type: 'document',
  fields: [
    {
      title: 'Game ID',
      name: 'gameId',
      type: 'number',
    },
    {
      title: 'Game Title',
      name: 'gameTitle',
      type: 'string',
    },
    {
      title: 'Game URL Slug',
      name: 'gameSlug',
      type: 'string',
    },
    {
      title: 'Game Genres',
      name: 'gameGenres',
      type: 'array',
      of: [{type: 'genre'}],
    },
  ],
}
