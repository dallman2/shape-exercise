import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Shape.css";

/**
 * 
 * @param props - please supply this shapes data as a prop
 * @returns the shape component
 */
const Shape = (props) => {
  const motion = useSelector((state) => state.motion);
  const shapes = useSelector((state) => state.shapes);


  let [transClass, setTransClass] = useState(false);
  let [selectedShapeStyle, setSelectedShapeStyle] = useState({});

  useEffect(() => {
    switch (props.data.type) {
      case "circles":
        setSelectedShapeStyle({
          height: `${props.data.size * 2}px`,
          width: `${props.data.size * 2}px`,
          borderRadius: `${props.data.size}px`,
          backgroundColor: props.data.color,
        });
        break;
      case "squares":
        setSelectedShapeStyle({
          height: `${props.data.size * 2}px`,
          width: `${props.data.size * 2}px`,
          backgroundColor: props.data.color,
        });
        break;
      case "triangles":
        setSelectedShapeStyle({
          width: 0,
          height: 0,
          borderBottom: `${props.data.size * 2}px solid ${props.data.color}`,
          borderLeft: `${props.data.size}px solid transparent`,
          borderRight: `${props.data.size}px solid transparent`,
        });
        break;
      default:
        break;
    }
  }, [props.data]);

  // this is the side effect block that handles transparency stuff
  // again, we only want to rerender if a `transparency` value changes
  useEffect(() => {
    if (shapes.transparent[props.data.type]) setTransClass(true);
    else setTransClass(false);
  }, [shapes.transparent, props.data]);

  return (
    <div 
      className={`Shape ${transClass ? "Transparent" : ""}`}
      style={{ ...selectedShapeStyle, ...motion.style[props.data.index] }}
    >
      {props.data.name}
    </div>
  );
};

export default Shape;
