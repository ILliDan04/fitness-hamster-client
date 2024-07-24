export const useClipboard = () => {
  const copyToClipboard = (data: string) => {
    return window.navigator.clipboard.writeText(data);
  };

  return copyToClipboard;
};
