export interface PickerItemInfo {
  title: string;
  id: string;
}

export type SequencePickerData = {
  name: string;
  data: PickerItemInfo[];
};
