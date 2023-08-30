export type SkillQueryDataType = {
  departmentName: string;
  keywords: SkillQueryKeywordType[];
};

export type SkillQueryKeywordType = {
  keyword: string;
  mandatory: boolean;
};

export type CertQueryDataType = {
  departmentName: string;
  keywords: CertQueryKeywordType[];
};

export type CertQueryKeywordType = {
  keyword: string;
  mandatory: boolean;
};

export type EmployeeQueryDataType = {
  keyword?: string;
  department?: string;
};
