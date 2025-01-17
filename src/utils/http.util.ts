export type Props = {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Omit<RequestInit, 'body'> & { body?: any };
}

export const get = async ({
  url,
  options
}: Props) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}${url}`,
      options
    );
  
    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        data: await response.json()
      }
    }
  } catch {
    return {
      ok: false,
      status: 500
    }
  }
}