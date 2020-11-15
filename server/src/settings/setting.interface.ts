interface Setting {
  _id?: string;
  name: string;
  value?: string;
  isActive: boolean;
  isEditable: boolean;
}

export default Setting;
