type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

declare module '*.jpg' {
  const value: string;
  export default value;
}
