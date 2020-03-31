export default () => {
  const tokenMeta = document.getElementsByName('csrf-token')[0];
  return tokenMeta && tokenMeta.content;
};
