// frontend/src/hooks/useAuth.ts
export const useAuth = () => {
  // Giả lập một user là BUYER để bạn thấy được các nút bấm
  return {
    user: {
      id: '1',
      role: 'BUYER', // Bạn có thể đổi thành 'SELLER' hoặc 'ADMIN' để test
    },
    loading: false,
  };
};