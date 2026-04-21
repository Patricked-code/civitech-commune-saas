export type AdminSummary = {
  usersCount: number;
  proceduresCount: number;
  dossiersCount: number;
};

export type AdminUser = {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  status?: string;
  roleCodes?: string[];
};

export type ProcedureItem = {
  id?: string;
  code: string;
  title: string;
  domain?: string;
  category?: string;
  feeAmount?: number | string;
  estimatedDelayDays?: number | string;
};

export type RoleItem = {
  code: string;
  label: string;
  scope?: string;
};

export type DossierListItem = {
  reference: string;
  procedureId?: string;
  procedureCode?: string;
  procedureTitle?: string;
  status: string;
  currentStep?: string;
  nextStep?: string | null;
  computedProgress?: number;
  priorityScore?: number;
  documentsCount?: number;
};

export type CitizenDashboard = {
  summary: {
    total: number;
    drafts: number;
    submitted: number;
    inProgress: number;
  };
  dossiers: DossierListItem[];
};

export type DossierDocument = {
  id: string;
  documentType: string;
  storageKey: string;
  originalFilename: string;
  mimeType: string;
  validationStatus?: string;
};

export type DossierEvent = {
  id?: string;
  eventType: string;
  eventLabel: string;
  payloadJson?: string;
};

export type DossierDetail = DossierListItem & {
  service?: string;
  events: DossierEvent[];
  documents: DossierDocument[];
};

export type AgentDocumentRow = {
  dossierReference: string;
  procedureTitle: string;
  dossierStatus: string;
  document: DossierDocument;
};
