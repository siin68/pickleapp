type Props = {
  height?: number | string;
  width?: number | string;
};
export function Spacer({ height, width }: Props) {
  return <div style={{ height, width }} />;
}
