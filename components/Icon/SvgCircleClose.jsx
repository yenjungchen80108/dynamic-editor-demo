const SvgCircleClose = ({
  color = "currentColor",
  borderColor = "#fff",
  xColor = "#fff",
  width = 100,
  height = 100,
  backgroundColor = "none",
  svgFillId,
  gradientColor1 = "#843D3A",
  gradientColor2 = "#DC9791",
  gradientDirection = "horizontal", // 'horizontal' or 'vertical'
  strokeWidth = 5,
  ...otherProps
}) => (
  <svg
    fill={color}
    height={height}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...otherProps}
  >
    {svgFillId && gradientColor1 && gradientColor2 && (
      <defs>
        <linearGradient
          id={svgFillId}
          x1={gradientDirection === "horizontal" ? "0%" : "0%"}
          x2={gradientDirection === "horizontal" ? "100%" : "0%"}
          y1={gradientDirection === "horizontal" ? "0%" : "0%"}
          y2={gradientDirection === "horizontal" ? "0%" : "100%"}
        >
          <stop offset="0" stopColor={gradientColor1} />
          <stop offset="1" stopColor={gradientColor2} />
        </linearGradient>
      </defs>
    )}
    <path
      stroke={borderColor}
      fill={
        svgFillId && gradientColor1 && gradientColor2
          ? `url(#${svgFillId})`
          : backgroundColor
      }
      strokeWidth={strokeWidth}
      d="M46.5 2.5c24.301 0 44 19.699 44 44 0 24.3-19.699 44-44 44s-44-19.7-44-44c0-24.301 19.699-44 44-44z"
    />
    <path
      stroke={xColor}
      strokeWidth={strokeWidth}
      fill="none"
      d="M30.506 28.503 66.5 63.862M66.5 30.135l-35.994 35.36"
    />
  </svg>
);

export default SvgCircleClose;
