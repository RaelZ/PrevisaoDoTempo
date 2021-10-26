interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token:
          'airgbuyq3rguywqear873rb3uifgw89fnweuqro8iu34bfwe8orh23biuryb3iy',
        user: {
          name: 'William',
          email: 'William.milgrau@gmail.com',
        },
      });
    });
  });
}
