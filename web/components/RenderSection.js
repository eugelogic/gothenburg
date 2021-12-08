import {upperFirst} from 'lodash'
import * as SectionComponents from './sections'

const resolveSections = (section) => {

    const Section = SectionComponents[upperFirst(section._type)]

    if (Section) {
      return Section
    }

    console.error('Cant find section', section._type)
    return null
}

const RenderSection = (props) => {

    const { sections } = props

    if (!sections) {
        console.error('Missing section')
        return <div>Missing sections</div>
    }

    // console.log('sections', sections)

    return (
        <>
             {sections.map(section => {
                const SectionComponent = resolveSections(section)
                if (!SectionComponent) {
                return <div>Missing section {section._type}</div>
                }
                return <SectionComponent {...section} key={section._key} />
            })}
        </>
    )
}

export default RenderSection