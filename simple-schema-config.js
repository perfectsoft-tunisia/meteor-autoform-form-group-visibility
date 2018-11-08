import SimpleSchema from 'simpl-schema';
import {Match} from 'meteor/check';

//This is only for backward compatibility
//from now on, it's best to set visibility under autoform key

SimpleSchema.extendOptions({
    visibility: Match.Optional({
        //old version
        action: {
            optional: true,
            type: Match.OneOf('hide', 'show')
        },
        relatedField: String,
        condition: Match.OneOf('eq', 'neq'),
        value: Match.Optional(Match.OneOf(String, Boolean)),
        //new version
        hide: {
            type: Object,
            Optional: true
        },
        'hide.and': {
            type: Array,
            Optional: true
        },
        'hide.and.$': {
            type: Object
        },
        'hide.and.$.relatedField': String,
        'hide.and.$.condition': Match.OneOf('eq', 'neq'),
        'hide.and.$.value': Match.Optional(Match.OneOf(String, Boolean)),
        'hide.or': {
            type: Array,
            Optional: true
        },
        'hide.or.$': {
            type: Object,
            blackbox: true
        },
        show: {
            type: Object,
            Optional: true
        },
        'show.and': {
            type: Array,
            Optional: true
        },
        'show.and.$': {
            type: Object
        },
        'show.and.$.relatedField': String,
        'show.and.$.condition': Match.OneOf('eq', 'neq'),
        'show.and.$.value': Match.Optional(Match.OneOf(String, Boolean)),
        'show.or': {
            type: Array,
            Optional: true
        },
        'show.or.$': {
            type: Object,
            blackbox: true
        }
    })
});