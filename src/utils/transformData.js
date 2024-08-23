function transformData(data, fieldMapping, headerMapping, id) {
  const mappedItem = {};
  mappedItem._id = id;
  for (const [_, tableValue] of Object.entries(headerMapping)) {
    mappedItem[tableValue] = [];
  }
  for (const [tableKey, tableValue] of Object.entries(data)) {
    const newTableKey = headerMapping[tableKey];
    const tableMapping = fieldMapping[tableKey];
    function mapRow(row) {
      const mappedRow = {};
      for (const [fieldKey, fieldValue] of Object.entries(row)) {
        const newFieldKey = tableMapping[fieldKey];
        if (newFieldKey) mappedRow[newFieldKey] = fieldValue;
      }
      return mappedRow;
    }
    if (Array.isArray(tableValue)) {
      mappedItem[newTableKey] = tableValue.map((row) => {
        return mapRow(row);
      });
    } else {
      mappedItem[newTableKey] = mapRow(tableValue);
    }
  }
  return mappedItem;
}

export default transformData