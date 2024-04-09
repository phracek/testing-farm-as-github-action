import { test, expect, describe } from 'vitest';

import {
  composeStatusDescription,
  getSummary,
  isJsonString,
} from '../../src/util';

describe('Utility functions', () => {
  test('composeStatusDescription', () => {
    let description = '';

    description = composeStatusDescription(false, '');
    expect(description).toMatchInlineSnapshot('"Build finished"');

    description = composeStatusDescription(false, ' - tf summary message');
    expect(description).toMatchInlineSnapshot(
      '"Build finished - tf summary message"'
    );

    description = composeStatusDescription(true, '');
    expect(description).toMatchInlineSnapshot(
      '"Build failed - Infra problems"'
    );

    description = composeStatusDescription(true, ' - tf summary message');
    expect(description).toMatchInlineSnapshot(
      '"Build failed - Infra problems - tf summary message"'
    );
  });

  test('getSummary', () => {
    let summary = '';

    summary = getSummary(null);
    expect(summary).toEqual('');

    summary = getSummary(undefined);
    expect(summary).toEqual('');

    summary = getSummary({ summary: '' });
    expect(summary).toEqual('');

    summary = getSummary({ summary: 'tf summary message' });
    expect(summary).toMatchInlineSnapshot('" - tf summary message"');
  });
  test('isJsonString', () => {
    let hardware = '{"key1": "value1", "key2": "value2"}';
    let result = false;

    result = isJsonString('');
    expect(result).toEqual(false);

    result = isJsonString(undefined);
    expect(result).toEqual(false);

    result = isJsonString({});
    expect(result).toEqual(false);

    result = isJsonString(hardware);
    expect(result).toEqual(true);

    result = isJsonString('{"something": }');
    expect(result).toEqual(false);
  });
});
