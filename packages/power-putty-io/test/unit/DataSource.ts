import { expect } from 'power-putty-test';
import { DataSource } from '../../src';

describe('DataSource', () => {

  it('should construct safely', () => {
    expect(() => new DataSource('test', 'data')).not.to.throw;
  });

});
