enum ResponseCodesEnum {
  SuccessWithData = 1,
  // Add other response codes as needed
}

enum CounterEnum {
  Zero = 0,
  // Add other counter values as needed
}

export class Response<T> {
  constructor() {
    this.responseCode = ResponseCodesEnum.SuccessWithData;
    this.isSucceded = true;
    this.errors = [];
    this.successObjCount = CounterEnum.Zero;
  }

  // Get data codes
  // 1 = Success & retrieve data
  // 2 = Success & No Data found

  // Insert, Update, & Delete codes
  // 11 = All records succeeded
  // 12 = Some records succeeded

  // General Codes
  // 3 = Error in sent parameters
  // 4 = DB Exception

  responseCode: number;
  successObjCount?: number;
  pageNumber?: number;
  pageLength?: number;
  totalPages?: number;
  data?: T;
  isSucceded: boolean;
  errors?: Error[];
}

export class Error {
  constructor(public errorMessage?: string | null) {}
}

export class Empty {}
