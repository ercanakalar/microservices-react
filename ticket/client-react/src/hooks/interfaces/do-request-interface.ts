export interface DoRequestInterface {
  url: string;
  method: string;
  body: {
    email?: string | undefined;
    password?: string | undefined;
  };
  onSuccess?: any;
}
