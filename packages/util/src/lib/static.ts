import { staticUtilities as u } from '../ref/static';
import type{ StaticUtility } from '../ref/interfaces';
import { tansitions } from './tansitions';
import { text } from './text';
import { behaviors } from './behavior';
import { borders } from './border';
import { interactivities } from './interactivity';
import { layouts } from './layout';

const defaultFilter = [
    /^(bg|overflow|pointer|resize|scroll|select|flow|items|content|self|place|cursor)-/,
    /^(block|inline|contents|hidden|visible|block|list-item|flex|grid|row|col|gap|justify|static|float|clear)/,
    /^(rounded|font|leading|break|duration|delay|overflow|select|p|px|py|pt|pl|pb|pr|m|mx|my|mt|ml|mb|mr|w|h)-/,
    /^(italic|not-italic|transition|ease|border)/,
];

const external: StaticUtility = {
    // https://windicss.org/utilities/behaviors.html#box-decoration-break
    ...interactivities,
    ...borders,
    ...text,
    ...tansitions,
    ...behaviors,
    ...layouts,
};

export function staticUtilities(filters = defaultFilter, utilities = { ...u,...external}) {
    const rs: StaticUtility = {};
    const keys = Object.keys(utilities);
    keys.filter(key => {
        for(const reg of filters) {
            if(key.match(reg)) return true;
        }
        return false;
    }).forEach(key => {
        rs[key] = utilities[key];
    });
    return rs;
}