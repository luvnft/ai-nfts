export const mapQueryObj = (data) => {
  let queryOptions = { skip: true };

  if (data) {
    const tokens = data.map((token) => token.token_id);

    if (data.length > 0) {
      queryOptions = {
        variables: { ids: tokens },
      };
    }
  }

  return { queryOptions };
};
