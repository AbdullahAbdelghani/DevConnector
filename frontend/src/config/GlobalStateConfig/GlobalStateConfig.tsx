import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from ".";

export function GlobalStateConfig({ children }: PropsWithChildren) {
  return <Provider store={store}> {children} </Provider>;
}
