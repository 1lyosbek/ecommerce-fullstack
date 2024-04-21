export class ResData<TData> {
  variant: string;
  message: string;
  statusCode: number;
  data: TData | null;
  error: Error | null;
  constructor(
    variant: string,
    message: string,
    statusCode: number,
    data: TData | null = null,
    error: Error | null = null,
  ) {
    this.variant = variant;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }
}
