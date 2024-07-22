export interface TableProps {
    headings: Headings;
    data: DataRow[];
  }
  
  export type Headings = string[];
  
  export interface DataRow {
    [key: string]: string | number | boolean;
  }
  