import { parse } from 'url';

export default () => {
  const databaseUrl = process.env.DATABASE_URL;
  const parsed = databaseUrl ? new URL(databaseUrl) : null;

  return {
    database: {
      url: databaseUrl,
    },
  };
};
