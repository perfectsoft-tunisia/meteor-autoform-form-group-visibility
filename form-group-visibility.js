// import {AutoForm} from 'meteor/aldeed:autoform';
import {Template} from 'meteor/templating';

let AutoForm;

if (Package['aldeed:autoform']) {
    AutoForm = Package['aldeed:autoform'].AutoForm;
} else if (Package['perfectsofttunisia:autoform']) {
    AutoForm = Package['perfectsofttunisia:autoform'].AutoForm;
} else {
    throw new Meteor.Error('You need to add an autoform package');
}

Template.afFormGroupVisibility.replaces('afFormGroup');

Template.afFormGroup.helpers({
    visible() {
        const schema = AutoForm.getFormSchema();

        const fieldName = this.name.replace(/\.[0-9]+/g, '.$');

        if (schema._schemaKeys.indexOf(fieldName) == -1) {
            return;
        }

        const fieldDefinition = AutoForm.Utility.getFieldDefinition(schema, fieldName);
        const visibility = fieldDefinition.visibility || fieldDefinition.autoform && fieldDefinition.autoform.visibility;

        if (visibility) {
            if (visibility.relatedField) {
                //compatibility with old version

                if (schema._schemaKeys.indexOf(visibility.relatedField) == -1) {
                    return true;
                }

                let value;
                try {
                    value = AutoForm.getFieldValue(visibility.relatedField);
                } catch (exception) {
                    return true;
                }

                if (!value) {
                    value = '';
                }

                visibility.value = visibility.value || '';
                const condition = visibility.condition == 'eq' ? value == visibility.value : value != visibility.value;
                return visibility.action == 'hide' ? !condition : condition;
            } else {
                // we have multiple related fields
                // currently we don't support setting  hide and show at the same time
                if (visibility.hide) {

                    if (visibility.hide.or) {

                        for (let i = 0; i < visibility.hide.or.length; ++i) {
                            const currentVisibilityContext = visibility.hide.or[i];

                            const relatedField = currentVisibilityContext.relatedField;
                            if (schema._schemaKeys.indexOf(relatedField) == -1) {
                                return true;
                            }

                            let value;
                            try {
                                value = AutoForm.getFieldValue(relatedField);
                            } catch (exception) {
                                return true;
                            }

                            if (!value) {
                                value = '';
                            }

                            currentVisibilityContext.value = currentVisibilityContext.value || '';

                            const condition = currentVisibilityContext.condition == 'eq' ? value == currentVisibilityContext.value : value != currentVisibilityContext.value;
                            if (condition) {
                                return false;
                            }
                        }
                    }

                    if (visibility.hide.and) {

                        for (let i = 0; i < visibility.hide.and.length; ++i) {
                            const currentVisibilityContext = visibility.hide.and[i];

                            const relatedField = currentVisibilityContext.relatedField;
                            if (schema._schemaKeys.indexOf(relatedField) == -1) {
                                return true;
                            }

                            let value;
                            try {
                                value = AutoForm.getFieldValue(relatedField);
                            } catch (exception) {
                                return true;
                            }

                            if (!value) {
                                value = '';
                            }

                            currentVisibilityContext.value = currentVisibilityContext.value || '';

                            const condition = currentVisibilityContext.condition == 'eq' ? value == currentVisibilityContext.value : value != currentVisibilityContext.value;
                            if (!condition) {
                                return true;
                            }
                        }
                    }

                    if (!visibility.show) {
                        return true;
                    }

                }

                if (visibility.show) {

                    if (visibility.show.or) {

                        for (let i = 0; i < visibility.show.or.length; ++i) {
                            const currentVisibilityContext = visibility.show.or[i];

                            const relatedField = currentVisibilityContext.relatedField;
                            if (schema._schemaKeys.indexOf(relatedField) == -1) {
                                return true;
                            }

                            let value;
                            try {
                                value = AutoForm.getFieldValue(relatedField);
                            } catch (exception) {
                                return true;
                            }

                            if (!value) {
                                value = '';
                            }

                            currentVisibilityContext.value = currentVisibilityContext.value || '';

                            const condition = currentVisibilityContext.condition == 'eq' ? value == currentVisibilityContext.value : value != currentVisibilityContext.value;
                            if (condition) {
                                return true;
                            }
                        }
                    }

                    if (visibility.show.and) {

                        for (let i = 0; i < visibility.show.and.length; ++i) {
                            const currentVisibilityContext = visibility.show.and[i];

                            const relatedField = currentVisibilityContext.relatedField;
                            if (schema._schemaKeys.indexOf(relatedField) == -1) {
                                return true;
                            }

                            let value;
                            try {
                                value = AutoForm.getFieldValue(relatedField);
                            } catch (exception) {
                                return true;
                            }

                            if (!value) {
                                value = '';
                            }

                            currentVisibilityContext.value = currentVisibilityContext.value || '';

                            const condition = currentVisibilityContext.condition == 'eq' ? value == currentVisibilityContext.value : value != currentVisibilityContext.value;
                            if (!condition) {
                                return false;
                            }
                        }
                    }

                    return false;

                }

                return true;
            }
        } else {
            return true;
        }
    }
});