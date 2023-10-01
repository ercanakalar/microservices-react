export interface DoRequestInterface {
  url: string;
  method: string;
  body: {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
  };
  onSuccess?: any;
}
