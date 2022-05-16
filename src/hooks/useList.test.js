import { renderHook, act } from "@testing-library/react-hooks";
import React from "react";
import useList from "./useList";

describe("useList", () => {
  it("should return initialState in list", () => {
    const { result } = renderHook(() => useList({ initialValues: ["react"] }));
    // console.log(result.current);

    expect(result.current.list).toEqual(["react"]);
  });
  it("should add new iten in list", () => {
    const { result } = renderHook(() => useList({ initialValues: ["react"] }));

    // when state is changing like in add method setList wrap in act
    act(() => {
      result.current.add("mobx");
    });
    expect(result.current.list).toEqual(["react", "mobx"]);
  });
  it("should remove  item from list", () => {
    const { result } = renderHook(() => useList({ initialValues: ["react", "mobx"] }));

    // when action changes internal state like in add method setList wrap in act
    act(() => {
      result.current.remove(1);
    });
    expect(result.current.list).toEqual(["react"]);

  });
});
