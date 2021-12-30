import classnames from 'classnames'
import '../common/common.module.css'


var cacher = {};

// 缓存结果
function mergeCommonClassNames(ref) {

    let {Overflow,Direction,Wrap,Grow,Shrink,AlignItems,AlignSelf,JustifyContent,AlignContent}=ref;
    const key = JSON.stringify({
        Overflow: Overflow,
        Direction: Direction,
        Wrap: Wrap,
        Grow: Grow,
        Shrink: Shrink,
        AlignItems: AlignItems,
        AlignSelf: AlignSelf,
        JustifyContent: JustifyContent,
        AlignContent: AlignContent
    });


    if (!cacher[key]) {
        const classNames =
        classnames({ [`overflow-${Overflow}`]: Overflow },
            {'direction-column':Direction === 'column'},
            {'warp':Wrap === true},
            {'nowrap':Wrap === false},
            { [`grow-${Grow}`]: Grow <= 5 },
            { [`shrink-${Shrink}`]: Shrink <= 5 },
            { [`align-items-${AlignItems}`]: AlignItems },
            { [`align-self-${AlignSelf}`]: AlignSelf },
            { [`align-content-${AlignContent}`]: AlignContent },
            { [`justify-content-${JustifyContent}`]: JustifyContent },
            )
        cacher[key] = classNames;
    }

    return cacher[key];
}


export default mergeCommonClassNames
