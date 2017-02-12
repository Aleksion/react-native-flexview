import * as React from "react"
import { View, StyleSheet } from "react-native"

interface Props {
    flex: number,
    direction?: "row" | "column"
    style?: React.ViewStyle,
    align?: "left" | "center" | "right",
    children?: React.ReactNode
}


const LEFT_ALIGN = "left"
const RIGHT_ALIGN = "right"
const CENTER_ALIGN = "center"
type Alignment = "left" | "right" | "center"


export default (props: Props) => {
    const style = [props.style, { flexDirection: props.direction || "row" }]
    const alignment = props.align || CENTER_ALIGN;

    function calculateSpacerflex(flex: number, alignment: Alignment) {
        flex = convertFlex(flex)

        const divisor = alignment === CENTER_ALIGN ? 2 : 1;

        return (100 - flex) / divisor
    }

    // Flex can be indicated as either being between 0 and 1 or 0 and a 100. 
    // This function converts it accordingly
    function convertFlex(flex: number) {
        if (flex < 1) {
            flex = flex * 100
        }

        return flex
    }

    function shouldRenderView(view: Alignment, align: Alignment): boolean {
        return view === align || align === CENTER_ALIGN
    }

    // This enables passing on style attributes to the children
    const childrenWithProps = React.Children.map(props.children, (child, index) => {
        if (index !== 0) {
            return child
        }

        const el = (child as React.ReactElement<any>)
        const elStyle = [el.props.style, { flex: convertFlex(props.flex) }]

        return React.cloneElement(el, { style: elStyle })
    })

    return (
        <View style={style}>
            {shouldRenderView(RIGHT_ALIGN, alignment) ? <View style={{ flex: calculateSpacerflex(props.flex, alignment) }} /> : undefined}
            {childrenWithProps}
            {shouldRenderView(LEFT_ALIGN, alignment) ? <View style={{ flex: calculateSpacerflex(props.flex, alignment) }} /> : undefined}
        </View>
    )
}