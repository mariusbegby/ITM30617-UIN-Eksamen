export default {
  title: 'User document',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'User ID',
      name: 'userId',
      type: 'string',
    },
    {
      title: 'User email',
      name: 'userEmail',
      type: 'string',
    },
    {
      title: 'User Game Library',
      name: 'userGamesList',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Game',
              name: 'game',
              type: 'reference',
              to: [{type: 'game'}],
            },
            {
              title: 'Is Favourite',
              name: 'isFavourite',
              type: 'boolean',
            },
            {
              title: 'Hours Played',
              name: 'hoursPlayed',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
