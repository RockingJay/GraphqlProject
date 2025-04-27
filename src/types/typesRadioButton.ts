
export type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
};

export type RadioGroupProps = {
    onPress: (value: string) => void;
}

