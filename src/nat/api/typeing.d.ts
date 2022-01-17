declare namespace API {
  type GetClassesDayInfoParam = {
    date: string;
    classes: string;
  };
  type Response<T> = {
    ok: 0 | 1;
    msg: string;
    data: T;
  };
  type ClassesDayInfo = {
    uploadUserList: string[];
    percent: number;
    studentCount: number;
    uploadStudentCount: number;
  };
  type GetClassesDayInfoResult = Response<ClassesDayInfo>;
}
