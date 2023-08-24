export enum Quality {
  Eco = 'Eco',
  Performance = 'Performance',
}

export interface TaskBlockProperties {
  name: string;
  role_prompt: string;
  quality: Quality;
}
