import { expect } from 'chai';
import factory from '../token-factory';
import crawler from '../crawler';
import TokenSet from '../token-set';
import TokenRefinery from '../token-refinery';

import { source as objSource, result as objResult } from './refinery/obj-to-yaml';
import { source as jsInYamlSource, result as jsInYamlResult, newData } from './refinery/js-in-yaml';

describe('Token Refinery', () => {
  it('refines plain object data into the correct yaml format', () => {
    const mappingToken = factory.createToken(objSource);
    const refinery = new TokenRefinery(mappingToken, '');
    const { yaml } = refinery.refineTree();
    expect(yaml).to.equal(objResult);
  });

  it('refines JS-like data embedded in yaml', () => {
    const set = new TokenSet(jsInYamlSource);

    // The crawler calls `set.refineTree()` internally
    crawler.assignMappingItem(set, 'foo.bing', newData);

    expect(set.toYAML()).to.equal(jsInYamlResult);
  });
});
