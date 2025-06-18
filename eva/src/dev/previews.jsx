import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {Result} from "../views/LocationSearch/components";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Result">
                <Result/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews