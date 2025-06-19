export interface FindVoucherPagesWithFiltersResource {
  page?: number;
  limit?: number;
  issue_date?: string;
  document_type?: string;
  status?: string;
}