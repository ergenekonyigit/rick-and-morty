import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const BaseWidth = 375;

const scale = (size) => (deviceWidth / BaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const responsive = {
  fontSize: (size) => moderateScale(size, 1),
  wpercent: (percent) => Math.round((percent * deviceWidth) / 100),
  number: (n) => moderateScale(n, 1),
  deviceWidth,
  deviceHeight,
};
