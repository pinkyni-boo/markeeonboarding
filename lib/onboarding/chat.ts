export const openMarkeeChat = () => {
  if (typeof window !== 'undefined' && (window as any).MarkeeChat) {
    (window as any).MarkeeChat.open();
  } else {
    alert('Tính năng Live Chat đang được kết nối...');
  }
};
