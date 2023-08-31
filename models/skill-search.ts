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

export type SkillType = {
  id: string;
  birthday: string;
  fullName: string;
  departmentName: string;
  skills: any[];
  email: string;
  roleName: string;
};

export type SkillTableType = {
  querySkills: {
    content: SkillType[];
  };
};

export type CertType = {
  id: string;
  birthday: string;
  fullName: string;
  departmentName: string;
  certs: any[];
  email: string;
  roleName: string
};

export type CertTableType = {
  querySkills: {
    content: CertType[];
  };
};

export type MasterCertType = {
  name: string,
  id: string,
  description: string
}