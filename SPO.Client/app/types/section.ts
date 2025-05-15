export type Section = {
  id: string;
  type: "horizontal" | "vertical";
  title?: string;
  data?: any[];
  loading?: boolean;
  error?: string | null;
  renderItem?: ({ item }: { item: any }) => React.ReactElement;
};