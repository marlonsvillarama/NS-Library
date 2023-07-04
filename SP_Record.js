define(
    [
        'N/record'
    ],
    (
        record
    ) => {
        const Record = (options) => {
            let me = this;
            me.record = options.record;
            me.id = options.record.id || '';
            me.type = options.record.type;

            this.getFields = () => {
                return me.record.getFields();
            };

            this.getField = (fieldId) => {
                return me.record.getField({ fieldId: fieldId });
            };

            this.getValue = (fieldId) => {
                return me.record.getValue({ fieldId: fieldId });
            };

            this.getText = (fieldId) => {
                return me.record.getText({ fieldId: fieldId });
            };

            this.setText = (options) => {
                return me.record.setText(options);
            };

            this.setValue = (options) => {
                return me.record.setValue(options);
            };

            this.getLineCount = (sublistId) => {
                return me.record.getLineCount({ sublistId: sublistId });
            };

            this.insertLine = (options) => {
                return me.record.insertLine(options);
            };

            this.removeLine = (options) => {
                return me.record.removeLine(options);
            };

            this.selectLine = (options) => {
                return me.record.selectLine(options);
            };

            this.selectNewLine = (options) => {
                return me.record.selectNewLine(options);
            };

            this.commitLine = (options) => {
                return me.record.commitLine(options);
            };

            this.findSublistLineWithValue = (options) => {
                return me.record.findSublistLineWithValue(options);
            };

            this.getCurrentSublistValue = (options) => {
                return me.record.getCurrentSublistValue(options);
            };

            this.getCurrentSublistText = (options) => {
                return me.record.getCurrentSublistText(options);
            };

            this.getCurrentSublistIndex = (options) => {
                return me.record.getCurrentSublistIndex(options);
            };

            this.getSublistValue = (options) => {
                return me.record.getSublistValue(options);
            };

            this.getSublistText = (options) => {
                return me.record.getSublistText(options);
            };

            this.getSublistField = (options) => {
                return me.record.getSublistField(options);
            };

            this.getSublistFields = (options) => {
                return me.record.getSublistFields(options);
            };

            this.getSublistSubrecord = (options) => {
                return me.record.getSublistSubrecord(options);
            }

            this.getSubrecord = (options) => {
                return me.record.getSubrecord(options);
            };

            this.setSublistValue = (options) => {
                return me.record.setSublistValue(options);
            };

            this.setSublistText = (options) => {
                return me.record.setSublistText(options);
            };

            this.setCurrentSublistValue = (options) => {
                return me.record.setCurrentSublistValue(options);
            };

            this.setCurrentSublistText = (options) => {
                return me.record.setCurrentSublistText(options);
            };

            this.save = (options) => {
                me.id = me.record.save(options);
                return me.id;
            };

            this.getValues = (options) => {
                let values = {};
                Object.keys(options.fieldMap).forEach(key => {
                    let fieldId = options.fieldMap[key];
                    if (fieldId) {
                        values[key] = key.indexOf('_Text') > -1 ?
                            me.getText({ fieldId: fieldId }) :
                            me.getValue({ fieldId: fieldId });
                    }
                });
                return values;
            };

            this.setValues = (options) => {
                Object.keys(options.values).forEach(key => {
                    let value = options.values[key];
                    let fieldId = options.fieldMap ? options.fieldMap[key] : key;
                    if (!fieldId) {
                        return;
                    }

                    let setOptions = { fieldId: fieldId };
                    if (key.indexOf('_Text') > -1) {
                        setOptions.text = value;
                        me.setText(setOptions);
                    }
                    else {
                        setOptions.value = value;
                        me.setValue(setOptions);
                    }
                });
            };

            this.setCurrentSublistValues = (options) => {
                let sublistId = options.sublistId;
                let fieldMap = options.fieldMap;
                let fieldValues = options.values;
                let line = options.line;
                me.selectLine({ sublistId: sublistId, line: line });
                Object.keys(fieldValues).forEach(key => {
                    let fieldId = fieldMap[key];
                    let value = fieldValues[key];
                    if (!fieldId) {
                        return;
                    }

                    let setOptions = { sublistId: sublistId, fieldId: fieldId };
                    if (key.indexOf('_Text') > -1) {
                        setOptions.text = value;
                        me.setCurrentSublistText(setOptions);
                    }
                    else {
                        setOptions.value = value;
                        me.setCurrentSublistValue(setOptions);
                    }
                });
                me.commitLine({ sublistId: sublistId });
            };

            this.setSublistValues = (options) => {
                let sublistId = options.sublistId;
                let fieldMap = options.fieldMap;
                let fieldValues = options.values;
                let line = options.line;
                Object.keys(fieldValues).forEach(key => {
                    let fieldId = fieldMap[key];
                    let value = fieldValues[key];
                    if (!fieldId) {
                        return;
                    }

                    let setOptions = { sublistId: sublistId, fieldId: fieldId, line: line };
                    if (key.indexOf('_Text') > -1) {
                        setOptions.text = value;
                        me.setSublistText(setOptions)
                    }
                    else {
                        setOptions.value = value;
                        me.setSublistValue(setOptions);
                    }
                });
            };

            this.getSublistLine = (options) => {
                let sublistLine = {};
                let sublistId = options.sublistId;
                let line = options.line;
                let fieldMap = options.fieldMap;
                Object.keys(fieldMap).forEach(key => {
                    let fieldId = fieldMap[key];
                    if (!fieldId) {
                        return;
                    }

                    let options = { sublistId: sublistId, fieldId: fieldId, line: line };
                    sublistLine[key] = key.indexOf('_Text') > -1 ?
                        me.getSublistText(options) :
                        me.getSublistValue(options);
                    
                    if (!fieldMap.hasOwnProperty('line')) {
                        sublistLine.line = line;
                    }

                    return sublistLine;
                });
            };

            this.getSublistLines = (options) => {
                let sublistId = options.sublistId;
                let fieldMap = options.fieldMap;
                let sublistLines = [];
                let lineCount = me.getLineCount({ sublistId: sublistId });
                for (let i=0; i<lineCount; i++) {
                    sublistLines.push(
                        me.getSublistLine({
                            sublistId: sublistId,
                            fieldMap: fieldMap,
                            line: line
                        })
                    );
                }
                return sublistLines;
            };

            this.addSublistLine = (options) => {
                let sublistId = options.sublistId;
                let fieldMap = options.fieldMap;
                let line = options.line;
                me.selectNewLine({ sublistId: sublistId });
                Object.keys(line).forEach(key => {
                    let value = line[key] || '';
                    let fieldId = fieldMap[key];
                    if (!fieldId) {
                        return;
                    }

                    let setOptions = { sublistId: sublistId, fieldId: fieldId, value: value };
                    if (key.indexOf('_Text') > -1) {
                        setOptions.text = value;
                        me.setCurrentSublistText(setOptions);
                    }
                    else {
                        setOptions.value = value;
                        me.setCurrentSublistValue(setOptions);
                    }
                });
                me.commitLine({ sublistId: sublistId });
            };

            this.addSublistLines = (options) => {
                options.lines.forEach(line => {
                    me.addSublistLine({
                        sublistId: options.sublistId,
                        fieldMap: options.fieldMap,
                        line: line
                    });
                });
            };

            this.removeSublistLines = (options) => {
                let sublistId = options.sublistId;
                let lineCount = me.getLineCount({ sublistId: sublistId });
                for (let i=(lineCount - 1); i>=0; i--) {
                    me.removeLine({ sublistId: sublistId, line: i });
                }
            };
        };

        return {};
    }
)