export type RouteConfig = Record<
  string,
  Array<{
    path: string;
    icon: React.FC;
    label: string;
    description: string;
  }>
>;
