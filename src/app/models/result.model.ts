export class ResultModel<T> {
  data?: T;
  errorMessages?: string[];
  successMessage?: string;
  isSuccessful: boolean = false;
}
