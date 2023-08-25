export enum ApiOwner {
  Crafter = 'Crafter',
  User = 'User',
}

export interface ToolBlockProperties {
  function_name?: string;
  description?: string;
  tool_class_id?: string;
  api_owner?: ApiOwner;
  api_key?: string;
}
