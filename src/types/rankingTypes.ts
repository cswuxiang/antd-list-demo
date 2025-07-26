export interface ModelRankingItem {
  id: string;
  rank: number;
  name: string;
  totalScore: number;
  codeSecurity: number;
  codeQuality: number;
}

export type TabKey = 
  | 'all' 
  | 'ranking' 
  | 'xss' 
  | 'sqlInjection' 
  | 'pathTraversal' 
  | 'codeInjection' 
  | 'inputValidation' 
  | 'deserialization' 
  | 'openSourceSecurity' 
  | 'unsafePractices';