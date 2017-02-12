import * as React from "react";
import { View } from "react-native";
const LEFT_ALIGN = "left";
const RIGHT_ALIGN = "right";
const CENTER_ALIGN = "center";
export default (props) => {
    const style = [props.style, { flexDirection: props.direction || "row" }];
    const alignment = props.align || CENTER_ALIGN;
    function calculateSpacerflex(flex, alignment) {
        flex = convertFlex(flex);
        const divisor = alignment === CENTER_ALIGN ? 2 : 1;
        return (100 - flex) / divisor;
    }
    function convertFlex(flex) {
        if (flex < 1) {
            flex = flex * 100;
        }
        return flex;
    }
    function shouldRenderView(view, align) {
        return view === align || align === CENTER_ALIGN;
    }
    const childrenWithProps = React.Children.map(props.children, (child, index) => {
        if (index !== 0) {
            return child;
        }
        const el = child;
        const elStyle = [el.props.style, { flex: convertFlex(props.flex) }];
        return React.cloneElement(el, { style: elStyle });
    });
    return (<View style={style}>
            {shouldRenderView(RIGHT_ALIGN, alignment) ? <View style={{ flex: calculateSpacerflex(props.flex, alignment) }}/> : undefined}
            {childrenWithProps}
            {shouldRenderView(LEFT_ALIGN, alignment) ? <View style={{ flex: calculateSpacerflex(props.flex, alignment) }}/> : undefined}
        </View>);
};
//# sourceMappingURL=flexview.js.map