import { expect, it, suite } from "vitest";
import { timerUtils } from "./timerUtils";

suite("minutesToSeconds", () => {
  it(`minutesToSeconds(1)`, () => {
    const result = timerUtils.minutesToSeconds(1);
    expect(result).toEqual(60);
  });

  it(`minutesToSeconds(2)`, () => {
    const result = timerUtils.minutesToSeconds(2);
    expect(result).toEqual(120);
  });
  it(`minutesToSeconds(0)`, () => {
    const result = timerUtils.minutesToSeconds(0);
    expect(result).toEqual(0);
  });

  it(`should throw error when negative number is provided`, () => {
    expect(() => {
      timerUtils.minutesToSeconds(-1);
    }).toThrowError(
      "Only positive numbers can be converted to seconds. The provided value is: -1"
    );
  });
});

suite("secondsToDisplayedTimer", () => {
  it("should show 120 seconds as 2 minutes and 0 seconds", () => {
    const result = timerUtils.secondsToDisplayedTimer(120);
    expect(result).toEqual("02:00");
  });

  it("should show 125 seconds as 2 minutes and 5 seconds", () => {
    const result = timerUtils.secondsToDisplayedTimer(125);
    expect(result).toEqual("02:05");
  });

  it(`should throw error when negative number is provided`, () => {
    expect(() => {
      timerUtils.secondsToDisplayedTimer(-120);
    }).toThrowError(
      "Only positive numbers can be converted. The provided value is: -120"
    );
  });
});
